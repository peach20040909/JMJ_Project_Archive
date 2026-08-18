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

// AI Project Enhancer (STAR format & problem solving polish)
app.post("/api/ai/enhance-project", async (req, res) => {
  try {
    const { title, summary, techStack, role, problem, solution, result, targetRole } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        isMock: true,
        enhancedSummary: `${summary} (기술적 역량을 집중 강조)`,
        starBullets: [
          `[Situation] ${problem || "기존 시스템의 성능 및 구조적 한계 인식"}`,
          `[Task] ${role || "핵심 로직 개발 및 아키텍처 개선 담당"}`,
          `[Action] ${techStack?.join(", ") || "핵심 기술"}을 활용하여 ${solution || "비동기 최적화 및 모듈화 구현"}`,
          `[Result] ${result || "유지보수성 향상 및 실행 속도 25% 개선 달성"}`
        ],
        troubleshootingStory: `### 🔍 문제 해결 과정 (Troubleshooting)\n\n1. **문제 정의**: ${problem || "데이터 처리 과정에서 병목 현상 및 동시성 문제 발생"}\n2. **원인 분석**: 구조적 설계 미흡 및 비효율적인 쿼리/연산\n3. **해결 방안**: ${solution || "자료구조 개선 및 인덱싱/캐싱 적용"}\n4. **성과 및 교훈**: ${result || "안정적인 서비스 운영 경험 및 CS 이론(자료구조/운영체제)의 실무 적용력 습득"}`
      });
    }

    const ai = getAi();
    const prompt = `당신은 소프트웨어학과 2학년 학생의 포트폴리오를 지도하는 수석 개발자 멘토입니다.
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

// AI Semester 2-2 Strategy & Roadmap Advisor
app.post("/api/ai/semester-feedback", async (req, res) => {
  try {
    const { studentName, targetRole, completedCourses, upcomingCourses, currentProjects, goals } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: true,
        isMock: true,
        semesterSummary: "2학년 2학기는 CS 기본기(알고리즘, 운영체제, DB)를 프로젝트에 접목하여 주력 포트폴리오를 빌드업하는 황금기입니다.",
        recommendations: [
          {
            category: "주력 프로젝트 (Main Project)",
            title: "CRUD를 넘어서는 동시성/대용량/최적화 프로젝트 1개 완성",
            detail: "단순한 기능 구현에서 벗어나 트러블슈팅 경험(캐싱, 인덱싱, 비동기 큐 등)을 담은 완성도 높은 프로젝트를 만드세요."
          },
          {
            category: "CS 전공 & 코딩테스트",
            title: "백준 골드 달성 & 자료구조/알고리즘 구현력 체화",
            detail: "2-2학기 알고리즘, 운영체제, DB 수업과 연계하여 백준/프로그래머스 문제를 매주 3~5문제씩 꾸준히 해결하세요."
          },
          {
            category: "협업 & 해커톤",
            title: "교내외 해커톤 참가 및 Git Flow 협업 경험",
            detail: "PR 리뷰, 이슈 관리, CI/CD 자동화 등을 적용한 팀 프로젝트 경험을 쌓아 협업 역량을 입증하세요."
          }
        ],
        suggestedNextProject: {
          title: "실시간 협업 도구 or 고성능 분산 데이터 캐시 서비스",
          techStack: ["Java / Spring Boot", "Redis", "WebSocket", "React", "Docker"],
          reason: "2학년 2학기 교과목(운영체제, 데이터베이스, 네트워크)과 직접 연계되어 면접에서 강한 인상을 줄 수 있습니다."
        }
      });
    }

    const ai = getAi();
    const prompt = `당신은 소프트웨어학과 대학생들을 카카오/네이버/라인/토스/구글 등 탑티어 IT 기업으로 이끄는 최고의 테크 커리어 코치입니다.
현재 2학년 1학기를 마치고 '2학년 2학기'를 곧 시작하는 소프트웨어학과 학생의 포트폴리오 상태를 진단하고, 2학기 동안 무엇을 집중해야 할지 맞춤형 전략 로드맵을 작성해주세요.

학생 상태:
- 이름: ${studentName || "소프트웨어학도"}
- 목표 직무: ${targetRole || "백엔드/풀스택 엔지니어"}
- 기이수한 전공과목: ${completedCourses?.join(", ") || "자료구조, C프로그래밍, 객체지향프로그래밍"}
- 2학년 2학기 수강 예정 과목: ${upcomingCourses?.join(", ") || "알고리즘, 운영체제, 데이터베이스, 웹프로그래밍"}
- 현재 보유 프로젝트 수: ${currentProjects?.length || 0}개
- 현재 계획한 2학기 목표: ${goals?.join(", ") || "학점 관리 및 프로젝트 완성"}

반드시 다음 JSON 형식으로만 응답해주세요:
{
  "semesterSummary": "2학년 2학기 포트폴리오 전략 총평 (격려와 명확한 방향성 제시, 2~3문장)",
  "recommendations": [
    {
      "category": "분야 (예: 전공 심화, 주력 프로젝트, 코딩테스트, 협업/해커톤)",
      "title": "구체적인 실천 목표 제목",
      "detail": "2-2학기 동안 실행해야 할 상세 방법론과 팁"
    }
  ],
  "suggestedNextProject": {
    "title": "2학년 2학기 추천 메인 프로젝트 주제",
    "techStack": ["추천 기술스택1", "추천 기술스택2", "추천 기술스택3"],
    "reason": "왜 이 프로젝트가 2학년 2학기 시점에 강력한 무기가 되는지 설명"
  },
  "csFocusTips": "2학년 2학기 전공 과목(OS/DB/알고리즘 등)을 포트폴리오와 연결하는 핵심 꿀팁"
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
    console.error("AI Semester feedback error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate semester strategy" });
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
    console.log(`DevArchive Server running on http://localhost:${PORT}`);
  });
}

startServer();
