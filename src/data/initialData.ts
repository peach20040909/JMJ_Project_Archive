import { UserProfile, ProjectItem, CourseworkSubject, TechSkill, SemesterGoal, DevLog } from '../types';

export const initialProfile: UserProfile = {
  name: "김민수",
  englishName: "Minsu Kim",
  title: "탄탄한 CS 기본기와 빠른 학습력을 갖춘 주니어 소프트웨어 엔지니어",
  university: "한국대학교",
  department: "소프트웨어학부 소프트웨어전공",
  currentSemester: "2학년 2학기 (2026 Fall)",
  gpa: "4.15 / 4.50",
  targetRole: "Fullstack & Backend Software Engineer",
  email: "developer.minsu@example.com",
  githubUrl: "https://github.com/minsu-dev",
  blogUrl: "https://velog.io/@minsu_dev",
  solvedAcTier: "Gold IV",
  solvedCount: 284,
  location: "Seoul, Republic of Korea",
  bio: "자료구조와 알고리즘, 컴퓨터 시스템의 동작 원리에 깊은 관심을 가지고 있습니다. 단순히 동작하는 코드를 넘어 확장성과 유지보수성, 동시성 처리를 고민하며 사용자에게 안정적인 서비스를 제공하는 개발자를 지향합니다.",
  interests: [
    "대용량 트래픽 & 분산 시스템",
    "동시성 제어 및 쿼리 최적화",
    "클린 코드 & 객체지향 설계",
    "Spring Boot & React 현대적 웹 아키텍처"
  ]
};

export const initialProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "DevArchive - 개발자 포트폴리오 & 학습 기록 아카이브",
    summary: "소프트웨어학과 대학생을 위한 학기별 프로젝트, CS 교과목 연계, 트러블슈팅 일지 및 AI 포트폴리오 첨삭 플랫폼",
    category: "Web",
    semester: "2학년 여름방학",
    period: "2026.07 - 2026.08 (1개월)",
    teamType: "개인",
    role: "Fullstack Architecture & Design",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Express", "Node.js", "Gemini 3.7 Flash"],
    problemDescription: "소프트웨어학과 2학년 시기에 분산되어 있던 과제, 토이 프로젝트, 교과목 실습, 알고리즘 풀이 기록을 체계적으로 구조화하고 채용 담당자가 보기 편한 포맷으로 전달하기 어려움",
    solutionDescription: "학기별 타임라인, 기술 스택 매트릭스, STAR 기법 AI 이력서 변환기, 트러블슈팅 스토리텔링 뷰가 통합된 단일 인터페이스 구축",
    resultDescription: "자신의 개발 히스토리를 한눈에 조망하고 2-2학기 학습 목표를 수립할 수 있는 아카이브 완성, 포트폴리오 작성 시간 60% 단축",
    keyFeatures: [
      "프로젝트 카테고리/학기/기술스택 다차원 필터링 및 상세 모달",
      "전공 교과목(자료구조, 알고리즘, OS, DB)과 프로젝트 연계 시스템",
      "STAR(상황-과제-행동-결과) 기법 기반 AI 프로젝트 요약 및 트러블슈팅 생성기",
      "공개용 이력서 뷰(Visitor Mode) 및 JSON/Markdown 내보내기"
    ],
    githubUrl: "https://github.com/minsu-dev/dev-archive",
    demoUrl: "https://dev-archive.app",
    featured: true,
    starBullets: [
      "[Situation] 분산된 1~2학년 학업 및 개발 산출물을 단일 플랫폼에서 체계화할 필요성 대두",
      "[Task] 학생 친화적인 직관적 UI와 Gemini API 기반의 프로젝트 문맥 분석/첨삭 엔진 풀스택 설계",
      "[Action] React 19와 Tailwind CSS로 반응형 SPA를 구현하고 Express 백엔드에 Gemini 3.7 Flash를 연동하여 STAR 구조화 프롬프트 튜닝",
      "[Result] 프로젝트 기록 관리 효율 2배 향상 및 깔끔한 공유용 포트폴리오 링크 생성 기능 제공"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 문제 해결 일지\n\n1. **상황**: 로컬 데이터와 AI 생성 결과가 비동기로 갱신될 때 UI 깜빡임 및 레이아웃 밀림 발생\n2. **원인**: 여러 상태가 개별적으로 dispatch되면서 React 19 렌더링 사이클에서 불필요한 리렌더링 유발\n3. **해결**: 복합 상태를 불변 객체로 묶어 atomic하게 업데이트하고, React 19 Transition 및 LocalStorage 동기화 훅을 최적화\n4. **교훈**: 컴포넌트 간 단방향 데이터 흐름과 상태 응집도의 중요성을 체감함.`,
    updatedAt: "2026-08-18"
  },
  {
    id: "proj-2",
    title: "CampusMate - 전공서적/기자재 선착순 대여 & 중고 플랫폼",
    summary: "학생증 인증 기반 안전한 캠퍼스 전공 교재 직거래 및 동시성 제어가 적용된 학과 실습 기자재 선착순 예약 시스템",
    category: "Backend",
    semester: "2학년 1학기",
    period: "2026.03 - 2026.06 (4개월, 팀 프로젝트)",
    teamType: "팀 (4명)",
    role: "백엔드 리드 & 데이터베이스 모델링 (기여도 45%)",
    techStack: ["Java 17", "Spring Boot 3", "Spring Data JPA", "MySQL 8.0", "Redis", "Docker", "AWS EC2"],
    problemDescription: "학기 초 인기 전공서적 및 실습 보드(Raspberry Pi, Arduino) 선착순 대여 오픈 시, 다수의 학생이 동시 요청을 보낼 때 중복 예약(Overbooking) 및 재고 불일치 발생",
    solutionDescription: "MySQL 비관적 락(Pessimistic Write Lock)과 Redis 분산 락(Redisson)을 벤치마킹하여 적용하고, JPA N+1 방지를 위해 Fetch Join 및 DTO 직접 조회 쿼리 최적화",
    resultDescription: "동시 요청 500건 부하 테스트(JMeter) 시 재고 정합성 100% 보장 및 평균 응답 시간 420ms -> 65ms (약 84% 개선)",
    keyFeatures: [
      "Spring Security + JWT + 대학교 웹메일(SMTP) 학생 인증 파이프라인",
      "선착순 대여 시스템의 비관적 락(Pessimistic Lock) 기반 동시성 제어",
      "JPA Fetch Join을 통한 전공서적 목록 조회 쿼리 수 최적화 (N+1 문제 해결)",
      "Docker Compose를 이용한 로컬 및 AWS EC2 배포 환경 컨테이너화"
    ],
    githubUrl: "https://github.com/minsu-dev/campus-mate-backend",
    demoUrl: "https://campusmate-demo.site",
    featured: true,
    starBullets: [
      "[Situation] 교내 기자재 예약 오픈 시 트래픽 집중으로 인한 중복 예약 버그 발생",
      "[Task] 백엔드 리더로서 데이터 정합성을 보장하고 API 응답 지연을 해소하는 아키텍처 재설계",
      "[Action] Spring Data JPA 비관적 락을 적용하여 동시 수정 충돌을 원천 차단하고, 쿼리 플랜 분석을 통해 불필요한 Eager 로딩을 Fetch Join DTO 매핑으로 전환",
      "[Result] JMeter 동시성 테스트 500 TPS 환경에서 데이터 정합성 100% 검증 및 API 레이턴시 84% 단축"
    ],
    troubleshootingStory: `### 🛠️ 핵심 트러블슈팅: JPA N+1 문제 해결\n\n- **문제**: 전공 도서 목록 20개를 불러올 때, 각 도서의 작성자 정보와 카테고리를 조회하기 위해 추가 쿼리가 40회 이상 발생하는 N+1 현상 발생.\n- **해결**: \`@Query("SELECT b FROM Book b JOIN FETCH b.author JOIN FETCH b.category")\` 페치 조인을 적용하여 단 1회의 쿼리로 데이터를 병합 조회하도록 리팩토링.\n- **결과**: 데이터베이스 I/O 횟수가 41회에서 1회로 감소하고, 응답 시간이 180ms에서 28ms로 비약적 개선.`,
    updatedAt: "2026-06-20"
  },
  {
    id: "proj-3",
    title: "RB-Tree & Memory Pool Simulator (자료구조 & 메모리 관리자)",
    summary: "C++로 직접 구현한 Red-Black Tree, B-Tree 엔진 및 메모리 단편화를 방지하는 Buddy Memory Allocator 시뮬레이터",
    category: "System",
    semester: "2학년 1학기",
    period: "2026.04 - 2026.05 (1.5개월)",
    teamType: "개인",
    role: "C++ 엔진 코어 개발",
    techStack: ["C++20", "C", "Data Structures", "Memory Management", "Valgrind", "GDB"],
    problemDescription: "STL 라이브러리에 의존하지 않고 운영체제 및 데이터베이스의 핵심 인덱스 엔진 원리를 깊이 이해하기 위해 저수준 포인터 조작과 자가 균형 이진 탐색 트리 구현 필요",
    solutionDescription: "노드 회전(Left/Right Rotate)과 색상 리밸런싱을 완벽히 지원하는 Red-Black Tree 클래스를 작성하고, 커스텀 메모리 풀을 통해 시스템 malloc 호출 오버헤드 최소화",
    resultDescription: "100만 건 데이터 삽입/삭제 시 AVL 대비 15% 빠른 삽입 성능 확인, Valgrind 메모리 누수 0 byte 달성 및 A+ 과제 만점 획득",
    keyFeatures: [
      "Red-Black Tree 5대 불변 조건(Red-Black Invariants)을 만족하는 자가 균형 트리",
      "B-Tree (Order 4) 분할(Split) 및 병합(Merge) 알고리즘 구현",
      "Buddy Allocator 기반 고정 크기 블록 풀링으로 내부 단편화 억제",
      "터미널 기반 ASCII 트리 시각화 유틸리티 내장"
    ],
    githubUrl: "https://github.com/minsu-dev/custom-rbtree-allocator",
    featured: true,
    starBullets: [
      "[Situation] CS 2-1 자료구조 전공 수업에서 라이브러리 없이 트리 불균형과 메모리 누수를 완벽히 해결하는 과제 수행",
      "[Task] C++20 모던 문법과 RAII 패턴을 적용하여 안전하고 최적화된 RB-Tree 및 커스텀 메모리 풀러 구현",
      "[Action] 이중 포인터 조작 및 노드 리밸런싱 케이스(Case 1~3)를 완벽히 분기 처리하고 Valgrind 툴로 메모리 릭 전수 검증",
      "[Result] 100만 회 난수 삽입/삭제 스트레스 테스트 통과, 학과 전공 과제 최고점수(A+) 수석 선정"
    ],
    troubleshootingStory: `### 💡 메모리 누수 & 세그먼트 폴트 디버깅\n\n- **원인**: 노드 삭제 시 형제 노드가 Red인 특수 케이스에서 자식 노드 포인터 재연결 전 해제가 발생하여 Dangling Pointer 생성.\n- **해결**: GDB 브레이크포인트와 Valgrind \`--leak-check=full\`을 연동하여 삭제 전 부모-자식 관계를 백업하는 RAII 래퍼 함수를 정의하여 해결.\n- **배운 점**: 시스템 프로그래밍에서 메모리 수명주기와 포인터 안전성의 절대적 중요성을 체득.`,
    updatedAt: "2026-05-18"
  },
  {
    id: "proj-4",
    title: "AlgoArchive - 알고리즘 문제 해결 및 복잡도 분석 일지",
    summary: "백준(BOJ), 프로그래머스, LeetCode 280+ 문제의 분류별 최적 풀이 코드와 시간/공간 복잡도 분석 리포트",
    category: "Algorithm",
    semester: "1학년 2학기",
    period: "2025.09 - 현재 진행중",
    teamType: "개인",
    role: "문제 분석 및 풀이 기록",
    techStack: ["C++", "Java", "Python", "Graph Theory", "Dynamic Programming", "Dijkstra"],
    problemDescription: "문제를 푸는 데서 그치지 않고, 왜 특정 알고리즘(DP vs 그리디 vs 백트래킹)을 선택했는지 근거를 정리하고 동일 유형 문제에 재적용하는 루틴 필요",
    solutionDescription: "그래프 탐색(BFS/DFS), 최단거리(다익스트라/플로이드), DP, 이분탐색, 유니온파인드 등 12개 테마별 핵심 패턴 템플릿과 오답 노트 자동 정리 시스템 운영",
    resultDescription: "Solved.ac 골드 4 티어 달성, 2학년 1학기 알고리즘 대회 교내 3위 입상",
    keyFeatures: [
      "골드~실버 티어 핵심 280+ 알고리즘 문제 풀이 및 마크다운 해설",
      "자주 쓰이는 C++ 빠른 입출력 템플릿 및 자료구조 스니펫 모음집",
      "시간 복잡도 O(N log N) / O(V+E) 등 빅오(Big-O) 분석 첨부"
    ],
    githubUrl: "https://github.com/minsu-dev/algorithm-solutions",
    featured: false,
    updatedAt: "2026-08-15"
  },
  {
    id: "proj-5",
    title: "SyncQuiz - 실시간 멀티플레이어 CS 퀴즈 & 코딩 룸 (기획/준비중)",
    summary: "2학년 2학기 운영체제·네트워크·DB 스터디를 위한 웹소켓 기반 실시간 대전 퀴즈 및 공동 코드 에디터",
    category: "Web",
    semester: "2학년 2학기 (예정/진행중)",
    period: "2026.09 - 2026.11 (예정)",
    teamType: "팀 (3명)",
    role: "풀스택 팀장 & WebSocket 브로커 구축",
    techStack: ["React", "Spring Boot", "WebSocket (STOMP)", "Redis Pub/Sub", "PostgreSQL", "Docker"],
    problemDescription: "2학기 전공 시험 기간 동안 동기들과 CS 이론(가상 메모리, 트랜잭션 격리수준, OSI 7계층)을 능동적이고 재미있게 복습할 수 있는 도구 부재",
    solutionDescription: "STOMP 프로토콜과 Redis Pub/Sub을 활용한 초저지연 실시간 퀴즈 방 생성 및 스코어보드 라이브 랭킹 시스템 구축 계획",
    resultDescription: "2-2학기 주력 협업 프로젝트로 포트폴리오에 웹소켓/분산 캐시 역량을 증명할 계획",
    keyFeatures: [
      "Redis Pub/Sub 기반 다중 서버 인스턴스 간 실시간 룸 동기화",
      "STOMP를 통한 100ms 이내 실시간 정답 제출 및 점수 판정",
      "Monaco Editor 기반 실시간 코드 스니펫 공유 캔버스"
    ],
    featured: false,
    updatedAt: "2026-08-18"
  }
];

export const initialCoursework: CourseworkSubject[] = [
  // 1학년 1학기
  {
    id: "course-1",
    name: "C프로그래밍 기초 및 실습",
    semester: "1학년 1학기",
    credits: 3,
    grade: "A+",
    professor: "이교수",
    keyConcepts: ["포인터와 동적 메모리 할당(malloc/free)", "구조체와 공용체", "파일 입출력", "재귀 함수"],
    termProjectName: "콘솔 기반 도서 관리 및 재고 대여 프로그램",
    review: "C언어의 포인터 연산과 메모리 구조(스택, 힙, 데이터 영역)를 체계적으로 정립한 첫 전공 과목"
  },
  {
    id: "course-2",
    name: "컴퓨터과학개론",
    semester: "1학년 1학기",
    credits: 3,
    grade: "A+",
    keyConcepts: ["컴퓨터 구조 개요", "2진법/불 대수", "네트워크 기초", "소프트웨어 라이프사이클"],
    review: "CS 전반의 넓은 시야를 확보하고 하드웨어와 소프트웨어의 상호작용 원리를 학습"
  },
  {
    id: "course-3",
    name: "이산수학",
    semester: "1학년 1학기",
    credits: 3,
    grade: "A0",
    keyConcepts: ["명제 논리와 증명법", "집합과 관계", "그래프와 트리 이론", "점화식과 조합론"],
    review: "알고리즘 분석의 수학적 토대가 되는 그래프 및 논리 전개 능력을 배양"
  },

  // 1학년 2학기
  {
    id: "course-4",
    name: "객체지향프로그래밍 (C++/Java)",
    semester: "1학년 2학기",
    credits: 3,
    grade: "A+",
    professor: "박교수",
    keyConcepts: ["캡슐화·상속·다형성", "가상 함수(Virtual Function) & V-Table", "템플릿(Generic)", "STL 및 예외 처리"],
    termProjectName: "객체지향 디자인 패턴을 적용한 턴제 RPG 시뮬레이터",
    review: "다형성과 SOLID 원칙의 기초를 다지고 클래스 간의 올바른 결합도/응집도를 고민하기 시작"
  },
  {
    id: "course-5",
    name: "공학설계입문 & 오픈소스 협업",
    semester: "1학년 2학기",
    credits: 3,
    grade: "A+",
    keyConcepts: ["Git & GitHub 협업 워크플로우", "Branch 전략 (Git Flow)", "이슈 및 PR 관리", "애자일 스크럼"],
    termProjectName: "팀 협업 CLI 일정 관리 유틸리티",
    review: "팀원들과 코드 충돌(Conflict)을 해결하고 PR 코드 리뷰 문화를 처음 접하며 협업의 즐거움을 배움"
  },

  // 2학년 1학기
  {
    id: "course-6",
    name: "자료구조 (Data Structures)",
    semester: "2학년 1학기",
    credits: 3,
    grade: "A+",
    professor: "김교수",
    keyConcepts: ["스택·큐·연결리스트", "AVL Tree & Red-Black Tree", "Heap & Priority Queue", "Hash Table & 충돌 해결", "Graph 인접 행렬/리스트"],
    termProjectName: "RB-Tree 기반의 고성능 인덱스 엔진 직접 구현",
    linkedProjectId: "proj-3",
    repoUrl: "https://github.com/minsu-dev/custom-rbtree-allocator",
    review: "모든 자료구조를 라이브러리 없이 C++ 포인터로 직접 구현하며 시간/공간 복잡도 최적화의 쾌감을 느낌"
  },
  {
    id: "course-7",
    name: "컴퓨터구조 (Computer Architecture)",
    semester: "2학년 1학기",
    credits: 3,
    grade: "A+",
    professor: "정교수",
    keyConcepts: ["MIPS/RISC-V 명령어 세트", "5단계 파이프라이닝 & 해저드(Data/Control/Structural Hazard)", "캐시 메모리 계층(L1/L2, Hit/Miss)", "가상 메모리와 TLB"],
    termProjectName: "MIPS 파이프라인 시뮬레이터 파서 제작",
    review: "작성한 고급 언어 코드가 어셈블리와 CPU 클럭 사이클에서 어떻게 실행되는지 하부 계층 원리를 완벽 이해"
  },
  {
    id: "course-8",
    name: "시스템소프트웨어 & 리눅스",
    semester: "2학년 1학기",
    credits: 3,
    grade: "A0",
    keyConcepts: ["어셈블러와 링커/로더", "ELF 파일 포맷", "리눅스 시스템 콜 (fork, exec, pipe)", "시그널 처리"],
    review: "운영체제 시스템 콜과 프로세스 생명주기를 다루며 백엔드 서버의 런타임 환경을 깊이 이해함"
  },

  // 2학년 2학기 (수강 예정)
  {
    id: "course-9",
    name: "알고리즘 (Algorithms)",
    semester: "2학년 2학기 (수강예정)",
    credits: 3,
    grade: "수강예정",
    keyConcepts: ["분할 정복(Divide and Conquer)", "동적 계획법(DP)", "탐욕 알고리즘(Greedy)", "NP-완전성 이론"],
    review: "2-2학기 핵심 전공. 코딩테스트 골드 이상 실력과 알고리즘적 문제 해결 역량을 정점에 올릴 계획"
  },
  {
    id: "course-10",
    name: "운영체제 (Operating Systems)",
    semester: "2학년 2학기 (수강예정)",
    credits: 3,
    grade: "수강예정",
    keyConcepts: ["프로세스와 스레드 동기화 (Mutex, Semaphore)", "CPU 스케줄링", "교착 상태(Deadlock)", "페이징/세그멘테이션 & 가상 메모리", "파일 시스템"],
    review: "백엔드 동시성 제어의 근간이 되는 멀티스레딩과 가상 메모리를 완벽히 마스터하는 것이 목표"
  },
  {
    id: "course-11",
    name: "데이터베이스 (Database Systems)",
    semester: "2학년 2학기 (수강예정)",
    credits: 3,
    grade: "수강예정",
    keyConcepts: ["관계형 데이터 모델 & 정규화 (1NF~BCNF)", "SQL 고급 문법", "트랜잭션 & ACID & 격리수준", "B+ Tree 인덱스 내부 구조", "동시성 제어(MVCC)"],
    review: "JPA를 쓰며 가졌던 DB 쿼리 플랜과 트랜잭션 잠금(Lock)의 근본적인 원리를 심화 학습할 예정"
  },
  {
    id: "course-12",
    name: "웹서버 프로그래밍 & 소프트웨어공학",
    semester: "2학년 2학기 (수강예정)",
    credits: 3,
    grade: "수강예정",
    keyConcepts: ["RESTful API 아키텍처", "인증/인가 & 보안", "테스트 주도 개발(TDD) & CI/CD", "디자인 패턴과 MSA 개요"],
    review: "팀 캡스톤의 전초 단계로, 실무 수준의 유지보수 가능한 백엔드/프론트엔드 프로젝트를 완성할 계획"
  }
];

export const initialTechSkills: TechSkill[] = [
  // Languages
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
    experience: "자료구조(RB-Tree, B-Tree) 직접 구현, 메모리 관리(RAII, 스마트 포인터) 및 백준 알고리즘 문제 해결",
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
    experience: "알고리즘 문제 풀이, 데이터 전처리 스크립트 및 간단한 자동화 봇 제작",
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

  // Frontend
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

  // Backend
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

  // Database & Infra
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

  // CS Fundamentals
  {
    id: "skill-13",
    name: "자료구조 & 알고리즘",
    category: "CS Fundamentals",
    level: "Proficient (아키텍처/최적화)",
    score: 88,
    experience: "자가 균형 트리, 해시 테이블 직접 구현 및 백준 280+ 문제 해결 (골드 IV)",
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

export const initialGoals: SemesterGoal[] = [
  {
    id: "goal-1",
    title: "2-2학기 전공 핵심 3대장(알고리즘, OS, DB) A+ 학점 유지",
    category: "전공 학점",
    targetDate: "2026.12.20",
    progress: 15,
    isCompleted: false,
    priority: "High",
    milestones: [
      { id: "m1", text: "방학 중 운영체제(공룡책) 및 DB 사전 예습 (완료)", done: true },
      { id: "m2", text: "중간고사 전 과목 A+ 획득하기", done: false },
      { id: "m3", text: "기말고사 및 텀 프로젝트 만점 달성", done: false },
      { id: "m4", text: "매주 수업 후 핵심 CS 개념 깃허브 위키에 정리하기", done: false }
    ]
  },
  {
    id: "goal-2",
    title: "Solved.ac 백준 골드 2 티어 달성 & 350문제 돌파",
    category: "알고리즘/코테",
    targetDate: "2026.11.30",
    progress: 55,
    isCompleted: false,
    priority: "High",
    milestones: [
      { id: "m5", text: "현재 골드 4 (284문제) 달성", done: true },
      { id: "m6", text: "주 4문제(골드급 2개, 실버급 2개) 꾸준히 풀이", done: false },
      { id: "m7", text: "DP 및 최단경로(다익스트라/벨만포드) 심화 30제 정복", done: false },
      { id: "m8", text: "카카오/삼성 코딩테스트 기출문제 10회분 풀이", done: false }
    ]
  },
  {
    id: "goal-3",
    title: "웹소켓 + Redis 기반 실시간 협업 주력 프로젝트 완성 및 릴리즈",
    category: "주력 프로젝트",
    targetDate: "2026.11.15",
    progress: 25,
    isCompleted: false,
    priority: "High",
    milestones: [
      { id: "m9", text: "프로젝트 기획 및 화면 와이어프레임 설계 (완료)", done: true },
      { id: "m10", text: "Spring Boot + STOMP 웹소켓 브로커 구현", done: false },
      { id: "m11", text: "Redis Pub/Sub을 이용한 다중 세션 분산 처리", done: false },
      { id: "m12", text: "AWS 배포 및 교내 학생 50명 대상 베타 테스트 진행", done: false }
    ]
  },
  {
    id: "goal-4",
    title: "교내 소프트웨어 해커톤 참가 및 Git Flow 협업 수상 도전",
    category: "대회/해커톤",
    targetDate: "2026.10.25",
    progress: 10,
    isCompleted: false,
    priority: "Medium",
    milestones: [
      { id: "m13", text: "소프트웨어학과 동기 3인 팀 빌딩", done: true },
      { id: "m14", text: "아이디어 브레인스토밍 및 사전 기술 검증(PoC)", done: false },
      { id: "m15", text: "무박 2일 해커톤 출전 및 장려상 이상 수상", done: false }
    ]
  },
  {
    id: "goal-5",
    title: "개발 블로그 월 4회 기술 포스팅 및 깃허브 1일 1커밋 유지",
    category: "기타",
    targetDate: "2026.12.31",
    progress: 70,
    isCompleted: false,
    priority: "Medium",
    milestones: [
      { id: "m16", text: "여름방학 동안 블로그 8편 포스팅 달성", done: true },
      { id: "m17", text: "2학기 전공 수업(OS/DB) 트러블슈팅 시리즈 연재", done: false },
      { id: "m18", text: "깃허브 2026년 연속 커밋 스트릭 150일 달성", done: false }
    ]
  }
];

export const initialDevLogs: DevLog[] = [
  {
    id: "log-1",
    title: "Spring Boot + JPA에서 N+1 문제가 발생하는 이유와 Fetch Join 최적화",
    date: "2026-08-12",
    category: "트러블슈팅",
    tags: ["JPA", "Spring Boot", "MySQL", "성능 최적화"],
    linkedProjectId: "proj-2",
    content: `캠퍼스메이트 프로젝트를 개발하던 중, 전공 서적 20개를 조회하는 단순 API에서 쿼리가 무려 41번 나가는 것을 확인했다.
원인은 연관 엔티티인 \`BookAuthor\`와 \`Category\`가 지연 로딩(LAZY)으로 설정되어 있어, 루프를 돌며 getter를 호출할 때마다 매번 SELECT 쿼리가 발생하는 N+1 문제였다.

### 해결 과정
1. **Batch Size 설정**: \`default_batch_fetch_size: 100\`을 설정하여 IN 절 쿼리로 묶음 처리 시도.
2. **Fetch Join 적용**: 목록 조회 전용 JPQL에 \`JOIN FETCH\`를 적용하여 1회 단일 JOIN 쿼리로 모든 데이터를 한번에 가져오도록 수정.
3. **결과**: 쿼리 41회 -> 1회 단축, API 레이턴시 180ms에서 28ms로 약 84% 단축 성공!`
  },
  {
    id: "log-2",
    title: "C++ 스마트 포인터의 순환 참조(Circular Reference)와 weak_ptr",
    date: "2026-07-28",
    category: "기술 학습 (TIL)",
    tags: ["C++", "Memory", "Smart Pointer"],
    linkedProjectId: "proj-3",
    content: `자료구조 엔진을 만들며 부모 노드와 자식 노드가 서로 \`std::shared_ptr\`를 가지게 설계했더니, 소멸자가 호출되지 않아 메모리 릭이 발생하는 것을 발견했다.

- **원인**: Reference Count가 서로 물려 0으로 떨어지지 않는 순환 참조 발생.
- **해결**: 부모가 자식을 가리킬 때는 \`shared_ptr\`, 자식이 부모를 참조할 때는 참조 카운트를 올리지 않는 \`std::weak_ptr\`를 사용하도록 변경.
- **결과**: 객체 소멸 정상 확인 및 Valgrind 메모리 릭 0 byte 달성.`
  },
  {
    id: "log-3",
    title: "2학년 1학기 종강 회고: CS 기본기의 중요성과 2학기를 맞이하는 다짐",
    date: "2026-06-25",
    category: "학기 회고",
    tags: ["회고", "학업", "2학년 2학기 준비"],
    content: `2학년 1학기는 자료구조와 컴퓨터구조를 배우며 개발자로서의 시야가 완전히 바뀐 학기였다.
단순히 프레임워크나 라이브러리를 쓰는 법을 넘어서, 메모리 구조와 CPU 클럭, 트리 밸런싱 같은 저수준 원리를 파고들면서 코드 한 줄을 짤 때도 시간 복잡도와 메모리 사용량을 신중히 계산하게 되었다.

다가오는 2학년 2학기는 **운영체제, 데이터베이스, 알고리즘**이라는 CS의 심장을 배우는 학기다.
이 지식들을 내 주력 프로젝트(Spring Boot + Redis 실시간 서비스)에 녹여내어 '진짜 실력 있는 개발자'로 한 단계 도약하자!`
  }
];
