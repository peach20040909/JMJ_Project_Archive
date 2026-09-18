import { UserProfile, ProjectItem, TechSkill, DevLog, CoverLetterItem } from '../types';

export const initialProfile: UserProfile = {
  name: "장민준",
  englishName: "JANG MINJUN",
  title: "탄탄한 CS 기본기와 실무 문제 해결력을 갖춘 융합소프트웨어 엔지니어",
  university: "명지대학교",
  department: "융합소프트웨어학부",
  currentSemester: "2학년 2학기",
  gpa: "4.27 / 4.50",
  targetRole: "Fullstack & Backend Software Engineer",
  email: "a01027010769@gmail.com",
  githubUrl: "https://github.com/minjun-dev",
  blogUrl: "https://velog.io/@minjun_dev",
  location: "Seoul, Republic of Korea",
  bio: "명지대학교 융합소프트웨어학부 데이터사이언스전공입니다. \n상상만 했던 것들을 실제로 구현하는 활동을 좋아합니다.",
  interests: [
    "대용량 트래픽 & 분산 시스템",
    "동시성 제어 및 쿼리 최적화",
    "클린 코드 & 객체지향 설계",
    "Spring Boot & React 현대적 웹 아키텍처"
  ]
};

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-mju-solomap",
    title: "혼밥지도 - 명지대학교 인문캠퍼스",
    summary: "1인석 유무, 매장 분위기, 5단계 혼밥 난이도를 기반으로 명지대 학우 맞춤형 식당을 탐색하는 인터랙티브 지도 & 오늘 뭐 먹지 룰렛 서비스",
    category: "Web",
    semester: "2학년 2학기",
    period: "2026.09 - 2026.12",
    teamType: "개인",
    role: "기획 및 개발 (개인)",
    techStack: [
      "JavaScript",
      "CSS",
      "HTML",
      "TypeScript",
      "Leaflet",
      "Render"
    ],
    problemDescription: "명지대 인문캠퍼스 주변 식당의 혼밥 난이도(1인석 유무, 2인 이상 전용 테이블, 선불 키오스크, 매장 눈치) 정보가 분산되어 있어, 공강 시간이나 혼자 끼니를 해결하려는 학우들이 겪는 식당 선택 피로감과 심리적 진입 장벽 존재",
    solutionDescription: "대중의 현실적 체감 기준을 반영한 5단계 혼밥 난이도(Lv.1 편의점/학식부터 Lv.5 고깃집/뷔페까지) 인덱스를 정립하고, Leaflet 기반 인터랙티브 지도와 권역별 퀵 이동(명지대, 명지전문대, 백련시장), 메뉴 퀵 칩, '오늘 뭐 먹지?' 랜덤 룰렛을 결합하여 원클릭 탐색 경험 제공",
    resultDescription: "Render 클라우드 환경에 성공적으로 배포(mju-solomap.onrender.com)하여 명지대 학우 대상 실사용 검증 진행 중, 모바일 및 데스크톱 반응형 뷰(목록 보기 ↔ 지도 보기) 제공으로 사용자 식당 탐색 시간 대폭 단축",
    keyFeatures: [
      "현실적 체감 5단계 혼밥 난이도 인덱스 (Lv.1 입문 혼밥 ~ Lv.5 마스터 혼밥 원클릭 필터)",
      "Leaflet 기반 인터랙티브 맵 및 권역별 퀵 점프 컨트롤 (명지대 인문캠, 명지전문대, 백련시장, 전체 권역)",
      "결정 장애 학우를 위한 '오늘 뭐 먹지?' 랜덤 추천 룰렛 기능",
      "빠른 카테고리 칩 필터링 (국밥, 라멘/우동, 돈까스, 버거, 마라탕, 김밥, 떡볶이, 고기)",
      "목록 보기 ↔ 지도로 보기 실시간 뷰 모드 전환 및 키워드 검색",
      "모바일 최적화 반응형 헤더 & 인터페이스"
    ],
    githubUrl: "https://github.com/peach20040909/mju-solomap",
    demoUrl: "https://mju-solomap.onrender.com/",
    featured: true,
    starBullets: [
      "[Situation] 명지대 인문캠 주변 식당의 혼밥 난이도(1인석 여부, 선불/키오스크, 매장 눈치) 정보가 산재되어 학생들이 식당 선택에 피로감을 겪음",
      "[Task] 캠퍼스 권역 중심 인터랙티브 지도와 실시간 메뉴 필터, 룰렛 기능을 결합한 경량 반응형 웹 서비스 개발 및 라이브 배포 주도",
      "[Action] Leaflet 지도 엔진을 활용하여 명지대-백련시장 맛집 마커 클러스터링 및 5단계 난이도 필터 파이프라인 구축, 모바일 뷰포트 최적화",
      "[Result] Render 클라우드 라이브 배포(mju-solomap.onrender.com) 완료, 명지대 학우들의 공강 시간 혼밥 식당 탐색 편의성 제공 및 실사용 피드백 수렴"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 핵심 설계 스토리: '혼밥지도 (SoloMap)'

#### 1. 문제 정의: "대학생의 현실적인 혼밥 진입 장벽"을 수치화하는 5단계 난이도 지표
- **문제점**: 네이버나 카카오맵의 식당 리뷰는 '맛'과 '가격' 중심이어서, 혼자 밥을 먹으려는 대학생에게 가장 중요한 **"1인석이 있는가?", "바쁜 점심시간에 1인 손님을 반기는가?", "키오스크 선불인가?"** 등의 정보가 누락되어 있었습니다.
- **해결 방안**: 철저히 대중적 심리 체감에 맞춘 **5단계 혼밥 난이도(Lv.1~Lv.5)** 인덱스를 고안했습니다:
  - *Lv.1 (입문)*: 편의점, 학식, 버거, 토스트, 도시락 (시선 신경 0%, 키오스크 선불)
  - *Lv.2 (일상)*: 분식, 김밥, 라멘, 국밥 (1인 바 테이블 완비, 빠른 회전율)
  - *Lv.3 (무난)*: 돈까스, 덮밥, 마라탕, 백반, 중식
  - *Lv.4 (도전)*: 일반 식당, 즉석 떡볶이, 패밀리 레스토랑
  - *Lv.5 (마스터)*: 고깃집, 뷔페, 2인 이상 전용 찌개 전문점
- **결과**: 사용자가 자신의 혼밥 레벨에 맞춰 한 번의 클릭으로 안심하고 갈 수 있는 식당만 즉시 필터링할 수 있게 되었습니다.

#### 2. 지도 성능 및 UX 최적화: Leaflet 인터랙티브 맵 & 권역 퀵 점프
- **도전 과제**: 좁은 모바일 화면에서 지도와 식당 목록을 동시에 볼 때 스크롤 충돌과 시각적 혼잡이 발생하는 문제가 있었습니다.
- **해결책**: '목록 보기'와 '지도로 보기' 탭을 원클릭으로 전환할 수 있는 반응형 뷰 스위처를 도입하고, 상단에 **[명지대], [명지전문대], [백련시장], [전체 맞춤]** 퀵 점프 버튼을 배치하여 손쉬운 영역 탐색을 지원했습니다.
- **랜덤 룰렛 도입**: 식당 선택 결정을 주저하는 학우들을 위해 '오늘 뭐 먹지? (랜덤 뽑기)' 룰렛 모달을 구현해 실사용 만족도를 끌어올렸습니다.`,
    updatedAt: "2026-09-17"
  },
  {
    id: "proj-hmk-2026",
    title: "한만큼 (HMK) — 팀 프로젝트 기여도 근거 리포트 서비스",
    summary: "팀 프로젝트 무임승차·평가 불공정 문제를 흩어진 협업 도구(GitHub·Notion·Docs) 작업 로그를 모아 'AI가 판정하지 않고 객관적 근거만 제공'하여 해결하는 기여도 리포트 서비스",
    category: "AI/Data",
    semester: "2학년 2학기",
    period: "2026.09 (아이디어 발굴 ~ 경진대회 출품)",
    teamType: "팀 (5인 이상)",
    role: "현장 조사(교수 인터뷰 설계·진행) · 서비스 기획 · 백엔드 구조 설계 · 아이디어 검증",
    techStack: [
      "Service Architecture",
      "Data Pipeline",
      "AI Categorization",
      "GitHub API",
      "Notion API",
      "PSST 기획"
    ],
    problemDescription: "대학 팀 과제는 결과물이 하나라 교수가 개인별 기여를 파악하기 어렵고, 학생의 89%가 무임승차를 겪어도 증명 수단이 없어 42%가 대처를 포기함. 기존 동료평가는 관계 눈치로 점수가 비슷하게 수렴해 무임승차자 변별에 실패하는 구조적 문제 존재",
    solutionDescription: "'AI가 판정하지 않는다'는 대원칙 하에, 학기 초 합의된 기여 유형 가중치 잠금(사후 담합 차단), 학기 중 완전 침묵(행동 왜곡 방지), 마감 후 협업 도구 로그를 AI가 활동 유형별로 분류·집계[Σ(유형 가중치 × 유형 내 활동 비중)]하여 교수 대시보드에 객관적 판단 근거 리포트 제공",
    resultDescription: "2026 명지대 「AI·AX 전환 시대의 창업 전략 아이디어 경진대회」 출품 (PSST 발표자료 & 교수/학생 목업 완성), 교수 4인 심층 인터뷰를 통한 문제 실재성 및 수요 검증 완료, 예선 심사 대기",
    keyFeatures: [
      "학기 초 기여 유형(기획·제작·QA·발표자료·조율) 가중치 합의 및 잠금 (사후 담합 방지)",
      "학기 중 완전 침묵 측정 (알림·점수·순위 미공개로 행동 왜곡 및 불필요한 경쟁 차단)",
      "협업 도구(GitHub·Notion·Docs) 분산 로그 집계 및 AI 활동 유형별 분류 파이프라인",
      "개인 산출 비중 모델 [Σ(유형 가중치 × 활동 비중)] 및 교수용 판단 근거 대시보드",
      "오탐·오해 방지 설계 ('온라인 기록 0% ≠ 기여 0%' 명시, 오프라인 기여 서술 분리)",
      "B2B/B2U 스케일업 전략 (교수 무료 체험 → 학과 구독 → 대학 LMS 연동)"
    ],
    githubUrl: "",
    demoUrl: "",
    featured: true,
    starBullets: [
      "[Situation] 대학 팀 과제에서 무임승차 경험 89%, 대처 포기 42%에 달하나 교수는 결과물만으로 개인별 기여를 알 수 없어 전원 동일 점수로 이어지는 불공정 발생",
      "[Task] 5인 다전공 팀(데이터사이언스·문헌정보·경영정보·아동학·디지털미디어)에서 현장 조사, 서비스 기획, 백엔드 데이터 흐름 설계 및 비즈니스 모델 수립 주도",
      "[Action] 교수 4인 서면 인터뷰를 직접 설계·진행하여 '정밀 기여도 측정'에서 '무임승차(0%) 식별 근거 제공'으로 피벗하고, 로그 수집→AI 유형 분류→가중치 집계 아키텍처 설계",
      "[Result] PSST 기획서 및 교수/학생 화면 목업 제작 완료, 2026 명지대 AI·AX 창업 전략 아이디어 경진대회 출품 및 교수진의 현장 도입 수요 검증"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 핵심 설계 스토리: '한만큼(HMK)'

#### 1. 문제 재정의: "정밀 측정"에서 "무임승차(0%) 식별"로의 피벗
- **초기 가설**: 타이핑 속도, 복사/붙여넣기 감지, 코드 라인 수 등 모든 로그를 정밀하게 분석하여 기여도 백분율을 매기려 함.
- **현장 인터뷰 검증**: 낯선 교수 4인에게 직접 연락해 서면 인터뷰를 진행한 결과, 교수가 진짜 원하는 것은 "AI의 자의적 점수 판정"이 아니라 학생 간 평가 이의제기 시 참고할 수 있는 **"최소한의 객관적 증거 자료"**임을 확인.
- **피벗**: 로그로 측정 불가능한 과목을 과감히 타깃에서 제외하고, "무임승차자(기여도 0%)를 가려내어 교수에게 판단 근거를 넘겨주는 것"으로 목표를 명확히 좁힘.

#### 2. 기술적 타협 대신 지킨 아키텍처 원칙: "AI는 판정하지 않는다"
1. **사전 가중치 잠금**: 학기 초 결과를 모르는 시점에 팀원들이 5가지 기여 유형 가중치를 합의·고정하여 사후 담합 방지.
2. **학기 중 완전 침묵**: 중간에 점수나 순위가 보이면 측정이 학생들의 협업 행동을 왜곡하므로 마감 전까지 일체 미공개.
3. **오탐 방지 안전장치**: '온라인 기록 0% ≠ 기여 0%'를 UI에 명시하여, 오프라인 발표 준비나 조율 활동이 누락되어 억울한 피해자가 생기지 않도록 교수 관측·학생 서술 영역 분리.

#### 3. 배운 점
- 기술적으로 화려한 모델보다 **검증 가능하고 설명할 수 있는 단순한 모델**이 현장의 신뢰를 얻는다.
- 좋은 아이디어일수록 조사하면 경쟁자와 한계가 드러난다. 중요한 것은 한계가 없는 척하는 것이 아니라, **한계를 솔직히 인정하고 방어 논리를 세우는 것**이다.`,
    updatedAt: "2026-09-13"
  },
  {
    id: "proj-1787068386336",
    title: "Loadmap - 강의 복습 지도 서비스",
    summary: "강의 음성과 텍스트에서 학습 부담 신호를 분석하여 학생에게 추가 확인이 필요한 복습 후보 구간을 추천하는 프로젝트다.",
    category: "Backend",
    semester: "2학년 여름방학",
    period: "2026.07 - 2026.08",
    teamType: "팀 (4명)",
    role: "서브 개발",
    techStack: [
      "React",
      "TypeScript"
    ],
    problemDescription: "강의 음성과 텍스트에서 학습 부담 신호를 분석하여 학생에게 추가 확인이 필요한 복습 후보 구간을 추천하는 프로젝트",
    solutionDescription: "음성 및 텍스트 데이터 분석 파이프라인 연계 및 학습 지도 UI 인터페이스 구축",
    resultDescription: "강의 복습 후보 구간 시각화 및 학습 효율 증대",
    keyFeatures: [
      "강의 음성 및 텍스트 학습 부담 신호 분석",
      "복습 후보 구간 추천 및 시각 지도 제공",
      "React & TypeScript 기반 사용자 인터페이스"
    ],
    githubUrl: "https://github.com/6eaverr/SW-programming",
    demoUrl: "",
    featured: true,
    starBullets: [
      "[Situation] 방대한 강의 녹음 및 교재 텍스트에서 복습해야 할 핵심 구간을 빠르게 찾기 어려운 문제 대두",
      "[Task] 학습 부담 신호를 추출하여 학생에게 직관적인 복습 로드맵을 제공하는 서브 개발 담당",
      "[Action] React, TypeScript 기반의 반응형 프론트엔드 모듈 구현 및 데이터 연동",
      "[Result] 강의 복습 탐색 시간 단축 및 추천 구간 시각화 완성"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 학습 기록\n\n- **상황**: 강의 음성/텍스트 분석 결과의 렌더링 지연\n- **해결**: 컴포넌트 단위 메모이제이션 및 비동기 상태 분리로 렌더링 성능 최적화\n- **배운 점**: 복잡한 데이터 시각화 시 프론트엔드 상태 설계의 중요성을 체득함.`,
    updatedAt: "2026-08-18"
  },
  {
    id: "proj-1787068301402",
    title: "5th-MVP-SetPIK-Server",
    summary: "BE: Spotify 플레이리스트 기반 공연·페스티벌 추천 서비스",
    category: "Backend",
    semester: "2학년 여름방학",
    period: "2026.07 - 2026.08",
    teamType: "팀 (5인 이상)",
    role: "서브 개발자",
    techStack: [
      "Java",
      "Dockerfile",
      "Spring Boot"
    ],
    problemDescription: "BE: Spotify 플레이리스트 기반 공연·페스티벌 추천 서비스",
    solutionDescription: "GitHub 소스코드 기반 모듈화 구현 및 기능 안정화",
    resultDescription: "저장소 릴리즈 및 동작 검증 완료",
    keyFeatures: [
      "5th-MVP-SetPIK-Server 핵심 서비스 로직 구현",
      "Spotify 플레이리스트 메타데이터 연동 및 공연/페스티벌 추천 매칭",
      "Wikidata API를 활용한 영문-한글 아티스트 다국어 Entity Resolution",
      "Dockerfile 기반 컨테이너 배포 및 Git 협업 파이프라인"
    ],
    starBullets: [
      "[Situation] Spotify 플레이리스트(영문)와 KOPIS 공연 라인업(한글) 간 언어 체계 차이로 아티스트 매칭 결과가 0건으로 계산되는 문제 발생",
      "[Task] 오탐률 제로화 및 API 쿼터 초과 없이 안정적으로 이종 데이터 소스의 아티스트를 식별·매칭하는 알고리즘 구축",
      "[Action] Spotify 역검색의 오탐 한계를 파악 후, Wikidata API를 매개로 한 다국어 별칭 조회 및 엔티티 매핑(Entity Resolution) 파이프라인 구현",
      "[Result] 동명이인(배우 등) 오탐 매칭 방지, 429 Rate Limit 회피 및 추천 매칭 정확도 대폭 향상"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅: Spotify-KOPIS 아티스트 매칭 실패와 Wikidata Entity Resolution\n\n- **상황**: Spotify(영문: 'Car, the garden')와 KOPIS(한글: '카더가든')의 표기 불일치로 추천 결과가 0건이 되는 문제 발생.\n- **1차 시도 및 실패**: Spotify Search API 역매칭 시도 시 배우 동명이인 오탐 및 429 Too Many Requests 쿼터 초과 발생.\n- **최종 해결**: Wikidata 지식 베이스 API를 도입하여 영문 이름 기준 한글 별칭을 추출하고 KOPIS와 안전하게 교차 매칭하는 구조로 전환.\n- **배운 점**: 단순 문자열 유사도 매칭의 위험성을 깨닫고, 신뢰 가능한 3자 데이터 소스를 매개로 한 Entity Resolution의 견고함을 체득.`,
    githubUrl: "https://github.com/DEPthes/5th-MVP-SetPIK-Server",
    demoUrl: "",
    featured: true,
    updatedAt: "2026-08-18"
  },
  {
    id: "proj-1",
    title: "JMJ_Archive - 개발자 포트폴리오 & 학습 기록 아카이브",
    summary: "소프트웨어학과 대학생을 위한 학기별 프로젝트, CS 교과목 연계, 트러블슈팅 일지 및 AI 포트폴리오 첨삭 플랫폼",
    category: "Web",
    semester: "2학년 여름방학",
    period: "2026.07 - 2026.08 (1개월)",
    teamType: "개인",
    role: "Fullstack Architecture & Design",
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "Node.js",
      "Gemini 3.7 Flash"
    ],
    problemDescription: "소프트웨어학과 2학년 시기에 분산되어 있던 과제, 토이 프로젝트, 교과목 실습, 알고리즘 풀이 기록을 체계적으로 구조화하고 채용 담당자가 보기 편한 포맷으로 전달하기 어려움",
    solutionDescription: "학기별 타임라인, 기술 스택 매트릭스, STAR 기법 AI 이력서 변환기, 트러블슈팅 스토리텔링 뷰가 통합된 단일 인터페이스 구축",
    resultDescription: "자신의 개발 히스토리를 한눈에 조망하고 2-2학기 학습 목표를 수립할 수 있는 아카이브 완성, 포트폴리오 작성 시간 60% 단축",
    keyFeatures: [
      "프로젝트 카테고리/학기/기술스택 다차원 필터링 및 상세 모달",
      "전공 교과목(자료구조, 알고리즘, OS, DB)과 프로젝트 연계 시스템",
      "STAR(상황-과제-행동-결과) 기법 기반 AI 프로젝트 요약 및 트러블슈팅 생성기",
      "공개용 이력서 뷰(Visitor Mode) 및 JSON/Markdown 내보내기"
    ],
    githubUrl: "https://github.com/peach20040909/JMJ_Project_Archive",
    demoUrl: "https://devarchive-software-portfolio.ai.studio/",
    featured: true,
    starBullets: [
      "[Situation] 분산된 1~2학년 학업 및 개발 산출물을 단일 플랫폼에서 체계화할 필요성 대두",
      "[Task] 학생 친화적인 직관적 UI와 Gemini API 기반의 프로젝트 문맥 분석/첨삭 엔진 풀스택 설계",
      "[Action] React 19와 Tailwind CSS로 반응형 SPA를 구현하고 Express 백엔드에 Gemini 3.7 Flash를 연동하여 STAR 구조화 프롬프트 튜닝",
      "[Result] 프로젝트 기록 관리 효율 2배 향상 및 깔끔한 공유용 포트폴리오 링크 생성 기능 제공"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 문제 해결 일지\n\n1. **상황**: 로컬 데이터와 AI 생성 결과가 비동기로 갱신될 때 UI 깜빡임 및 레이아웃 밀림 발생\n2. **원인**: 여러 상태가 개별적으로 dispatch되면서 React 19 렌더링 사이클에서 불필요한 리렌더링 유발\n3. **해결**: 복합 상태를 불변 객체로 묶어 atomic하게 업데이트하고, React 19 Transition 및 LocalStorage 동기화 훅을 최적화\n4. **교훈**: 컴포넌트 간 단방향 데이터 흐름과 상태 응집도의 중요성을 체감함.`,
    updatedAt: "2026-08-18"
  }
];

export const initialTechSkills: TechSkill[] = [
  {
    id: "skill-1",
    name: "Java",
    category: "Languages",
    level: "Proficient (아키텍처/최적화)",
    score: 85,
    experience: "Spring Boot 기반 REST API 서버 개발, 객체지향 설계 원칙 및 동시성 제어 적용",
    featured: true
  },
  {
    id: "skill-2",
    name: "C / C++",
    category: "Languages",
    level: "Proficient (아키텍처/최적화)",
    score: 82,
    experience: "자료구조(RB-Tree, B-Tree) 직접 구현 및 메모리 관리(RAII, 스마트 포인터) 실습",
    featured: true
  },
  {
    id: "skill-3",
    name: "TypeScript / JavaScript",
    category: "Languages",
    level: "Competent (과제/프로젝트 구현)",
    score: 78,
    experience: "React 19 컴포넌트 개발, 엄격한 인터페이스 정의 및 비동기 API 통신 핸들링",
    featured: true
  },
  {
    id: "skill-4",
    name: "Python",
    category: "Languages",
    level: "Competent (과제/프로젝트 구현)",
    score: 75,
    experience: "데이터 전처리 스크립트 작성 및 자동화 도구 개발",
    featured: false
  },
  {
    id: "skill-5",
    name: "SQL",
    category: "Languages",
    level: "Competent (과제/프로젝트 구현)",
    score: 76,
    experience: "복합 JOIN 쿼리, 인덱스 생성 및 실행 계획(EXPLAIN) 분석 기초",
    featured: false
  },
  {
    id: "skill-6",
    name: "React 18 / 19",
    category: "Frontend",
    level: "Competent (과제/프로젝트 구현)",
    score: 80,
    experience: "커스텀 훅 설계, 상태 관리, 반응형 UI 및 모션 애니메이션 구현",
    featured: true
  },
  {
    id: "skill-7",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Proficient (아키텍처/최적화)",
    score: 88,
    experience: "현대적이고 유려한 반응형 디자인 및 일관된 테마 토큰 시스템 구축",
    featured: true
  },
  {
    id: "skill-8",
    name: "Spring Boot 3 / JPA",
    category: "Backend",
    level: "Proficient (아키텍처/최적화)",
    score: 84,
    experience: "계층형 아키텍처(Controller-Service-Repository), Spring Security+JWT, JPA Fetch Join 최적화",
    featured: true
  },
  {
    id: "skill-9",
    name: "Node.js / Express",
    category: "Backend",
    level: "Competent (과제/프로젝트 구현)",
    score: 75,
    experience: "경량 RESTful API 서버 구축, 미들웨어 파이프라인 및 AI API 연동",
    featured: false
  },
  {
    id: "skill-10",
    name: "MySQL",
    category: "Database & Infra",
    level: "Competent (과제/프로젝트 구현)",
    score: 78,
    experience: "ERD 설계, 외래키 제약조건, 비관적 락(SELECT FOR UPDATE)을 통한 동시성 제어",
    featured: true
  },
  {
    id: "skill-11",
    name: "Git / GitHub",
    category: "Database & Infra",
    level: "Proficient (아키텍처/최적화)",
    score: 86,
    experience: "Git Flow 협업, Rebase/Merge 충돌 해결, GitHub Actions CI 기초 파이프라인 구성",
    featured: true
  },
  {
    id: "skill-12",
    name: "Docker & AWS EC2",
    category: "Database & Infra",
    level: "Competent (과제/프로젝트 구현)",
    score: 70,
    experience: "Dockerfile 작성, Docker Compose를 통한 Spring Boot + MySQL 컨테이너화 및 EC2 배포",
    featured: false
  },
  {
    id: "skill-13",
    name: "자료구조 & 알고리즘",
    category: "CS Fundamentals",
    level: "Proficient (아키텍처/최적화)",
    score: 88,
    experience: "자가 균형 트리, 해시 테이블, 정렬/탐색 알고리즘 직접 구현 및 복잡도 분석",
    featured: true
  },
  {
    id: "skill-14",
    name: "컴퓨터구조 & 시스템",
    category: "CS Fundamentals",
    level: "Competent (과제/프로젝트 구현)",
    score: 82,
    experience: "파이프라이닝, 캐시 계층 구조, 메모리 단편화 및 MIPS 어셈블리 분석",
    featured: true
  }
];

export const initialDevLogs: DevLog[] = [
  {
    id: "log-mju-solomap",
    title: "혼밥지도 (SoloMap) — 5단계 혼밥 난이도 지표 정립 및 Leaflet 인터랙티브 맵 구현기",
    date: "2026-09-17",
    category: "트러블슈팅",
    tags: ["혼밥지도", "Leaflet", "지도 최적화", "5단계 난이도", "Render 배포", "반응형 웹"],
    linkedProjectId: "proj-mju-solomap",
    content: `## 1. 프로젝트 개요 & 목적
- **서비스명**: 혼밥지도 (SoloMap) — 명지대 인문캠퍼스
- **배포 링크**: [https://mju-solomap.onrender.com/](https://mju-solomap.onrender.com/)
- **개발 역할**: 풀스택 기획 & 개발 (인터랙티브 지도 UI, 5단계 혼밥 인덱스, 룰렛 알고리즘, Render 클라우드 배포)

---

## 2. 문제 정의: 대학생 혼밥족의 실제 진입 장벽
대학생들이 공강 시간이나 혼자 끼니를 해결할 때 가장 큰 문제는 '맛집 평점'이 아니라 다음과 같은 심리적/물리적 요인이었습니다:
1. **1인석 / 바 테이블 구비 여부**
2. **점심 피크 시간대 1인 손님 눈치 여부**
3. **키오스크 선불 결제 편의성**
4. **2인분 이상 필수 주문 메뉴 여부**

기존의 네이버/카카오 지도 앱은 이러한 '혼밥 적합도' 정보를 별도로 제공하지 않아 학생들이 매번 가던 곳만 가거나 끼니를 거르는 문제가 있었습니다.

---

## 3. 핵심 기능 구현 & 아키텍처

### 1) 대중 체감형 5단계 혼밥 난이도 지표
- **Lv.1 (입문 혼밥)**: 편의점, 학식, 버거/토스트, 도시락 (시선 신경 0%, 키오스크 선불 완비)
- **Lv.2 (일상 혼밥)**: 분식, 김밥, 라멘, 우동, 국밥 (1인 바 테이블 완비, 빠른 회전율)
- **Lv.3 (무난 혼밥)**: 돈까스, 덮밥, 마라탕, 백반, 중식
- **Lv.4 (도전 혼밥)**: 일반 식당, 즉석 떡볶이, 패밀리 레스토랑
- **Lv.5 (마스터 혼밥)**: 고깃집, 뷔페, 2인 이상 전용 찌개 전문점

### 2) Leaflet 기반 가벼운 지도 엔진 & 권역 퀵 점프
- 무거운 지도 라이브러리 대신 모바일 웹 브라우저에서 가볍게 동작하는 Leaflet을 선정.
- 명지대 인문캠 본관, 명지전문대 정문, 백련시장 맛집 골목, 전체 권역 줌 프리셋 버튼을 상단에 배치하여 원터치로 지역 전환.

### 3) '오늘 뭐 먹지?' 랜덤 룰렛 추천
- 메뉴 결정 장애를 겪는 학우들을 위해 등록된 혼밥 맛집 중 무작위로 하나를 추천해주는 룰렛 모달 구현.

---

## 4. 성과 및 배운 점
- Render 클라우드 플랫폼에 라이브 배포 완료하여 명지대 학우들이 실시간으로 접속해 활용 가능.
- 사용자의 페인포인트(혼밥 시선/좌석)를 명확한 지표(5단계 난이도)로 정의했을 때 서비스의 유용성이 극대화됨을 실감함.`,
    updatedAt: "2026-09-17"
  },
  {
    id: "log-hmk-2026",
    title: "한만큼 (HMK) — 'AI가 판정하지 않는다': 교수 인터뷰 기반 문제 재정의와 기여도 근거 리포트 아키텍처",
    date: "2026-09-13",
    category: "트러블슈팅",
    tags: ["서비스 기획", "교수 인터뷰", "AI 윤리·원칙", "데이터 파이프라인", "협업 도구 연동", "창업 경진대회"],
    linkedProjectId: "proj-hmk-2026",
    content: `## 1. 프로젝트 개요 & 배경
- **대회**: 2026 명지대 「AI·AX 전환 시대의 창업 전략 아이디어 경진대회」 출품작
- **팀**: HMK (5인 · 데이터사이언스, 문헌정보, 경영정보, 아동학, 디지털미디어 융합)
- **역할**: 현장 조사(교수 인터뷰 설계·진행) · 서비스 기획 · 백엔드 구조 설계 · 아이디어 검증
- **슬로건**: 한 만큼 평가받는다 · Honest Measure, Kept fair

---

## 2. 문제 정의 (Problem): 왜 무임승차는 해결되지 않는가?

대학 팀 과제는 **'결과물이 하나'**이기 때문에 교수가 개인별 기여를 직접 알기 어렵고, 결국 팀원 전원 동일 점수로 이어지는 구조적 불공정이 반복된다.
- **학생 설문 조사**: 팀 과제 무임승차 피해 경험 **89%**, 그러나 대처 방식 1위는 **"별다른 조치 없음"(42%)** — 즉 문제를 인지해도 포기하는 구조.
- **기존 해법의 실패**: 동료평가 설문은 관계 눈치와 보복 두려움으로 인해 점수가 평준화(모두에게 만점 부여)되어 무임승차자 변별에 실패.

---

## 3. 핵심 해결 원칙: "AI가 판정하지 않는다"

점수를 AI가 매겨주면 해결될 것 같지만, 이는 교육적·윤리적으로 심각한 부작용을 낳는다. 따라서 **'AI는 판정하지 않고, 교수가 판단할 객관적 근거만 제공한다'**는 대원칙을 수립했다.

1. **학기 초 (가중치 잠금)**: 팀원들이 기여 유형(기획·제작·QA·발표자료·조율) 5가지의 가중치를 사전 합의하여 잠금. 결과를 모르는 시점에 고정하므로 사후 담합을 원천 차단.
2. **학기 중 (완전 침묵)**: 알림, 점수, 실시간 순위를 절대 공개하지 않음. 측정이 노출되는 순간 학생들이 점수를 의식해 협업 행동을 왜곡(어뷰징)하기 때문.
3. **마감 후 (로그 집계 & AI 분류)**:
   - 흩어진 협업 도구(GitHub 커밋, Notion 페이지/블록, Google Docs 편집)의 원천 로그 수집.
   - AI가 로그를 5가지 활동 유형으로 분류·집계.
   - **개인 산출 비중 계산식**:  
     $$\\text{개인 산출 비중} = \\sum (\\text{유형 가중치} \\times \\text{유형 내 활동 비중})$$
   - 교수 대시보드에 판단 근거와 함께 제공.

### ⚠️ 설계에서 타협하지 않은 안전장치
- **온라인 기록 0% ≠ 기여 0%**: 발표 수행, 오프라인 대면 회의 등 로그로 잡히지 않는 기여 영역이 존재하므로, UI에 이를 명시하고 교수 관측 평가와 학생 서술란으로 분리.
- **조작 가능성의 투명한 인정**: 반복 단순 편집 등 어뷰징을 100% 자동 차단할 수 없다는 한계를 인정하고, 대신 교수에게 이상치(특정 시간대 과도한 로그 등)를 시각적으로 보고하여 교수가 검증하도록 유도.

---

## 4. 현장 검증과 피벗: "정밀 측정"에서 "무임승차(0%) 식별"로

가장 결정적인 전환은 **교수 4인 서면 인터뷰**에서 일어났다.

- **접근**: 낯선 교수 4인에게 직접 연락해 설문/서면 인터뷰를 설계·진행. "팀 과제 평가 시 실제 어려움"과 "학생 작업 로그를 참고 자료로 쓸 의향"을 집중 질문.
- **발견된 진실**: 교수들은 "모든 학생의 기여도를 소수점 단위로 쪼개는 AI 판정"을 원하지 않았다. 오히려 학생 간 분쟁이나 성적 이의제기가 발생했을 때 제시할 수 있는 **'최소한의 객관적 증빙'**을 원했다.
- **피벗**: 타이핑 속도, 복사 감지 등 무리한 정밀 측정의 욕심을 버리고, **"무임승차(활동량 0%)를 확실하게 식별하는 근거 리포트"**로 포커스를 좁혔다. 로그 측정이 불가능한 과목은 과감히 타깃에서 제외했다.

---

## 5. 사업화 (Scale-up) & 경쟁 포지셔닝

- **사용자(교수) ≠ 구매자(학과)**:
  - 1단계: 교수 무료 체험 (입소문 및 데이터 검증)
  - 2단계: 캡스톤·SW 과목 중심 학과 단위 구독 (첫 매출 파이프라인)
  - 3단계: 대학 LMS(Canvas, 블랙보드) 공식 연동 플러그인
- **경쟁력**: FeedbackFruits(단순 설문), LMS 내장 통계와 달리, **여러 도구(GitHub·Notion·Docs)의 원자료를 개인별 기여 근거로 통합**하여 대체재가 아닌 '보완재'로 시장 진입.

---

## 6. 핵심 교훈 (Takeaway)

1. **한계를 인정하는 방어 논리**: 좋은 아이디어일수록 조사할수록 한계와 경쟁자가 드러난다. 한계가 없는 척 숨기는 것보다, **한계를 명확히 인정하고 안전장치를 설계하는 것**이 훨씬 설득력 있다.
2. **단순함의 힘**: 기술적으로 복잡하고 화려한 모델보다, **검증 가능하고 설명할 수 있는 단순한 모델**이 현장의 신뢰를 얻는다.
3. **현장 인터뷰의 가치**: 책상 앞 열 개의 추측보다 현장 사용자(교수)의 인터뷰 한 건이 문제 정의의 나침반이 되었다.`
  },
  {
    id: "log-spotify-kopis-matching",
    title: "Spotify-KOPIS 아티스트 다국어 매칭 실패와 Wikidata를 활용한 Entity Resolution",
    date: "2026-08-28",
    category: "트러블슈팅",
    tags: ["Spotify API", "KOPIS", "Wikidata API", "Entity Resolution", "Rate Limiting", "데이터 파이프라인"],
    linkedProjectId: "proj-1787068301402",
    content: `## 문제 상황

플레이리스트 분석 후 공연 추천을 계산하면 결과가 항상 **0건**으로 나오는 문제가 발생했다.

### 원인 진단
취향 분석에 사용하는 아티스트 정보는 Spotify에서 오고, 공연 라인업 정보는 KOPIS(한국공연예술통합전산망)에서 온다. 두 데이터 소스의 아티스트 이름 표기 언어가 근본적으로 달랐다.

- **Spotify**: \`"Car, the garden"\` (영문 표기)
- **KOPIS**: \`"카더가든"\` (한글 표기)

기존 매칭 로직은 정규화(공백/특수문자 제거, 소문자 변환) 후 완전 일치 비교 방식이었다. 언어 자체가 다르니 정규화를 아무리 해도 일치할 수 없어 매칭이 원천적으로 불가능했다.

---

## 1차 시도: Spotify 검색 API로 역매칭

- **접근 방식**: KOPIS 출연진 이름을 그대로 Spotify 검색 API에 질의하여, 검색 결과 1위가 기존에 저장된 Spotify 아티스트와 일치하는지 확인.
- **결과**: **실패** (두 가지 심각한 부작용 발생)
  1. **오탐 매칭 (False Positive)**: KOPIS에는 대중가수뿐 아니라 연극·뮤지컬 배우도 "출연진"으로 등록된다. 배우 이름("박예리" 등)을 Spotify에 검색하면 발음이 비슷한 동명이인 가수가 1위로 반환되어 전혀 다른 사람에게 잘못 연결되는 사고가 발생했다.
  2. **API 쿼터 초과 (429 Too Many Requests)**: 신규 아티스트 하나당 검색 API를 순차 호출하다 보니, 공연 수가 많은 대형 배치에서 단시간에 수백 건의 호출이 몰려 Spotify 쿼터 제한에 도달했다.

> **💡 교훈**: 이름 유사도만으로 동일 인물을 판단하는 방식은 신뢰도가 매우 낮다. *"이름이 비슷하다"*와 *"같은 사람이다"*는 완전히 다른 문제였다.

---

## 2차 시도 (최종 해결): Wikidata API 연동 및 Entity Resolution

이름 문자열을 직접 비교하는 대신, **위키데이터(Wikidata)**라는 신뢰 가능한 공개 지식 베이스를 매개체로 삼았다.

\`\`\`text
Spotify 아티스트명 (영문)
         ↓
Wikidata에서 해당 인물(Entity) 조회
         ↓
Wikidata가 보유한 한글 레이블 및 별칭(Alias) 획득
         ↓
그 한글 이름으로 KOPIS 출연진과 교차 매칭
\`\`\`

문자열 유사도가 아니라, 위키데이터라는 제3의 공인 소스가 *"이 영문 이름과 이 한글 이름이 같은 실존 인물을 가리킨다"*고 검증(Entity Resolution)해주는 방식이라 배우와 가수를 혼동하는 문제를 구조적으로 해소했다.

- **한계점 및 관리**: Wikidata에 한글 이름/별칭이 등록되어 있지 않은 일부 비주류 아티스트는 매칭이 누락될 수 있으나, 시스템 신뢰도를 저해하는 오탐(False Positive)을 원천 차단하는 가장 견고한 아키텍처로 안착했다.

---

## 시도 방식별 비교 정리

| 구분 | 매칭 방식 | 발생한 문제점 및 한계 |
|---|---|---|
| **최초** | 문자열 완전 일치 | 언어가 다르면(영문 vs 한글) 매칭 자체가 원천 불가능 |
| **1차 개선** | Spotify 검색 결과 신뢰 | 배우→동명이인 가수 오탐 매칭 발생, 429 API 쿼터 초과 |
| **최종 해결** | **Wikidata 매개 매칭 (Entity Resolution)** | **오탐 완전 해결, 안정적 매칭 파이프라인 확립** (일부 미등록 아티스트 예외 관리) |

> **🌟 핵심 배운 점**: 겉으로 보이는 증상("매칭이 안 된다")을 빠르게 때우는 1차 시도가 오히려 새로운 버그(잘못된 매칭)를 만든다는 것을 확인했다. 데이터 통합에서는 문자열 유사도를 맹신하지 않고, **신뢰 가능한 3자 데이터베이스를 매개로 한 검증 구조**를 설계하는 것이 가장 중요하다.`
  },
  {
    id: "log-1",
    title: "Spring Boot + JPA에서 N+1 문제가 발생하는 이유와 Fetch Join 최적화",
    date: "2026-08-12",
    category: "트러블슈팅",
    tags: ["JPA", "Spring Boot", "MySQL", "성능 최적화"],
    linkedProjectId: "proj-1787068301402",
    content: `5th-MVP-SetPIK-Server 등 백엔드 개발 중 연관 엔티티가 지연 로딩(LAZY)으로 설정되어 있어 루프를 돌며 getter를 호출할 때마다 매번 SELECT 쿼리가 발생하는 N+1 문제 해결.\n\n### 해결 과정\n1. **Batch Size 설정**: \`default_batch_fetch_size: 100\`을 설정하여 IN 절 쿼리로 묶음 처리.\n2. **Fetch Join 적용**: 목록 조회 전용 JPQL에 \`JOIN FETCH\`를 적용하여 1회 단일 JOIN 쿼리로 모든 데이터를 한번에 가져오도록 수정.\n3. **결과**: 쿼리 대폭 단축 및 API 응답 성능 개선!`
  },
  {
    id: "log-2",
    title: "C++ 스마트 포인터의 순환 참조(Circular Reference)와 weak_ptr",
    date: "2026-07-28",
    category: "기술 학습 (TIL)",
    tags: ["C++", "Memory", "Smart Pointer"],
    linkedProjectId: "proj-1",
    content: `자료구조를 구현하며 부모 노드와 자식 노드가 서로 \`std::shared_ptr\`를 가지게 설계했더니, 소멸자가 호출되지 않아 메모리 릭이 발생하는 것을 발견했다.\n\n- **원인**: Reference Count가 서로 물려 0으로 떨어지지 않는 순환 참조 발생.\n- **해결**: 부모가 자식을 가리킬 때는 \`shared_ptr\`, 자식이 부모를 참조할 때는 참조 카운트를 올리지 않는 \`std::weak_ptr\`를 사용하도록 변경.\n- **결과**: 객체 소멸 정상 확인 및 Valgrind 메모리 릭 0 byte 달성.`
  },
  {
    id: "log-3",
    title: "2학년 1학기 종강 회고: CS 기본기의 중요성과 2학기를 맞이하는 다짐",
    date: "2026-06-25",
    category: "학기 회고",
    tags: ["회고", "학업", "2학년 2학기 준비"],
    content: `2학년 1학기는 자료구조와 컴퓨터구조를 배우며 개발자로서의 시야가 완전히 바뀐 학기였다.\n단순히 프레임워크나 라이브러리를 쓰는 법을 넘어서, 메모리 구조와 CPU 클럭, 트리 밸런싱 같은 저수준 원리를 파고들면서 코드 한 줄을 짤 때도 시간 복잡도와 메모리 사용량을 신중히 계산하게 되었다.\n\n다가오는 2학년 2학기는 **운영체제, 데이터베이스, 알고리즘**이라는 CS의 심장을 배우는 학기다.\n이 지식들을 내 주력 프로젝트에 녹여내어 '진짜 실력 있는 개발자'로 한 단계 도약하자!`
  }
];

export const initialCoverLetters: CoverLetterItem[] = [
  {
    id: "cl-hmk-2026",
    companyName: "네이버 / 카카오 / 토스",
    targetRole: "서비스 기획 & 백엔드 엔지니어 / 인턴",
    questionCategory: "협업 및 갈등해결",
    question: "서로 다른 배경을 가진 구성원들과 협업하여 문제를 해결하거나, 사용자의 실제 목소리를 바탕으로 프로젝트의 방향성을 전환(피벗)했던 경험을 구체적으로 기술해 주십시오. (1,000자 이내)",
    linkedProjectIds: ["proj-hmk-2026"],
    content: `[다전공 5인 팀의 교수 인터뷰 기반 문제 재정의와 'AI 비판정' 기여도 리포트 구조 설계]\n\n2026 명지대 'AI·AX 창업 전략 아이디어 경진대회'에서 5인 다전공 팀(데이터사이언스·문헌정보·경영정보·아동학·디지털미디어)으로 참가하여, 팀 프로젝트 무임승차 방지를 위한 기여도 근거 리포트 서비스 '한만큼(HMK)'을 기획하고 백엔드 아키텍처를 설계했습니다.\n\n초기에는 타이핑 속도나 코드 라인 등 모든 활동을 수치화하는 '정밀 측정 모델'을 구상했으나, 문제의 실재성을 검증하기 위해 교수 4인을 대상으로 서면 인터뷰를 직접 설계·진행했습니다. 그 결과 교수들이 필요로 한 것은 'AI의 일방적 점수 매김'이 아니라 학생 간 평가 이의제기 시 참고할 수 있는 '최소한의 객관적 증거 자료'임을 파악했습니다.\n\n이에 따라 두 가지 핵심 피벗을 단행했습니다. 첫째, 'AI가 판정하지 않는다'는 대원칙을 수립하고, AI는 GitHub·Notion 등의 분산 로그를 5대 활동 유형으로 분류·집계만 담당하도록 범위를 한정했습니다. 둘째, '정밀 측정'의 욕심을 내려놓고 '무임승차(0%) 식별'로 타깃을 좁혀, 온라인 기록 0%가 실제 기여도 0%를 의미하지 않는다는 오탐 방지 가이드를 리포트에 명시했습니다.\n\n이 경험을 통해 기술적 화려함보다 실제 현장의 신뢰를 얻는 단순하고 설명 가능한 모델의 중요성, 그리고 한계를 투명하게 인정하고 방어 논리를 세우는 협업과 문제 정의의 본질을 체득했습니다.`,
    targetCharCount: 1000,
    memo: "명지대 AI·AX 창업 경진대회(HMK) - 현장 인터뷰 기반 고객 문제 재정의 및 다전공 협업 면접 대비",
    interviewTips: [
      "초기 아이디어에서 교수 인터뷰 후 피벗을 결정하게 된 가장 결정적인 계기는 무엇이었나요?",
      "'AI가 판정하지 않는다'는 원칙을 서비스 구조와 UI에 어떻게 반영했나요?",
      "데이터사이언스, 문헌정보, 경영 등 서로 다른 5개 전공 팀원들과 의견 충돌 시 어떻게 조율했나요?"
    ],
    keyStrengths: [
      "현장 고객(교수) 인터뷰 설계 및 데이터 기반 문제 재정의",
      "AI 윤리 원칙 기반 서비스 기획 및 백엔드 로그 파이프라인 설계",
      "다전공 5인 팀 소통 조율 및 PSST 사업화 모델 도출"
    ],
    updatedAt: "2026-09-13"
  },
  {
    id: "cl-1",
    companyName: "카카오 / 네이버",
    targetRole: "서버 / 백엔드 개발자 인턴",
    questionCategory: "기술적 도전 및 문제해결",
    question: "본인이 수행한 프로젝트 중 가장 기술적으로 도전적이었던 문제와, 이를 해결하기 위해 시도한 구체적인 과정 및 결과를 기술해 주십시오. (1,000자 이내)",
    linkedProjectIds: ["proj-1787068301402"],
    content: `[Spotify-KOPIS 이종 데이터 식별 불일치 해결과 Wikidata Entity Resolution 파이프라인 구축]\n\n'5th-MVP-SetPIK-Server'에서 사용자의 Spotify 플레이리스트 취향을 분석하여 KOPIS(한국공연예술전산망) 공연 라인업과 매칭하는 백엔드 핵심 로직을 개발했습니다.\n\n초기 매칭 로직에서 Spotify의 영문 아티스트명('Car, the garden')과 KOPIS의 한글 표기('카더가든') 불일치로 인해 추천 결과가 0건으로 나오는 치명적 결함을 발견했습니다.\n\n1차로 Spotify 검색 API를 이용한 역매칭을 시도했으나, 연극/뮤지컬 배우가 동명이인 가수로 오탐(False Positive)되거나 단시간 대량 호출로 인한 429 Too Many Requests 쿼터 초과 문제가 발생했습니다.\n\n단순 문자열 유사도 비교의 한계를 인식하고, 공인 지식 베이스인 Wikidata API를 매개로 한 Entity Resolution 아키텍처를 도입했습니다. 영문 식별자로부터 Wikidata의 검증된 다국어 레이블 및 한글 별칭(Alias)을 조회하여 KOPIS 출연진과 교차 검증함으로써 오탐률을 제로화하고 안정적인 추천 파이프라인을 완성했습니다.`,
    targetCharCount: 1000,
    memo: "외부 API 연동, 데이터 불일치 해결, Entity Resolution 및 429 레이트 리밋 제어 면접 대비",
    interviewTips: [
      "Spotify 영문 표기와 KOPIS 한글 표기 간의 식별 불일치 문제를 어떻게 정의하고 해결했나요?",
      "단순 검색 API 대신 Wikidata 지식 베이스를 선택한 기술적 배경과 장단점은 무엇인가요?",
      "외부 API 연동 시 레이트 리밋(429) 및 네트워크 지연을 방어하기 위한 캐싱 전략은 어떻게 구상했나요?"
    ],
    keyStrengths: [
      "이종 데이터 소스 간 다국어 Entity Resolution 및 데이터 파이프라인 구축",
      "Java & Spring Boot 기반 서비스 로직 모듈화 및 외부 API 예외 방어",
      "Dockerfile을 활용한 컨테이너 패키징 및 협업 역량"
    ],
    updatedAt: "2026-08-28"
  }
];
