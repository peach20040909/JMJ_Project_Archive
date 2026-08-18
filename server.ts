import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GitHub Repo Auto-Import & AI Analyzer
app.post("/api/github/import-repo", async (req, res) => {
  try {
    const { repoUrl, targetRole } = req.body;
    if (!repoUrl) {
      return res.status(400).json({ error: "GitHub 저장소 URL 또는 owner/repo를 입력해주세요." });
    }

    // Extract owner and repo
    let cleaned = repoUrl.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\/$/, "");
    cleaned = cleaned.replace(/\.git$/i, "");
    const parts = cleaned.split("/");
    if (parts.length < 2) {
      return res.status(400).json({ error: "올바른 GitHub 저장소 주소(예: https://github.com/사용자/저장소)를 입력해주세요." });
    }
    const owner = parts[0];
    const repo = parts[1];

    // Fetch repository data from GitHub
    let repoData: any = {};
    let readmeText = "";
    let languagesList: string[] = [];

    try {
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { "User-Agent": "DevArchive-Portfolio-App" }
      });
      if (repoRes.ok) {
        repoData = await repoRes.json();
      }
    } catch (e) {
      console.warn("GitHub repo fetch error:", e);
    }

    try {
      const readmeRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`, {
        headers: { "User-Agent": "DevArchive-Portfolio-App" }
      });
      if (readmeRes.ok) {
        readmeText = await readmeRes.text();
        if (readmeText.length > 5000) {
          readmeText = readmeText.substring(0, 5000);
        }
      }
    } catch (e) {
      console.warn("GitHub readme fetch error:", e);
    }

    try {
      const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers: { "User-Agent": "DevArchive-Portfolio-App" }
      });
      if (langRes.ok) {
        const langJson = await langRes.json();
        languagesList = Object.keys(langJson);
      }
    } catch (e) {
      console.warn("GitHub languages fetch error:", e);
    }

    const fallbackTitle = repoData.name || repo;
    const fallbackDesc = repoData.description || "GitHub 프로젝트";
    const githubLink = repoData.html_url || `https://github.com/${owner}/${repo}`;
    const demoLink = repoData.homepage || "";
    const detectedTopics = repoData.topics || [];
    const combinedTech = Array.from(new Set([...languagesList, ...detectedTopics]));

    // AI Analysis using Gemini
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = getAi();
        const prompt = `당신은 소프트웨어 개발자의 포트폴리오를 작성해주는 전문 테크 리크루터 및 수석 엔지니어입니다.
아래 GitHub 저장소의 정보와 README 내용을 분석하여, 취업/이직 시 채용 담당자와 면접관의 눈길을 끄는 고품질 포트폴리오 프로젝트 항목을 생성해주세요.

GitHub 저장소 정보:
- 이름: ${fallbackTitle}
- 기본 설명: ${fallbackDesc}
- 주 언어 및 토픽: ${combinedTech.join(", ") || "미지정"}
- Stars: ${repoData.stargazers_count || 0}, Forks: ${repoData.forks_count || 0}
- 생성일: ${repoData.created_at || ""}, 최근 업데이트: ${repoData.updated_at || ""}
- README 내용 요약:
"""
${readmeText || "README 파일이 없거나 간단함"}
"""
- 목표 직무: ${targetRole || "백엔드/풀스택 소프트웨어 엔지니어"}

반드시 다음 JSON 규격으로만 응답해주세요:
{
  "title": "한글로 다듬은 프로젝트 제목 (예: CampusMate - 전공서적 대여 및 중고 거래 플랫폼)",
  "summary": "프로젝트의 핵심 가치와 기술적 포인트를 집약한 1~2문장의 전문적인 한 줄 소개",
  "category": "Web | Backend | Frontend | System | Algorithm | App | AI/Data 중 택1",
  "semester": "진행 프로젝트",
  "period": "2026.03 - 2026.06",
  "teamType": "개인 | 팀 (2명) | 팀 (3명) | 팀 (4명) 중 추정",
  "role": "예: 풀스택 개발 / 백엔드 엔지니어링 / 핵심 로직 구현",
  "techStack": ["주요 기술스택 4~8개 배열 (예: React, Spring Boot, MySQL, Docker 등)"],
  "problemDescription": "이 프로젝트가 해결하고자 한 명확한 기술적 또는 사용자 문제 정의",
  "solutionDescription": "문제를 해결하기 위해 적용한 기술적 접근법 및 핵심 아키텍처",
  "resultDescription": "성능 개선 수치, 완료 성과 또는 배운 점",
  "keyFeatures": [
    "핵심 기능 1",
    "핵심 기능 2",
    "핵심 기능 3",
    "핵심 기능 4"
  ],
  "starBullets": [
    "[Situation] 프로젝트 배경과 마주한 도전 과제",
    "[Task] 담당한 핵심 목표 및 문제 해결 미션",
    "[Action] 적용한 기술과 최적화/구현 행동",
    "[Result] 달성한 결과 및 얻은 인사이트"
  ],
  "troubleshootingStory": "### 🛠️ 주요 트러블슈팅 및 성능 최적화\\n\\n- **문제**: ...\\n- **원인**: ...\\n- **해결**: ...\\n- **배운 점**: ...",
  "githubUrl": "${githubLink}",
  "demoUrl": "${demoLink}"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json({
          success: true,
          project: {
            id: `proj-${Date.now()}`,
            title: parsed.title || fallbackTitle,
            summary: parsed.summary || fallbackDesc,
            category: parsed.category || (languagesList.includes("Java") || languagesList.includes("Python") ? "Backend" : "Web"),
            semester: parsed.semester || "진행 프로젝트",
            period: parsed.period || "2026.03 - 2026.06",
            teamType: parsed.teamType || "개인",
            role: parsed.role || "소프트웨어 개발",
            techStack: parsed.techStack && parsed.techStack.length > 0 ? parsed.techStack : (combinedTech.length > 0 ? combinedTech.slice(0, 6) : ["TypeScript", "React"]),
            problemDescription: parsed.problemDescription || fallbackDesc,
            solutionDescription: parsed.solutionDescription || "주요 아키텍처 및 모듈화 설계를 통한 문제 해결",
            resultDescription: parsed.resultDescription || "프로젝트 완성 및 깃허브 코드베이스 배포",
            keyFeatures: parsed.keyFeatures || ["주요 기능 모듈 구현", "REST API 및 인터페이스 연동", "유닛 테스트 및 예외 처리"],
            starBullets: parsed.starBullets || [
              `[Situation] ${fallbackDesc}`,
              `[Task] 핵심 기능 개발 및 안정적인 시스템 구현`,
              `[Action] ${combinedTech.join(", ") || "주요 기술"} 기반 설계 및 모듈화`,
              `[Result] 성공적인 기능 릴리즈 및 코드 리팩토링 완료`
            ],
            troubleshootingStory: parsed.troubleshootingStory || `### 🔍 트러블슈팅\\n\\n- **문제**: 개발 과정 중 발생한 예외 및 비동기 처리 이슈\\n- **해결**: 원인 분석 후 데이터 흐름 동기화 및 에러 핸들러 도입\\n- **결과**: 안정적인 프로그램 구동 확인`,
            githubUrl: githubLink,
            demoUrl: demoLink,
            featured: true,
            updatedAt: new Date().toISOString().split("T")[0]
          }
        });
      } catch (aiErr) {
        console.error("Gemini GitHub analysis error:", aiErr);
      }
    }

    // Fallback if no AI
    const defaultTech = combinedTech.length > 0 ? combinedTech.slice(0, 6) : ["JavaScript", "Git"];
    return res.json({
      success: true,
      isFallback: true,
      project: {
        id: `proj-${Date.now()}`,
        title: fallbackTitle,
        summary: fallbackDesc,
        category: "Web",
        semester: "진행 프로젝트",
        period: "2026.03 - 2026.06",
        teamType: "개인",
        role: "메인 개발자",
        techStack: defaultTech,
        problemDescription: fallbackDesc,
        solutionDescription: "GitHub 소스코드 기반 모듈화 구현 및 기능 안정화",
        resultDescription: "저장소 릴리즈 및 동작 검증 완료",
        keyFeatures: [
          `${fallbackTitle} 핵심 서비스 로직 구현`,
          "데이터 연동 및 사용자 인터페이스 구성",
          "Git을 통한 버전 관리 및 배포"
        ],
        starBullets: [
          `[Situation] ${fallbackDesc}`,
          `[Task] 소프트웨어 아키텍처 설계 및 기능 완성`,
          `[Action] ${defaultTech.join(", ")} 스택을 활용한 개발 및 테스트`,
          `[Result] 프로젝트 구현 완료 및 GitHub 아카이빙`
        ],
        troubleshootingStory: `### 🔍 트러블슈팅\\n\\n- **상황**: 기능 구현 중 발생한 오류\\n- **해결**: 디버깅을 통한 로직 수정 및 최적화`,
        githubUrl: githubLink,
        demoUrl: demoLink,
        featured: true,
        updatedAt: new Date().toISOString().split("T")[0]
      }
    });

  } catch (error: any) {
    console.error("GitHub import error:", error);
    return res.status(500).json({ error: error.message || "GitHub 저장소 정보를 가져오는데 실패했습니다." });
  }
});

// AI Project Enhancer (STAR format & problem solving polish)
app.post("/api/ai/enhance-project", async (req, res) => {
  try {
    const { title, summary, techStack, role, problem, solution, result, targetRole } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        isMock: true,
        enhancedSummary: `${summary} (실무 엔지니어링 역량을 집중 강조)`,
        starBullets: [
          `[Situation] ${problem || "기존 시스템의 성능 및 구조적 한계 인식"}`,
          `[Task] ${role || "핵심 로직 개발 및 아키텍처 개선 담당"}`,
          `[Action] ${techStack?.join(", ") || "핵심 기술"}을 활용하여 ${solution || "비동기 최적화 및 모듈화 구현"}`,
          `[Result] ${result || "유지보수성 향상 및 실행 속도 25% 개선 달성"}`
        ],
        troubleshootingStory: `### 🔍 문제 해결 과정 (Troubleshooting)\n\n1. **문제 정의**: ${problem || "데이터 처리 과정에서 병목 현상 및 동시성 문제 발생"}\n2. **원인 분석**: 구조적 설계 미흡 및 비효율적인 쿼리/연산\n3. **해결 방안**: ${solution || "자료구조 개선 및 인덱싱/캐싱 적용"}\n4. **성과 및 교훈**: ${result || "안정적인 서비스 운영 경험 및 CS 이론의 실무 적용력 습득"}`
      });
    }

    const ai = getAi();
    const prompt = `당신은 소프트웨어 엔지니어의 포트폴리오를 지도하는 시니어 개발자 멘토입니다.
아래 프로젝트 정보를 바탕으로 포트폴리오와 이력서에 바로 쓸 수 있는 전문적이고 매력적인 설명으로 업그레이드해주세요.

프로젝트 정보:
- 제목: ${title}
- 한 줄 소개: ${summary}
- 사용 기술: ${Array.isArray(techStack) ? techStack.join(", ") : techStack}
- 맡은 역할: ${role || "팀원/개인"}
- 문제 상황: ${problem || "없음"}
- 해결 과정: ${solution || "없음"}
- 결과 및 성과: ${result || "없음"}
- 희망 직무: ${targetRole || "소프트웨어 엔지니어"}

반드시 다음 JSON 형식으로만 응답해주세요:
{
  "enhancedSummary": "채용 담당자의 눈길을 끄는 세련된 프로젝트 한 줄 요약",
  "starBullets": [
    "[Situation & Task] 상황과 해결 과제 명시",
    "[Action] 사용한 기술과 구체적인 구현 방식",
    "[Result] 수치나 정량적/정성적 성과 및 배운 점"
  ],
  "troubleshootingStory": "문제 정의 -> 원인 분석 -> 해결 방법 -> 배운 점으로 구성된 마크다운 형식의 트러블슈팅 스토리",
  "growthPoints": ["이 프로젝트를 통해 어필할 수 있는 핵심 소프트웨어 역량 1", "역량 2", "역량 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("AI Enhance error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI enhancement" });
  }
});

// AI Career & Portfolio Coach Advisor
app.post("/api/ai/semester-feedback", async (req, res) => {
  try {
    const { studentName, targetRole, currentProjects, skills } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        isMock: true,
        semesterSummary: "등록된 프로젝트 아카이브를 진단한 결과, 백엔드 코어 로직과 실무 협업 아키텍처를 탄탄히 다지고 있습니다.",
        recommendations: [
          {
            category: "주력 프로젝트 (Main Project)",
            title: "CRUD를 넘어서는 동시성/대용량/최적화 프로젝트 1개 완성",
            detail: "단순한 기능 구현에서 벗어나 트러블슈팅 경험(캐싱, 인덱싱, 비동기 큐, WebSocket 등)을 담은 완성도 높은 프로젝트를 구성하세요."
          },
          {
            category: "기술 스택 & 문제 해결",
            title: "백준 골드 달성 & 자료구조/알고리즘 구현력 체화",
            detail: "코딩테스트 대비와 함께 실무 프로젝트에서의 쿼리 최적화 및 메모리 누수 방지 경험을 아카이브에 기록하세요."
          },
          {
            category: "협업 & 오픈소스",
            title: "Git Flow 협업 및 CI/CD 배포 파이프라인 구축",
            detail: "PR 리뷰, 이슈 템플릿, GitHub Actions 자동화 배포를 적용하여 실무 즉시 투입 가능한 엔지니어링 역량을 입증하세요."
          }
        ],
        suggestedNextProject: {
          title: "실시간 대용량 트래픽 처리 서비스 or 분산 캐시 시스템",
          techStack: ["Java / Spring Boot", "Redis", "Kafka / WebSocket", "Docker"],
          reason: "면접관에게 '왜 이 기술을 선택했는지'와 '어떤 병목을 해결했는지'를 명확히 설득할 수 있는 최적의 포트폴리오 무기입니다."
        }
      });
    }

    const ai = getAi();
    const prompt = `당신은 소프트웨어 엔지니어를 네이버, 카카오, 라인, 쿠팡, 배민, 토스, 당근, 구글 등 주요 테크 기업에 합격시키는 수석 개발자 및 테크 리크루터입니다.
학부생부터 4학년 취업 준비까지 지속 활용할 포트폴리오 아카이브의 프로젝트들과 기술 스택을 진단하고, 취업 합격률을 극대화할 맞춤형 포트폴리오 빌드업 전략을 제시해주세요.

개발자 상태:
- 이름: ${studentName || "소프트웨어 개발자"}
- 목표 직무: ${targetRole || "백엔드 / 풀스택 소프트웨어 엔지니어"}
- 현재 아카이빙된 프로젝트들: ${Array.isArray(currentProjects) ? currentProjects.join(", ") : "프로젝트 아카이브"}
- 보유 기술 스택: ${Array.isArray(skills) ? skills.join(", ") : "Spring Boot, React, MySQL"}

반드시 다음 JSON 형식으로만 응답해주세요:
{
  "semesterSummary": "포트폴리오 역량 진단 및 향후 강화 방향성 총평 (2~3문장)",
  "recommendations": [
    {
      "category": "분야 (예: 아키텍처 고도화, 트러블슈팅 증명, 코딩테스트/CS, 협업/배포)",
      "title": "구체적인 실천 전략 제목",
      "detail": "포트폴리오에 추가하거나 강화해야 할 핵심 포인트"
    }
  ],
  "suggestedNextProject": {
    "title": "추천 킬러 프로젝트 주제",
    "techStack": ["추천 기술스택1", "추천 기술스택2", "추천 기술스택3"],
    "reason": "왜 이 프로젝트가 취업/면접 시 강력한 무기가 되는지 설명"
  },
  "csFocusTips": "면접관이 프로젝트 질문 시 가장 주목하는 CS/트러블슈팅 핵심 포인트"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, ...parsed });
  } catch (error: any) {
    console.error("AI Portfolio feedback error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate portfolio strategy" });
  }
});

// NEW: AI Cover Letter (자기소개서 & 면접 대비 답변) Generator
app.post("/api/ai/generate-cover-letter", async (req, res) => {
  try {
    const { 
      companyName, 
      targetRole, 
      question, 
      questionCategory, 
      targetCharCount = 800, 
      selectedProjects = [], 
      studentProfile = {}, 
      customNotes = "" 
    } = req.body;

    if (!question) {
      return res.status(400).json({ error: "자기소개서 문항을 입력해주세요." });
    }

    if (!process.env.GEMINI_API_KEY) {
      const projTitles = selectedProjects.map((p: any) => p.title).join(", ") || "대표 프로젝트";
      return res.json({
        success: true,
        isMock: true,
        content: `[${companyName || "지원 기업"} ${targetRole || "개발자"}: 기술적 문제 해결과 가치 창출]\n\n${projTitles} 프로젝트를 수행하며 단순한 기능 구현을 넘어 아키텍처 최적화와 안정적인 데이터 처리를 위해 치열하게 고민했습니다. 특히 동시성 문제와 데이터베이스 쿼리 병목을 경험하며 비관적 락과 인덱스 튜닝을 적용하여 성능을 대폭 개선한 경험이 있습니다. 이러한 집요한 문제 해결 역량을 바탕으로 입사 후에도 신뢰성 높은 서비스를 구축하겠습니다.`,
        interviewTips: [
          "해당 프로젝트에서 동시성 제어 방식으로 비관적 락을 선택한 구체적인 트레이드오프는 무엇인가요?",
          "JPA N+1 문제 해결 시 Fetch Join 외에 Batch Size 설정 등 대안을 고려해보았나요?",
          "서비스 규모가 10배 이상 커졌을 때 발생할 수 있는 추가적인 병목과 해결책은 무엇인가요?"
        ],
        keyStrengths: [
          "실무 수준의 데이터베이스 락 및 동시성 제어 경험",
          "쿼리 튜닝 및 API 응답 시간 최적화 역량",
          "문제 정의부터 배포/검증까지 주도적인 엔지니어링 마인드셋"
        ]
      });
    }

    const ai = getAi();
    const prompt = `당신은 네이버, 카카오, 토스, 라인, 쿠팡 등 유수의 IT 기업 개발자 채용 서류 평가관이자 테크 면접관입니다.
지원자가 등록해 둔 실제 프로젝트 아카이브 데이터를 바탕으로, 서류 합격률을 극대화하고 면접관이 매력적인 꼬리 질문을 던질 수 있도록 돕는 최고 수준의 개발자 자기소개서 답변을 작성해주세요.

[지원 정보]
- 지원 기업: ${companyName || "IT 기업"}
- 지원 직무: ${targetRole || "백엔드 / 풀스택 엔지니어"}
- 문항 분류: ${questionCategory || "기술적 문제해결 경험"}
- 자기소개서 문항: "${question}"
- 목표 글자 수: 약 ${targetCharCount}자 내외
- 추가 강조 요청사항: ${customNotes || "없음"}

[지원자 기본 프로필]
- 이름: ${studentProfile.name || "지원자"}
- 학과: ${studentProfile.university || "명지대학교"} ${studentProfile.department || "융합소프트웨어학부"}
- 강점 및 지향점: ${studentProfile.bio || "안정적이고 확장성 있는 아키텍처를 지향하는 소프트웨어 엔지니어"}

[지원자가 선택한 프로젝트 아카이브 상세 데이터 (반드시 이 프로젝트들의 구체적 기술과 수치를 기반으로 작성할 것)]
${JSON.stringify(selectedProjects, null, 2)}

[작성 가이드라인]
1. [소제목]: 문항의 핵심 결론과 지원자의 기술적 가치를 집약한 임팩트 있는 한 줄 소제목으로 시작하세요.
2. STAR 기법: Situation(배경/문제) -> Task(부여된 기술적 도전 과제) -> Action(구체적으로 어떤 기술과 원리로 해결했는지) -> Result(정량적 수치 성과 및 깨달음) 흐름을 명확히 갖추세요.
3. 추상적인 미사여구(예: "열심히 최선을 다했습니다")를 배제하고, 구체적인 기술 스택(예: Spring Data JPA, Redis 분산 락, Red-Black Tree, Valgrind, WebSocket 등)과 아키텍처적 선택의 이유(Trade-off)를 명시하세요.
4. 글자 수: 공백 포함 약 ${targetCharCount}자(±10%) 분량에 맞추어 완결성 있게 작성하세요.
5. 면접 대비: 작성된 자소서를 기반으로 면접관이 반드시 물어볼 법한 심층 기술 질문 3~4개를 도출하세요.

반드시 다음 JSON 규격으로만 응답해주세요:
{
  "content": "작성된 완성형 자기소개서 본문 (소제목 포함, 문단 나눔 줄바꿈 반영)",
  "interviewTips": [
    "면접관 예상 기술 꼬리 질문 1",
    "면접관 예상 기술 꼬리 질문 2",
    "면접관 예상 기술 꼬리 질문 3",
    "면접관 예상 기술 꼬리 질문 4"
  ],
  "keyStrengths": [
    "이 답변에서 어필된 지원자의 핵심 엔지니어링 강점 1",
    "강점 2",
    "강점 3"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, ...parsed });

  } catch (error: any) {
    console.error("AI Cover Letter generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate cover letter" });
  }
});

// Vite & Static file handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JMJ_Archive Server running on http://localhost:${PORT}`);
  });
}

startServer();
