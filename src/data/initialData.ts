import { UserProfile, ProjectItem, TechSkill, DevLog, CoverLetterItem } from '../types';

export const initialProfile: UserProfile = {
  name: "장민준",
  englishName: "JANG MINJUN",
  title: "탄탄한 CS 기본기와 실무 문제 해결력을 갖춘 융합소프트웨어 엔지니어",
  university: "명지대학교",
  department: "융합소프트웨어학부",
  currentSemester: "2학년 2학기 (2026 Fall)",
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
