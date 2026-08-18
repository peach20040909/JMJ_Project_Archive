import { UserProfile, ProjectItem, TechSkill, DevLog, CoverLetterItem } from '../types';

export const initialProfile: UserProfile = {
  name: "장민준",
  englishName: "Minjun Jang",
  title: "탄탄한 CS 기본기와 실무 문제 해결력을 갖춘 융합소프트웨어 엔지니어",
  university: "명지대학교",
  department: "융합소프트웨어학부",
  currentSemester: "2학년 2학기 (2026 Fall)",
  gpa: "4.18 / 4.50",
  targetRole: "Fullstack & Backend Software Engineer",
  email: "a01027010769@gmail.com",
  githubUrl: "https://github.com/minjun-dev",
  blogUrl: "https://velog.io/@minjun_dev",
  solvedAcTier: "Gold IV",
  solvedCount: 284,
  location: "Seoul, Republic of Korea",
  bio: "명지대학교 융합소프트웨어학부 2학년 2학기 재학 중입니다. 자료구조, 알고리즘, 컴퓨터 시스템의 동작 원리에 깊은 관심을 가지고 있으며, 안정적인 백엔드 아키텍처와 직관적인 웹 인터페이스를 설계하는 풀스택/백엔드 개발자를 지향합니다.",
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
    title: "JMJ_Archive - 개발자 포트폴리오 & 직무 아카이브",
    summary: "소프트웨어학과 학생을 위한 프로젝트 관리, GitHub 자동 연동, AI 기반 STAR 이력서 및 트러블슈팅 아카이빙 플랫폼",
    category: "Web",
    semester: "2학년 여름방학",
    period: "2026.07 - 2026.08 (1개월)",
    teamType: "개인",
    role: "Fullstack Architecture & Design",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Express", "Node.js", "Gemini 3.7 Flash"],
    problemDescription: "소프트웨어학과 재학 중 분산되어 있던 과제, 토이 프로젝트, 깃허브 저장소, 알고리즘 풀이 기록을 체계적으로 구조화하고 채용 담당자가 보기 편한 포맷으로 전달하기 어려움",
    solutionDescription: "GitHub 링크 단일 입력 기반 AI 프로젝트 자동 추출 엔진, STAR 기법 자소서 변환기, 기술 스택 매트릭스가 통합된 단일 인터페이스 구축",
    resultDescription: "자신의 개발 히스토리를 한눈에 조망하고 4학년 취업 준비까지 지속 관리할 수 있는 아카이브 완성, 포트폴리오 및 자기소개서 작성 시간 60% 단축",
    keyFeatures: [
      "GitHub 저장소 링크 기반 AI 프로젝트 자동 분석 및 등록 시스템",
      "STAR(상황-과제-행동-결과) 기법 기반 AI 자기소개서 작성기 & 면접 대비 코치",
      "기술 스택별 숙련도 및 프로젝트 연계 매트릭스",
      "공개용 이력서 뷰(Visitor Mode) 및 JSON/Markdown 내보내기"
    ],
    githubUrl: "https://github.com/minsu-dev/dev-archive",
    demoUrl: "https://dev-archive.app",
    featured: true,
    starBullets: [
      "[Situation] 분산된 학업 및 개발 산출물을 단일 플랫폼에서 체계화할 필요성 대두",
      "[Task] 개발자 친화적인 직관적 UI와 Gemini API 기반의 프로젝트 문맥 분석/자소서 생성 엔진 풀스택 설계",
      "[Action] React 19와 Tailwind CSS로 반응형 SPA를 구현하고 Express 백엔드에 Gemini 3.7 Flash를 연동하여 STAR 구조화 프롬프트 튜닝",
      "[Result] 프로젝트 기록 관리 효율 2배 향상 및 깔끔한 공유용 포트폴리오 링크 생성 기능 제공"
    ],
    troubleshootingStory: `### 🔍 트러블슈팅 & 문제 해결 일지\n\n1. **상황**: 로컬 데이터와 AI 생성 결과가 비동기로 갱신될 때 UI 깜빡임 및 레이아웃 밀림 발생\n2. **원인**: 여러 상태가 개별적으로 dispatch되면서 React 19 렌더링 사이클에서 불필요한 리렌더링 유발\n3. **해결**: 복합 상태를 불변 객체로 묶어 atomic하게 업데이트하고, LocalStorage 동기화 훅을 최적화\n4. **교훈**: 컴포넌트 간 단방향 데이터 흐름과 상태 응집도의 중요성을 체감함.`,
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
  }
];

export const initialTechSkills: TechSkill[] = [
  {
    id: "skill-1",
    name: "Java / Spring Boot",
    category: "Backend",
    level: "Proficient (아키텍처/최적화)",
    score: 85,
    experience: "Spring Boot 3, Spring Data JPA, Spring Security 기반 RESTful API 구축 및 비관적 락/Redis 분산 락 동시성 제어 실무 구현",
    featured: true
  },
  {
    id: "skill-2",
    name: "C / C++ (C++20)",
    category: "Languages",
    level: "Proficient (아키텍처/최적화)",
    score: 88,
    experience: "Red-Black Tree 자가 균형 트리 직접 구현, 포인터 조작, RAII 기반 메모리 풀 및 가비지 최소화, Valgrind 메모리 릭 디버깅",
    featured: true
  },
  {
    id: "skill-3",
    name: "MySQL / RDBMS",
    category: "Database & Infra",
    level: "Competent (과제/프로젝트 구현)",
    score: 80,
    experience: "정규화(1NF~3NF), 인덱스 B-Tree 원리 이해, JPA Fetch Join을 통한 N+1 쿼리 병목 해결 및 EXPLAIN 실행 계획 분석",
    featured: true
  },
  {
    id: "skill-4",
    name: "React / TypeScript",
    category: "Frontend",
    level: "Competent (과제/프로젝트 구현)",
    score: 82,
    experience: "React 19 Hooks, 커스텀 훅 설계, TypeScript 제네릭을 통한 타입 세이프티 확보, Tailwind CSS 현대적 반응형 UI 구현",
    featured: true
  },
  {
    id: "skill-5",
    name: "Redis & Caching",
    category: "Database & Infra",
    level: "Competent (과제/프로젝트 구현)",
    score: 75,
    experience: "세션 저장소, 랭킹 리더보드 Sorted Set, Redisson 분산 락을 활용한 선착순 트래픽 동시성 제어",
    featured: false
  },
  {
    id: "skill-6",
    name: "자료구조 & 알고리즘",
    category: "CS Fundamentals",
    level: "Proficient (아키텍처/최적화)",
    score: 86,
    experience: "트리, 그래프, 힙, 해시테이블 직접 구현 가능 및 백준 284+ 문제 해결 (Gold IV), Big-O 복잡도 분석 능력",
    featured: true
  },
  {
    id: "skill-7",
    name: "Docker & Linux",
    category: "Database & Infra",
    level: "Competent (과제/프로젝트 구현)",
    score: 74,
    experience: "Docker Compose 멀티 컨테이너 환경 구성, Linux 터미널 환경 세팅 및 AWS EC2 인스턴스 배포",
    featured: false
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
    title: "CS 기본기의 중요성과 실무 프로젝트에서의 트레이드오프 분석",
    date: "2026-06-25",
    category: "학기 회고",
    tags: ["회고", "학업", "엔지니어링 마인드"],
    content: `단순히 프레임워크나 라이브러리를 쓰는 법을 넘어서, 메모리 구조와 CPU 클럭, 트리 밸런싱 같은 저수준 원리를 파고들면서 코드 한 줄을 짤 때도 시간 복잡도와 메모리 사용량을 신중히 계산하게 되었다.
프로젝트에서 마주하는 병목 현상들을 CS 원리에 기반해 하나씩 풀어나갈 때 큰 성취감을 느낀다.`
  }
];

export const initialCoverLetters: CoverLetterItem[] = [
  {
    id: "cl-1",
    companyName: "카카오 / 네이버",
    targetRole: "서버 / 백엔드 개발자 인턴",
    questionCategory: "기술적 도전 및 문제해결",
    question: "본인이 수행한 프로젝트 중 가장 기술적으로 도전적이었던 문제와, 이를 해결하기 위해 시도한 구체적인 과정 및 결과를 기술해 주십시오. (1,000자 이내)",
    linkedProjectIds: ["proj-2"],
    content: `[데이터 정합성을 위한 락 전략과 쿼리 튜닝으로 응답 속도 84% 개선]\n\n교내 전공 서적 및 실습 기자재 대여 플랫폼 'CampusMate'의 백엔드 리더로서, 선착순 대여 오픈 시 발생하는 동시성 문제와 쿼리 병목을 해결한 경험이 있습니다.\n\n학기 초 인기 기자재 오픈 시 500건 이상의 동시 요청이 집중되면서 중복 예약(Overbooking) 및 재고 마이너스 버그가 발생했습니다. 저는 데이터 정합성을 최우선으로 확보하기 위해 MySQL의 비관적 쓰기 락(Pessimistic Write Lock)을 도입했습니다. \`SELECT ... FOR UPDATE\`를 적용하여 트랜잭션 단위로 레코드를 선점하도록 격리 수준을 제어함으로써, 동시 요청 500 TPS 부하 환경에서도 단 한 건의 오버부킹 없는 정합성 100%를 달성했습니다.\n\n동시에 목록 조회 API에서 연관 엔티티의 지연 로딩으로 인해 쿼리가 41회 발생하는 N+1 병목을 확인했습니다. 실행 계획(EXPLAIN)을 분석한 후, JPQL \`JOIN FETCH\`를 적용하여 단 1회의 결합 쿼리로 데이터를 병합 조회하도록 리팩토링했습니다. 그 결과 데이터베이스 I/O가 41회에서 1회로 감소하고 평균 응답 시간이 420ms에서 65ms로 약 84% 대폭 개선되었습니다.\n\n이 경험을 통해 단순한 기능 완성을 넘어 시스템의 병목을 진단하고, 데이터베이스 락과 쿼리 최적화라는 명확한 근거를 바탕으로 엔지니어링 문제를 해결하는 즐거움을 배웠습니다. 입사 후에도 트래픽과 데이터 신뢰성을 책임지는 엔지니어가 되겠습니다.`,
    targetCharCount: 1000,
    memo: "JMeter 부하 테스트 수치(500 TPS) 및 N+1 해결 쿼리(JOIN FETCH) 면접 꼬리 질문 대비하기",
    interviewTips: [
      "선착순 예약 시스템에서 비관적 락 대신 낙관적 락(Optimistic Lock)이나 Redis 분산 락을 쓰지 않은 이유는 무엇인가요?",
      "비관적 락 사용 시 발생할 수 있는 데드락(Deadlock) 위험은 어떻게 모니터링하고 방지했나요?",
      "JPA Fetch Join 사용 시 발생할 수 있는 페이징(Pagination) 한계와 컬렉션 페치 조인의 주의점은 무엇인가요?"
    ],
    keyStrengths: [
      "실무 수준의 데이터베이스 동시성 제어 및 락 전략 수립",
      "JPA N+1 쿼리 최적화 및 실행 계획(EXPLAIN) 분석 능력",
      "JMeter 부하 테스트를 통한 정량적 성능 지표 도출"
    ],
    updatedAt: "2026-08-18"
  },
  {
    id: "cl-2",
    companyName: "토스 / 당근",
    targetRole: "소프트웨어 엔지니어 인턴",
    questionCategory: "주도적 학습 및 성장",
    question: "기존의 익숙한 방식에서 벗어나 새로운 기술이나 원리를 밑바닥부터 깊이 파고들어 학습하고 적용한 경험을 서술해 주십시오. (800자 이내)",
    linkedProjectIds: ["proj-3"],
    content: `[라이브러리 뒤편의 원리를 이해하기 위해 C++로 RB-Tree와 메모리 풀러를 구현하다]\n\n라이브러리가 제공하는 추상화된 편리함 뒤편에서 동작하는 시스템의 실제 원리를 체득하고자, C++20으로 Red-Black Tree와 커스텀 메모리 풀러(Buddy Allocator)를 직접 설계하고 구현했습니다.\n\n표준 라이브러리(STL std::map)를 단순히 호출하는 것을 넘어, 노드 삽입 및 삭제 시 발생하는 5가지 불변 조건 위반 케이스를 분석하고 좌/우 회전(Rotate) 및 색상 리밸런싱 알고리즘을 이중 포인터 조작으로 구현했습니다. 개발 중 노드 삭제 시 형제 노드가 Red인 특수 케이스에서 댕글링 포인터(Dangling Pointer)로 인한 세그먼트 폴트가 발생했으나, GDB와 Valgrind 툴을 연동하여 삭제 전 부모-자식 관계를 백업하는 RAII 래퍼 패턴을 적용해 메모리 누수 0 byte를 검증했습니다.\n\n또한 빈번한 시스템 malloc/free 호출 오버헤드를 줄이고자 Buddy Allocator 기반의 고정 블록 메모리 풀을 연동하여 내부 단편화를 최소화했습니다. 그 결과 100만 건 난수 삽입 스트레스 테스트에서 표준 AVL 대비 15% 빠른 성능을 입증했습니다.\n\n이 과정에서 자료구조와 메모리 수명주기라는 컴퓨터공학 기초가 코드의 성능과 안정성에 미치는 결정적 영향을 체감했습니다. 새로운 기술을 마주할 때도 내부 메커니즘을 끝까지 파고들어 최고의 효율을 만들어내겠습니다.`,
    targetCharCount: 800,
    memo: "C++ RAII 패턴 및 Valgrind 메모리 릭 디버깅 과정 구체적 설명 준비",
    interviewTips: [
      "Red-Black Tree와 AVL Tree의 시간 복잡도와 트리의 균형도 차이점은 무엇인가요?",
      "메모리 풀링(Memory Pool)을 도입했을 때 단편화(Fragmentation) 문제를 어떻게 완화했나요?",
      "스마트 포인터의 순환 참조(Circular Reference)를 해결하기 위한 weak_ptr 동작 원리는 무엇인가요?"
    ],
    keyStrengths: [
      "자료구조와 저수준 메모리 관리(C++)에 대한 깊이 있는 이해",
      "Valgrind 및 GDB를 활용한 디버깅 및 무결성 검증 역량",
      "라이브러리에 의존하지 않고 원리를 파고드는 주도적 엔지니어링 집요함"
    ],
    updatedAt: "2026-08-18"
  }
];
