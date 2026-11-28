import { UserProfile, ProjectItem, TechSkill, DevLog, CoverLetterItem } from '../types';

export const initialProfile: UserProfile = {
  "name": "장민준",
  "englishName": "JANG MINJUN",
  "title": "사용자의 문제를 웹 서비스와 데이터로 풀어가는 장민준",
  "university": "명지대학교",
  "department": "융합소프트웨어학부",
  "currentSemester": "2학년 2학기",
  "gpa": "4.27 / 4.50",
  "targetRole": "AI 서비스 개발 · 업무 자동화 · AI 출력 검증",
  "email": "a01027010769@gmail.com",
  "githubUrl": "https://github.com/peach20040909",
  "blogUrl": "https://velog.io/@peach20040909/posts",
  "location": "Seoul, Republic of Korea",
  "bio": "반복 업무를 줄이고, 판단에 필요한 근거를 확인할 수 있는 AI 서비스를 만드는 장민준입니다.\n\n일하던 학원에서는 시험 자료 편집과 합본 제작을 자동화했습니다. 한만큼에서는 AI가 협업 기록을 분류·요약하고, 교수는 원본을 확인해 최종 판단할 수 있게 설계했습니다.",
  "interests": [
    "대용량 트래픽 & 분산 시스템",
    "동시성 제어 및 쿼리 최적화",
    "클린 코드 & 객체지향 설계",
    "Spring Boot & React 현대적 웹 아키텍처"
  ]
};

const previousProfileBios = new Set([
  "명지대학교 융합소프트웨어학부 데이터사이언스전공 장민준입니다. 사용자 조사로 문제를 정의하고, 웹 서비스와 데이터 도구를 구현합니다. 혼밥지도, 팀 기여도 근거 리포트, 해외탐방 현장조사 플랫폼을 만들며 설계 판단과 문제 해결 과정을 기록하고 있습니다.",
  '명지대학교 융합소프트웨어학부 데이터사이언스전공입니다. 상상만 했던 것들을 실제로 구현하는 활동을 좋아합니다.',
]);

export function upgradeProfile(profile: UserProfile): UserProfile {
  const bio = profile.bio?.replace(/\s+/g, ' ').trim();
  const useNewBio = !bio || previousProfileBios.has(bio);
  return {
    ...profile,
    bio: useNewBio ? initialProfile.bio : profile.bio,
    targetRole: useNewBio && (!profile.targetRole || ["Software Development · Data · IT", "Fullstack & Backend Software Engineer"].includes(profile.targetRole))
      ? initialProfile.targetRole
      : profile.targetRole,
  };
}


export const initialProjects: ProjectItem[] = [
  {
    "id": "proj-kickboard-2026",
    "title": "Mobility Field Lab — 해외탐방 공유 이동수단 조사 플랫폼",
    "summary": "서울과 유럽의 공유 킥보드·전기자전거를 같은 기준으로 기록하고, 사진·독립 검수·지도·지표로 비교하는 현장조사 웹앱",
    "category": "AI/Data",
    "semester": "2학년 2학기",
    "period": "2026.09 - 2027.01 (진행 중)",
    "teamType": "팀 (2명)",
    "role": "웹앱 개발 · 조사 데이터 흐름 설계",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "IndexedDB",
      "Leaflet",
      "Python / FastAPI",
      "Qwen3-VL (실험)"
    ],
    "problemDescription": "도시마다 규제가 다른 공유 이동수단의 보도 점유를 비교하려면 동일한 수집 기준과 검수 가능한 사진·측정 기록이 필요합니다.",
    "solutionDescription": "사진과 조사 구간을 등록하고 두 사람이 독립적으로 판정한 뒤 차이를 조정합니다. 기기 중복 연결, 지도·지표, JSON 백업과 CSV 내보내기로 조사 흐름을 구현했습니다.",
    "resultDescription": "해외탐방 프로그램 선발 완료. 실제 해외 현장에서 사용할 조사 웹앱을 구현하고 GitHub Pages에 배포했습니다. 현재 브라우저 IndexedDB에 저장하며 합성 예시와 실제 조사 기록을 분리합니다. 로컬 비전 AI는 실험적 연결 단계입니다. 해외 현장조사를 준비하고 있으며, 팀 동기화는 후속 개발 항목입니다.",
    "keyFeatures": [
      "조사 구간·사진·측정값 등록 및 IndexedDB 저장",
      "A/B 독립 판정과 최종 조정",
      "중복 기기 연결·해제 및 도시별 지도·지표",
      "JSON 백업·복원과 CSV 내보내기",
      "GitHub Pages 현장조사 웹앱",
      "실험: Python / FastAPI 기반 Qwen3-VL 로컬 연결"
    ],
    "githubUrl": "https://github.com/peach20040909/mobility-field-lab",
    "demoUrl": "https://peach20040909.github.io/mobility-field-lab/",
    "featured": true,
    "starBullets": [
      "[Situation] 도시 간 공유 이동수단 비교를 위한 일관된 조사·검수 기록이 필요했습니다.",
      "[Task] 해외탐방 선발 후 실제 해외 현장에서 사진·측정·검수 기록에 사용할 조사 도구를 개발합니다.",
      "[Action] 조사 등록→사진 저장→독립 판정→최종 조정→지도·지표→CSV 흐름을 구현했습니다.",
      "[Result] 해외탐방 프로그램에 선발되어 현장조사를 준비하고 있습니다. 조사 웹앱을 구현·배포했으며, 탐방 결과는 현장조사 후 정리할 예정입니다."
    ],
    "troubleshootingStory": "# 해외탐방 연구를 조사 도구로 구현하기\n\n## 진행 상태\n해외탐방 프로그램 선발을 완료했으며, 직접 해외 현장을 방문해 공유 이동수단을 조사할 준비를 하고 있습니다.\n\n## 현재 구현\n사진·측정값 저장, A/B 독립 판정, 판정 조정, 중복 기기 연결, 지도·지표와 CSV 내보내기를 제공합니다.\n\n## 설계 판단\n- 조사 기록과 합성 예시를 분리합니다.\n- AI 결과를 그대로 확정하지 않고 사람의 독립 검수와 조정 기록을 남깁니다.\n- IndexedDB를 이용해 브라우저에서 사진·기록을 보관합니다. 여러 기기 간 동기화는 아직 지원하지 않습니다.\n\n## 실험과 후속 계획\nQwen3-VL 로컬 AI 연결은 실험 단계입니다. 해외 현장조사는 선발 이후의 실제 탐방 활동으로 준비 중입니다. 견인 원자료 연결과 계정 기반 팀 동기화는 후속 개발 항목입니다. 사진 한 장으로 절대 보도 폭을 정확히 측정하거나 법적 판정을 제공한다고 주장하지 않습니다.\n\n[구현·검증 문서](https://github.com/peach20040909/mobility-field-lab)",
    "updatedAt": "2026-10-01"
  },
  {
    "id": "proj-mju-solomap",
    "title": "혼밥지도 (SoloMap) — 명지대 인문캠 혼밥 난이도 지도",
    "summary": "명지대 인문캠퍼스 주변 식당을 혼밥 난이도 Lv.1~5로 보여 주고, 학교 메일로 인증한 학우의 리뷰가 난이도를 바꾸며, 체크인으로 나만의 혼밥 레벨을 키우는 모바일 웹 서비스",
    "category": "Web",
    "semester": "2학년 2학기 (고급웹프로그래밍 기말 프로젝트)",
    "period": "2026.09.09 - 2026.12.08",
    "teamType": "개인",
    "role": "기획 · 디자인 · 프론트엔드 · 백엔드 · 배포 전부 (개인)",
    "techStack": [
      "TypeScript",
      "Node.js",
      "Express 5",
      "Prisma 7",
      "PostgreSQL (Supabase)",
      "Passport",
      "express-session",
      "bcrypt",
      "Kakao Local API",
      "NAVER Maps API",
      "Gemini API",
      "Vanilla JS",
      "Vercel",
      "Puppeteer"
    ],
    "problemDescription": "학교 주변 식당 정보는 별점·리뷰 수 위주여서 1인석, 혼자 주문할 메뉴, 점심 피크의 혼밥 편의성을 확인하려면 리뷰를 일일이 읽어야 했습니다.",
    "solutionDescription": "혼밥 난이도 Lv.1~5를 기준으로 식당을 탐색하고 학교 메일 인증 학우의 리뷰·방문 체크인이 난이도와 사용자 레벨에 반영되도록 설계했습니다. 네이버 지도와 카카오 검색, Gemini 식당별 팁을 연결하고 외부 API 실패 시 대체 흐름을 두었습니다.",
    "resultDescription": "개발·배포 완료. Vercel에서 서비스를 제공합니다. 프로젝트 검증 기록: 서버 테스트 27개, 화면 E2E 테스트, 평가용 API 요청 31개 통과. 트러블슈팅 20건을 기록하고 휴대폰 사용 피드백을 반영했습니다.",
    "keyFeatures": [
      "혼밥 난이도 5단계: Lv.1 입문 혼밥 · Lv.2 혼밥 성지 · Lv.3 일반 밥집 · Lv.4 다인석 식당 · Lv.5 혼밥 끝판왕. 리뷰가 있으면 학우 평균을 반올림한 난이도에 (학우평가)를 표시하고, 없으면 기본 난이도를 사용합니다.",
      "학우 리뷰 CRUD: 사용자·식당 조합당 리뷰 1개를 DB 고유 제약으로 보장하며, 중복 등록은 409 응답 후 수정 화면으로 전환합니다. 등록·수정·삭제와 평균 난이도·리뷰 수 재집계를 같은 트랜잭션으로 처리합니다.",
      "체크인과 레벨: 식당 난이도만큼 경험치를 적립하고 5·15·30·50점에서 레벨이 오릅니다. Lv.5는 Lv.5 식당 1곳 이상 방문이 추가로 필요하며, 같은 식당은 한국 시간 기준 하루 1회만 체크인할 수 있습니다.",
      "나의 혼밥 기록: 레벨, 정복한 식당, 내 레벨에 맞는 다음 도전 식당 3곳, 정복·추천 지도를 제공합니다.",
      "학교 메일 인증·로그인: @mju.ac.kr 6자리 인증 코드를 SHA-256 해시로만 저장하며 10분 이내 5회 입력, 재발송 60초 간격을 적용합니다. bcrypt 비밀번호 해시와 Passport·express-session·PostgreSQL DB 세션을 사용합니다.",
      "검색·지도: 메뉴 10칸, 키워드 검색, 목록 ↔ 네이버 지도, 난이도 필터와 5가지 정렬(가까운 순·쉬운 순·어려운 순·리뷰 많은 순·이름순), 난이도 마커·화면 기준 클러스터링을 제공합니다.",
      "오늘 뭐 먹지?: 난이도를 선택한 랜덤 뽑기에서 식당 상세로 바로 이동합니다. 상세는 주소 기반으로 링크 공유·새로고침·휴대폰 뒤로 가기와 카카오맵·네이버 지도 바로가기, 학우 리뷰를 지원합니다.",
      "모바일 전용 UI: PC에서도 가운데 430px 휴대폰 화면으로 표시하며 레벨별 음식 캐릭터를 적용했습니다. 키보드 조작·44px 터치 영역·글자 200% 확대를 지원합니다.",
      "검색 데이터: 직접 검증한 시드 식당 125곳과 카카오 실시간 검색을 중복 제거해 합치고, 도보 800m 밖 상권과 술집·카페·떡집·마트를 걸러냅니다.",
      "외부 API 장애 대비: Gemini가 4초 안에 응답하지 않으면 규칙 안내를 먼저 제공하고 늦게 온 응답은 캐시에 저장합니다. 네이버 지도 SDK 실패 시 Leaflet으로 자동 전환하고, 카카오 키가 없으면 시드 식당으로 검색합니다."
    ],
    "githubUrl": "https://github.com/peach20040909/MJU_solomap",
    "demoUrl": "https://mju-solomap.vercel.app",
    "featured": true,
    "starBullets": [
      "[Situation] 학교 주변 식당 정보는 별점·리뷰 수 위주여서 1인석, 혼자 주문할 메뉴, 점심 피크의 혼밥 편의성을 확인하려면 리뷰를 일일이 읽어야 했습니다.",
      "[Task] 식당별 혼밥 난이도 Lv.1~5를 제공하고, 학우 리뷰로 난이도가 보정되며 체크인으로 사용자 레벨이 오르는 서비스를 혼자 기획·설계·구현·배포했습니다.",
      "[Action] Express 5·TypeScript의 Router → Controller → Service 구조와 Prisma·Supabase PostgreSQL로 REST API 24개와 테이블 6개(User·Place·Review·CheckIn·EmailVerification·Session)를 설계했습니다. 학교 메일 인증·DB 세션 로그인, 리뷰 집계 트랜잭션, 시드 식당 125곳·카카오 검색 통합, Gemini 4초 제한·캐시 164곳, Puppeteer 화면 테스트를 구현했습니다.",
      "[Result] Vercel 배포를 완료했습니다. 프로젝트 검증 기록상 서버 테스트 27개·화면 E2E 테스트·평가용 API 요청 31개가 기대한 상태 코드로 통과했고, TROUBLESHOOTING.md에 원인·해결을 담은 20건을 기록했습니다. Codex QA 7차와 Chrome 직접 QA, 친구들의 휴대폰 피드백으로 홈·검색 결과를 분리하고 모바일 디자인·레벨별 캐릭터를 개선했습니다."
    ],
    "troubleshootingStory": "# 혼밥지도 (SoloMap) — 트러블슈팅 & 핵심 설계 일지\n\n**1. 메뉴 칩을 누르면 검색이 최대 5분 멈춤**\n- **문제:** 마라탕 검색이 128초, 돈까스 검색이 300초를 넘어 Vercel 시간 제한에 걸렸다.\n- **원인:** 캐시에 없는 식당마다 Gemini를 호출하고, Promise.all로 모든 응답을 기다렸다.\n- **해결:** Gemini 호출을 Promise.race로 4초 제한하고, 늦으면 규칙 기반 안내로 먼저 응답한다. 늦게 온 답은 캐시에 저장해 다음 검색부터 쓴다.\n- **결과:** 돈까스 5.5초, 마라탕 1.0초로 줄었다.\n\n**2. 식당 안내 문구가 전부 같아짐**\n- **문제:** 배포 후 여러 식당에 똑같은 기본 문구가 표시됐다.\n- **원인:** 쓰던 Gemini 모델이 종료돼 404가 났는데, 오류 없이 기본 문구로 대체됐다. 그 기본 문구가 캐시에까지 저장됐다.\n- **해결:** Vercel 로그에서 404를 찾아 모델을 교체했다. 잘못 저장된 캐시 문구 17개를 지우고 다시 만들었고, 기본 문구는 캐시하지 않게 바꿨다.\n- **배운 점:** 오류를 숨기는 대체 처리는 로그로 꼭 확인해야 한다.\n\n**3. 배포하자 네이버 지도가 안 뜸**\n- **원인:** 네이버 지도 SDK는 콘솔에 등록한 주소에서만 동작하는데, 새 배포 주소가 등록돼 있지 않았다.\n- **해결:** 배포 주소를 등록했다. 지도 SDK가 실패하면 Leaflet 지도로 자동 전환되게 했다.\n\n**4. 카카오 검색만으로는 대학가 맛집이 빠짐**\n- **해결:** 직접 검증한 시드 DB(125곳)를 만들고, 카카오 검색 결과와 합치면서 중복을 제거했다.\n- **필터:** 도보 800m 밖 상권과 술집·카페·떡집·마트를 걸러냈다.\n\n**5. 휴대폰에서 끝없이 스크롤해야 함 (사용자 피드백)**\n- **문제:** 홈 아래로 식당 129곳이 계속 이어졌다.\n- **해결:** 홈(내 레벨 카드 + 메뉴 10칸)과 검색 결과 화면으로 나눴다. 주소에 검색어를 남겨 뒤로 가기와 링크 공유가 되게 했고, 카드 높이를 줄여 20곳씩 보여 준다.\n\n**6. 배포 후 QA로 잡은 상태·주소 버그**\n- 뽑기 창을 Esc로 닫으면 방문 기록이 남아, 홈 주소인데 검색 결과가 보이던 문제를 고쳤다.\n- 공유받은 검색·식당 링크에서 \"홈으로 돌아가기\"를 누르면 사이트 밖으로 나가던 문제를 고쳤다.\n- 뒤로·앞으로 가기를 하면 고른 난이도가 풀리던 문제를 고쳤다.\n- 카카오가 거점(명지전문대·백련시장) 기준으로 돌려주던 도보 거리를 명지대 기준으로 다시 계산했다.\n- `%`, `#`처럼 기호만 있는 검색어에 엉뚱한 식당이 나오던 문제를 고쳤다.\n\n**7. 핵심 설계**\n- **표시 난이도:** 서버 한 곳(calculateDisplaySoloLevel)에서만 정한다.\n- **리뷰 집계:** 리뷰를 바꿀 때마다 같은 트랜잭션에서 평균 난이도와 리뷰 수를 다시 계산한다.\n- **DB 고유 제약:** (사용자, 식당) 리뷰 1개, (사용자, 식당, 날짜) 체크인 1개를 DB에서 막는다.\n- **세션:** connect-pg-simple로 PostgreSQL에 저장해, 서버가 다시 켜져도 로그인이 유지된다.\n- **오류 응답:** 오류 처리 미들웨어가 상황별 상태 코드(400·401·403·404·409·429)와 JSON 안내를 돌려준다.",
    "updatedAt": "2026-11-24"
  },
  {
    "id": "proj-hmk-2026",
    "title": "한만큼 — 팀 프로젝트 기여도 근거 리포트 서비스",
    "summary": "교수의 기존 평가기준과 협업 기록을 연결하는 근거 리포트 서비스. AI 초안을 사람이 검증하며, 성적을 대신 산출하지 않습니다.",
    "category": "AI/Data",
    "semester": "2학년 2학기",
    "period": "2026.09 - 2026.11.26",
    "teamType": "팀 (3명)",
    "role": "UX·UI 설계 및 사이트 구현 총괄 · 시연 영상·최종결과물 제작",
    "techStack": [
      "Node.js",
      "Vercel",
      "Turso (libSQL)",
      "Anthropic Claude API (claude-haiku)",
      "GitHub REST API",
      "Notion Webhook",
      "Playwright"
    ],
    "problemDescription": "팀 과제의 결과물만으로는 개인별 기여 과정을 파악하기 어렵습니다. 교수 4인의 이메일 서면 인터뷰를 바탕으로 확인 가능한 작업 근거를 제공하는 아이디어를 출발점으로 삼았습니다.",
    "solutionDescription": "교수의 기존 평가기준을 AI가 정리하고 교수가 수정·확정합니다. 기록 분류·근거 요약·자기 기술은 사람의 검토를 거치는 초안이며, AI와 규칙 판단이 엇갈리면 원본 확인을 요청합니다. 서비스는 성적을 산출하지 않습니다.",
    "resultDescription": "창업경진대회에서는 UI 목업·사업 계획으로 본선에 진출했습니다. 이후 3인 팀의 AI 리터러시 경진대회 버전으로 실제 서비스를 Vercel에 배포하고 결선에 진출했습니다. 근거 리포트 PDF, 시연 영상과 제출물을 제작했고 2026년 11월 26일 결선에서 우수상을 수상했습니다.",
    "keyFeatures": [
      "교수의 기존 평가기준 정리·수정·확정",
      "GitHub REST API·Notion Webhook 기반 작업 기록 연결",
      "AI 분류·규칙 판단 불일치 시 확인 필요 표시 및 원래 AI 판단 보존",
      "기록별 AI 도움 표시와 요약 문장 근거 번호 검증",
      "자기 기술 AI 초안 대비 수정률 기록",
      "학생별 기여율·계산 근거·원본 링크를 담은 교수용 PDF"
    ],
    "githubUrl": "https://github.com/peach20040909/hanmankeum",
    "demoUrl": "https://hanmankeum.vercel.app/",
    "featured": true,
    "starBullets": [
      "[Situation] 팀 과제 평가에 참고할 확인 가능한 작업 근거가 필요했습니다.",
      "[Task] 창업 아이디어를 실제 서비스로 발전시키며 UX·UI 설계와 사이트 구현을 총괄했습니다.",
      "[Action] 교수 기준 확정, AI·규칙 불일치 검수, 요약 근거 인용 검증과 원래 AI 판단 보존을 서비스에 반영했습니다.",
      "[Result] Vercel·Turso 기반 서비스와 PDF·시연 영상을 제작해 AI 리터러시 경진대회에서 우수상을 수상했습니다."
    ],
    "troubleshootingStory": "# 한만큼: 아이디어에서 AI를 검증하는 서비스로\n\n## 창업 아이디어 단계\nMJU 창업 아이디어 경진대회 · HMK 5인 팀\n\n• 문제 발견: 2026.09.10~11 명지대 교수 4인의 이메일 서면 인터뷰를 설계·진행했습니다. 설명과 생각이 다를 때 조정이 어렵고, 작업 기록을 참고 자료로 활용할 의향이 있다는 답변을 바탕으로 공정한 평가에 필요한 확인 가능한 근거에 집중했습니다.\n• 서비스 기획: 학기 초 도구 연결·템플릿 선택 후 팀이 유형별 가중치에 합의하고 기준을 잠그는 흐름을 화면 목업으로 제안했습니다. GitHub·Notion·Docs 기록 수집과 기획·제작·QA·발표자료·조율 분류는 이 단계의 기획안입니다. 학기 중 점수·순위는 공개하지 않도록 설계했습니다.\n• 산출 모델: 마감 후 개인 비중 = Σ(유형 가중치 × 유형 내 활동 비중)을 원자료와 함께 확인하는 방식을 제안했습니다. 온라인 기록 0%는 실제 기여 0%를 의미하지 않으며, 학생 서술과 교수 관측은 수치에 합산하지 않습니다.\n• 사업 모델: 교수 무료 체험(1분반·최대 5팀) → 팀 수 기준 학과 구독 → 대학 계약·LMS 연동을 검토했습니다. 교내 창업지원·예비창업패키지·민간 투자 순의 자금 계획과 3·6·12개월 검증 로드맵을 구성했습니다. 기존 LMS와 협업 도구 통계를 보완하는 서비스로 포지셔닝했습니다.\n• 팀 구성: 박서준(팀장·기획/PM), 장민준(현장 조사), 김효준(기획·산출 모델), 김유민(자료 조사), 양우림(기획 지원).\n\n완성도는 예시 데이터를 사용한 UI 목업·사업 계획 단계입니다. 이후 AI 리터러시 경진대회에서 실제 서비스 구현과 AI 검증 설계로 발전시켰습니다.\n\n## 실제 구현 단계\n명지대 AI 리터러시 경진대회 · 박서준(팀장), 장민준, 김효준의 3인 팀\n\n• 아이디어에서 구현으로: 창업경진대회의 목업을 실제 배포 서비스(hanmankeum.vercel.app)로 발전시켰습니다. UX·UI 설계와 사이트 구현을 총괄하고 시연 영상·최종결과물을 제작했습니다.\n• 교수 기준 존중: 서비스가 정한 유형 대신 교수가 원래 쓰던 평가기준을 AI가 정리하고, 교수가 수정·확정하는 방식으로 바꿨습니다. AI의 기준 정리·기록 분류·근거 요약·자기 기술은 모두 사람이 확인하는 초안이며 서비스는 성적을 산출하지 않습니다.\n• AI 검증: AI 분류와 규칙 판단이 엇갈리면 ‘확인 필요’로 올려 교수가 원본을 보고 결정하도록 했습니다. 사람이 수정한 뒤에도 AI의 원래 판단을 보존합니다.\n• 사용 투명성: 기록마다 AI 도움을 표시하고, 요약 문장에 근거 기록 번호 인용을 필수로 했습니다. 인용이 없는 문장은 서버가 제외하며 자기 기술은 AI 초안 대비 수정률을 기록합니다.\n• 프롬프트 관리: criteria-draft-v2, criteria-classify-v1, summary-v1, selfdraft-v2를 버전별로 관리하고 별도 프롬프트 문서로 제출합니다.\n• 기술·결과물: Node.js, Vercel, Turso(libSQL), Anthropic Claude API(claude-haiku), GitHub REST API, Notion Webhook, Playwright를 사용했습니다. 학생별 기여율·계산 근거·원본 링크를 담은 교수용 근거 리포트 PDF, 1분 시연 영상, 최종결과물 PDF(17쪽), 프롬프트 PDF(16쪽), 발표 PPT를 제작했습니다. 서비스 테스트는 22개입니다.\n\n창업 버전의 사업화 전략에서 AI를 검증하며 사용하는 실제 서비스로 초점을 옮겼습니다. 2026년 11월 26일 결선 발표 후 우수상을 수상했습니다.",
    "updatedAt": "2026-11-26"
  },
  {
    "id": "proj-1787068386336",
    "title": "Loadmap - 강의 복습 지도 서비스",
    "summary": "강의 음성과 텍스트에서 학습 부담 신호를 분석하여 학생에게 추가 확인이 필요한 복습 후보 구간을 추천하는 프로젝트다.",
    "category": "Backend",
    "semester": "2학년 여름방학",
    "period": "2026.07 - 2026.08",
    "teamType": "팀 (4명)",
    "role": "서브 개발",
    "techStack": [
      "React",
      "TypeScript"
    ],
    "problemDescription": "강의 음성과 텍스트에서 학습 부담 신호를 분석하여 학생에게 추가 확인이 필요한 복습 후보 구간을 추천하는 프로젝트",
    "solutionDescription": "음성 및 텍스트 데이터 분석 파이프라인 연계 및 학습 지도 UI 인터페이스 구축",
    "resultDescription": "강의 복습 후보 구간 시각화 및 학습 효율 증대",
    "keyFeatures": [
      "강의 음성 및 텍스트 학습 부담 신호 분석",
      "복습 후보 구간 추천 및 시각 지도 제공",
      "React & TypeScript 기반 사용자 인터페이스"
    ],
    "githubUrl": "https://github.com/6eaverr/SW-programming",
    "demoUrl": "",
    "featured": true,
    "starBullets": [
      "[Situation] 방대한 강의 녹음 및 교재 텍스트에서 복습해야 할 핵심 구간을 빠르게 찾기 어려운 문제 대두",
      "[Task] 학습 부담 신호를 추출하여 학생에게 직관적인 복습 로드맵을 제공하는 서브 개발 담당",
      "[Action] React, TypeScript 기반의 반응형 프론트엔드 모듈 구현 및 데이터 연동",
      "[Result] 복습 후보 구간 시각화 구현"
    ],
    "troubleshootingStory": "### 🔍 트러블슈팅 & 학습 기록\n\n- **상황**: 강의 음성/텍스트 분석 결과의 렌더링 지연\n- **해결**: 컴포넌트 단위 메모이제이션 및 비동기 상태 분리로 렌더링 성능 최적화\n- **배운 점**: 복잡한 데이터 시각화 시 프론트엔드 상태 설계의 중요성을 체득함.",
    "updatedAt": "2026-08-18"
  },
  {
    "id": "proj-1787068301402",
    "title": "5th-MVP-SetPIK-Server",
    "summary": "BE: Spotify 플레이리스트 기반 공연·페스티벌 추천 서비스",
    "category": "Backend",
    "semester": "2학년 여름방학",
    "period": "2026.07 - 2026.08",
    "teamType": "팀 (5인 이상)",
    "role": "서브 개발자",
    "techStack": [
      "Java",
      "Dockerfile",
      "Spring Boot"
    ],
    "problemDescription": "BE: Spotify 플레이리스트 기반 공연·페스티벌 추천 서비스",
    "solutionDescription": "GitHub 소스코드 기반 모듈화 구현 및 기능 안정화",
    "resultDescription": "저장소 릴리즈 및 동작 검증 완료",
    "keyFeatures": [
      "5th-MVP-SetPIK-Server 핵심 서비스 로직 구현",
      "Spotify 플레이리스트 메타데이터 연동 및 공연/페스티벌 추천 매칭",
      "Wikidata API를 활용한 영문-한글 아티스트 다국어 Entity Resolution",
      "Dockerfile 기반 컨테이너 배포 및 Git 협업 파이프라인"
    ],
    "starBullets": [
      "[Situation] Spotify 플레이리스트(영문)와 KOPIS 공연 라인업(한글) 간 언어 체계 차이로 아티스트 매칭 결과가 0건으로 계산되는 문제 발생",
      "[Task] 오탐 감소 및 API 쿼터 초과 없이 안정적으로 이종 데이터 소스의 아티스트를 식별·매칭하는 알고리즘 구축",
      "[Action] Spotify 역검색의 오탐 한계를 파악 후, Wikidata API를 매개로 한 다국어 별칭 조회 및 엔티티 매핑(Entity Resolution) 파이프라인 구현",
      "[Result] 동명이인(배우 등) 오탐 매칭 방지, 429 Rate Limit 회피 및 다국어 별칭 기반 매칭 흐름 개선"
    ],
    "troubleshootingStory": "### 🔍 트러블슈팅: Spotify-KOPIS 아티스트 매칭 실패와 Wikidata Entity Resolution\n\n- **상황**: Spotify(영문: 'Car, the garden')와 KOPIS(한글: '카더가든')의 표기 불일치로 추천 결과가 0건이 되는 문제 발생.\n- **1차 시도 및 실패**: Spotify Search API 역매칭 시도 시 배우 동명이인 오탐 및 429 Too Many Requests 쿼터 초과 발생.\n- **최종 해결**: Wikidata 지식 베이스 API를 도입하여 영문 이름 기준 한글 별칭을 추출하고 KOPIS와 안전하게 교차 매칭하는 구조로 전환.\n- **배운 점**: 단순 문자열 유사도 매칭의 위험성을 깨닫고, 신뢰 가능한 3자 데이터 소스를 매개로 한 Entity Resolution의 견고함을 체득.",
    "githubUrl": "https://github.com/DEPthes/5th-MVP-SetPIK-Server",
    "demoUrl": "https://5th-mvp-set-pik-web.vercel.app/",
    "featured": true,
    "updatedAt": "2026-08-28"
  },
  {
    "id": "proj-1",
    "title": "JMJ_Archive - 개발자 포트폴리오 & 학습 기록 아카이브",
    "summary": "소프트웨어학과 대학생을 위한 학기별 프로젝트, CS 교과목 연계, 트러블슈팅 일지 및 AI 포트폴리오 첨삭 플랫폼",
    "category": "Web",
    "semester": "2학년 여름방학",
    "period": "2026.07 - 2026.08 (1개월)",
    "teamType": "개인",
    "role": "Fullstack Architecture & Design",
    "techStack": [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "Node.js",
      "Google Gemini API"
    ],
    "problemDescription": "소프트웨어학과 2학년 시기에 분산되어 있던 과제, 토이 프로젝트, 교과목 실습, 알고리즘 풀이 기록을 체계적으로 구조화하고 채용 담당자가 보기 편한 포맷으로 전달하기 어려움",
    "solutionDescription": "학기별 타임라인, 기술 스택 매트릭스, STAR 기법 AI 이력서 변환기, 트러블슈팅 스토리텔링 뷰가 통합된 단일 인터페이스 구축",
    "resultDescription": "프로젝트·기술 스택·학습 기록을 한곳에서 관리하고 공개 뷰와 JSON/Markdown 내보내기를 구현했습니다.",
    "keyFeatures": [
      "프로젝트 카테고리/학기/기술스택 다차원 필터링 및 상세 모달",
      "전공 교과목(자료구조, 알고리즘, OS, DB)과 프로젝트 연계 시스템",
      "STAR(상황-과제-행동-결과) 기법 기반 AI 프로젝트 요약 및 트러블슈팅 생성기",
      "공개용 이력서 뷰(Visitor Mode) 및 JSON/Markdown 내보내기"
    ],
    "githubUrl": "https://github.com/peach20040909/JMJ_Project_Archive",
    "demoUrl": "https://jmj-archive.ai.studio/",
    "featured": true,
    "starBullets": [
      "[Situation] 분산된 1~2학년 학업 및 개발 산출물을 단일 플랫폼에서 체계화할 필요성 대두",
      "[Task] 학생 친화적인 직관적 UI와 Gemini API 기반의 프로젝트 문맥 분석/첨삭 엔진 풀스택 설계",
      "[Action] React 19와 Tailwind CSS로 반응형 SPA를 구현하고 Express 백엔드에 Google Gemini API를 연동하여 STAR 구조화 프롬프트 튜닝",
      "[Result] 프로젝트 관리·공개 뷰·JSON/Markdown 내보내기를 구현했습니다."
    ],
    "troubleshootingStory": "### 🔍 트러블슈팅 & 문제 해결 일지\n\n1. **상황**: 로컬 데이터와 AI 생성 결과가 비동기로 갱신될 때 UI 깜빡임 및 레이아웃 밀림 발생\n2. **원인**: 여러 상태가 개별적으로 dispatch되면서 React 19 렌더링 사이클에서 불필요한 리렌더링 유발\n3. **해결**: 복합 상태를 불변 객체로 묶어 atomic하게 업데이트하고, React 19 Transition 및 LocalStorage 동기화 훅을 최적화\n4. **교훈**: 컴포넌트 간 단방향 데이터 흐름과 상태 응집도의 중요성을 체감함.",
    "updatedAt": "2026-08-18"
  }
];

export const initialTechSkills: TechSkill[] = [
  {
    "id": "skill-1",
    "name": "Java",
    "category": "Languages",
    "level": "Proficient (아키텍처/최적화)",
    "score": 85,
    "experience": "Spring Boot 기반 REST API 서버 개발, 객체지향 설계 원칙 및 동시성 제어 적용",
    "featured": true
  },
  {
    "id": "skill-2",
    "name": "C++",
    "category": "Languages",
    "level": "Proficient (아키텍처/최적화)",
    "score": 90,
    "experience": "자료구조 직접 구현, 스마트 포인터 기반 메모리 관리, STL 알고리즘 활용",
    "featured": true
  },
  {
    "id": "skill-3",
    "name": "TypeScript / JS",
    "category": "Languages",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 82,
    "experience": "제네릭, 유니온 타입, 비동기 Promise/async-await 제어, Express 및 React 개발",
    "featured": true
  },
  {
    "id": "skill-4",
    "name": "Python",
    "category": "Languages",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 78,
    "experience": "데이터 분석(Pandas, NumPy), 알고리즘 풀이 및 프로토타입 스크립트 작성",
    "featured": false
  },
  {
    "id": "skill-5",
    "name": "SQL",
    "category": "Languages",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 76,
    "experience": "복합 JOIN 쿼리, 인덱스 생성 및 실행 계획(EXPLAIN) 분석 기초",
    "featured": false
  },
  {
    "id": "skill-6",
    "name": "React 18 / 19",
    "category": "Frontend",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 80,
    "experience": "커스텀 훅 설계, 상태 관리, 반응형 UI 및 모션 애니메이션 구현",
    "featured": true
  },
  {
    "id": "skill-7",
    "name": "Tailwind CSS",
    "category": "Frontend",
    "level": "Proficient (아키텍처/최적화)",
    "score": 88,
    "experience": "현대적이고 유려한 반응형 디자인 및 일관된 테마 토큰 시스템 구축",
    "featured": true
  },
  {
    "id": "skill-8",
    "name": "Spring Boot 3 / JPA",
    "category": "Backend",
    "level": "Proficient (아키텍처/최적화)",
    "score": 84,
    "experience": "계층형 아키텍처(Controller-Service-Repository), Spring Security+JWT, JPA Fetch Join 최적화",
    "featured": true
  },
  {
    "id": "skill-9",
    "name": "Node.js / Express",
    "category": "Backend",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 75,
    "experience": "경량 RESTful API 서버 구축, 미들웨어 파이프라인 및 AI API 연동",
    "featured": false
  },
  {
    "id": "skill-10",
    "name": "MySQL",
    "category": "Database & Infra",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 78,
    "experience": "ERD 설계, 외래키 제약조건, 비관적 락(SELECT FOR UPDATE)을 통한 동시성 제어",
    "featured": true
  },
  {
    "id": "skill-11",
    "name": "Git / GitHub",
    "category": "Database & Infra",
    "level": "Proficient (아키텍처/최적화)",
    "score": 86,
    "experience": "Git Flow 협업, Rebase/Merge 충돌 해결, GitHub Actions CI 기초 파이프라인 구성",
    "featured": true
  },
  {
    "id": "skill-12",
    "name": "Docker & AWS EC2",
    "category": "Database & Infra",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 70,
    "experience": "Dockerfile 작성, Docker Compose를 통한 Spring Boot + MySQL 컨테이너화 및 EC2 배포",
    "featured": false
  },
  {
    "id": "skill-13",
    "name": "자료구조 & 알고리즘",
    "category": "CS Fundamentals",
    "level": "Proficient (아키텍처/최적화)",
    "score": 88,
    "experience": "자가 균형 트리, 해시 테이블, 정렬/탐색 알고리즘 직접 구현 및 복잡도 분석",
    "featured": true
  },
  {
    "id": "skill-14",
    "name": "컴퓨터구조 & 시스템",
    "category": "CS Fundamentals",
    "level": "Competent (과제/프로젝트 구현)",
    "score": 82,
    "experience": "파이프라이닝, 캐시 계층 구조, 메모리 단편화 및 MIPS 어셈블리 분석",
    "featured": true
  }
];

export const initialDevLogs: DevLog[] = [
  {
    "id": "log-mju-solomap",
    "title": "혼밥지도 (SoloMap) — API 지연·지도 장애 해결과 리뷰·체크인 설계",
    "date": "2026-11-24",
    "category": "트러블슈팅",
    "tags": [
      "TypeScript",
      "Express 5",
      "Prisma 7",
      "PostgreSQL",
      "NAVER Maps API",
      "Gemini API",
      "Vercel",
      "트러블슈팅"
    ],
    "linkedProjectId": "proj-mju-solomap",
    "content": "# 혼밥지도 (SoloMap) — 트러블슈팅 & 핵심 설계 일지\n\n**1. 메뉴 칩을 누르면 검색이 최대 5분 멈춤**\n- **문제:** 마라탕 검색이 128초, 돈까스 검색이 300초를 넘어 Vercel 시간 제한에 걸렸다.\n- **원인:** 캐시에 없는 식당마다 Gemini를 호출하고, Promise.all로 모든 응답을 기다렸다.\n- **해결:** Gemini 호출을 Promise.race로 4초 제한하고, 늦으면 규칙 기반 안내로 먼저 응답한다. 늦게 온 답은 캐시에 저장해 다음 검색부터 쓴다.\n- **결과:** 돈까스 5.5초, 마라탕 1.0초로 줄었다.\n\n**2. 식당 안내 문구가 전부 같아짐**\n- **문제:** 배포 후 여러 식당에 똑같은 기본 문구가 표시됐다.\n- **원인:** 쓰던 Gemini 모델이 종료돼 404가 났는데, 오류 없이 기본 문구로 대체됐다. 그 기본 문구가 캐시에까지 저장됐다.\n- **해결:** Vercel 로그에서 404를 찾아 모델을 교체했다. 잘못 저장된 캐시 문구 17개를 지우고 다시 만들었고, 기본 문구는 캐시하지 않게 바꿨다.\n- **배운 점:** 오류를 숨기는 대체 처리는 로그로 꼭 확인해야 한다.\n\n**3. 배포하자 네이버 지도가 안 뜸**\n- **원인:** 네이버 지도 SDK는 콘솔에 등록한 주소에서만 동작하는데, 새 배포 주소가 등록돼 있지 않았다.\n- **해결:** 배포 주소를 등록했다. 지도 SDK가 실패하면 Leaflet 지도로 자동 전환되게 했다.\n\n**4. 카카오 검색만으로는 대학가 맛집이 빠짐**\n- **해결:** 직접 검증한 시드 DB(125곳)를 만들고, 카카오 검색 결과와 합치면서 중복을 제거했다.\n- **필터:** 도보 800m 밖 상권과 술집·카페·떡집·마트를 걸러냈다.\n\n**5. 휴대폰에서 끝없이 스크롤해야 함 (사용자 피드백)**\n- **문제:** 홈 아래로 식당 129곳이 계속 이어졌다.\n- **해결:** 홈(내 레벨 카드 + 메뉴 10칸)과 검색 결과 화면으로 나눴다. 주소에 검색어를 남겨 뒤로 가기와 링크 공유가 되게 했고, 카드 높이를 줄여 20곳씩 보여 준다.\n\n**6. 배포 후 QA로 잡은 상태·주소 버그**\n- 뽑기 창을 Esc로 닫으면 방문 기록이 남아, 홈 주소인데 검색 결과가 보이던 문제를 고쳤다.\n- 공유받은 검색·식당 링크에서 \"홈으로 돌아가기\"를 누르면 사이트 밖으로 나가던 문제를 고쳤다.\n- 뒤로·앞으로 가기를 하면 고른 난이도가 풀리던 문제를 고쳤다.\n- 카카오가 거점(명지전문대·백련시장) 기준으로 돌려주던 도보 거리를 명지대 기준으로 다시 계산했다.\n- `%`, `#`처럼 기호만 있는 검색어에 엉뚱한 식당이 나오던 문제를 고쳤다.\n\n**7. 핵심 설계**\n- **표시 난이도:** 서버 한 곳(calculateDisplaySoloLevel)에서만 정한다.\n- **리뷰 집계:** 리뷰를 바꿀 때마다 같은 트랜잭션에서 평균 난이도와 리뷰 수를 다시 계산한다.\n- **DB 고유 제약:** (사용자, 식당) 리뷰 1개, (사용자, 식당, 날짜) 체크인 1개를 DB에서 막는다.\n- **세션:** connect-pg-simple로 PostgreSQL에 저장해, 서버가 다시 켜져도 로그인이 유지된다.\n- **오류 응답:** 오류 처리 미들웨어가 상황별 상태 코드(400·401·403·404·409·429)와 JSON 안내를 돌려준다.",
    "updatedAt": "2026-11-24"
  },
  {
    "id": "log-hmk-2026",
    "title": "한만큼 — 'AI가 판정하지 않는다': 교수 인터뷰 기반 문제 재정의와 기여도 근거 리포트 아키텍처",
    "date": "2026-10-01",
    "category": "트러블슈팅",
    "tags": [
      "서비스 기획",
      "교수 인터뷰",
      "AI 윤리·원칙",
      "데이터 파이프라인",
      "협업 도구 연동",
      "창업 경진대회"
    ],
    "linkedProjectId": "proj-hmk-2026",
    "content": "# 한만큼: 사용자 인터뷰에서 근거 리포트로\n\n## 본인 역할\n현장 조사(교수 인터뷰 설계·진행), 서비스 기획, 백엔드 구조 설계와 아이디어 검증.\n\n## 현재 설계\n작업 기록을 만들기·다듬기·이끌기(MRL) 3축으로 분류합니다. 축별 개인 활동 비중에 사전에 잠근 가중치를 곱해 합산합니다. 활동이 없는 축은 가중치를 나머지 축에 비례 배분합니다.\n\n## 판단 근거와 한계\n자기 기술·익명 동료평가는 기여율에 반영하지 않습니다. 온라인 기록이 없다는 사실은 실제 기여가 없다는 증거가 아니며, 최종 평가는 교수의 판단에 따릅니다.\n\n## 연동 범위\nGitHub 수집, Notion 웹훅, Google Docs 링크 기록을 지원합니다. Google Docs 자동 수집과 학교 SSO는 후속 구현입니다.\n\n[현재 구현과 실행 안내](https://github.com/peach20040909/hanmankeum)"
  },
  {
    "id": "log-spotify-kopis-matching",
    "title": "Spotify-KOPIS 아티스트 다국어 매칭 실패와 Wikidata를 활용한 Entity Resolution",
    "date": "2026-08-28",
    "category": "트러블슈팅",
    "tags": [
      "Spotify API",
      "KOPIS",
      "Wikidata API",
      "Entity Resolution",
      "Rate Limiting",
      "데이터 파이프라인"
    ],
    "linkedProjectId": "proj-1787068301402",
    "content": "## 문제 상황\n\n플레이리스트 분석 후 공연 추천을 계산하면 결과가 항상 **0건**으로 나오는 문제가 발생했다.\n\n### 원인 진단\n취향 분석에 사용하는 아티스트 정보는 Spotify에서 오고, 공연 라인업 정보는 KOPIS(한국공연예술통합전산망)에서 온다. 두 데이터 소스의 아티스트 이름 표기 언어가 근본적으로 달랐다.\n\n- **Spotify**: `\"Car, the garden\"` (영문 표기)\n- **KOPIS**: `\"카더가든\"` (한글 표기)\n\n기존 매칭 로직은 정규화(공백/특수문자 제거, 소문자 변환) 후 완전 일치 비교 방식이었다. 언어 자체가 다르니 정규화를 아무리 해도 일치할 수 없어 매칭이 원천적으로 불가능했다.\n\n---\n\n## 1차 시도: Spotify 검색 API로 역매칭\n\n- **접근 방식**: KOPIS 출연진 이름을 그대로 Spotify 검색 API에 질의하여, 검색 결과 1위가 기존에 저장된 Spotify 아티스트와 일치하는지 확인.\n- **결과**: **실패** (두 가지 심각한 부작용 발생)\n  1. **오탐 매칭 (False Positive)**: KOPIS에는 대중가수뿐 아니라 연극·뮤지컬 배우도 \"출연진\"으로 등록된다. 배우 이름(\"박예리\" 등)을 Spotify에 검색하면 발음이 비슷한 동명이인 가수가 1위로 반환되어 전혀 다른 사람에게 잘못 연결되는 사고가 발생했다.\n  2. **API 쿼터 초과 (429 Too Many Requests)**: 신규 아티스트 하나당 검색 API를 순차 호출하다 보니, 공연 수가 많은 대형 배치에서 단시간에 수백 건의 호출이 몰려 Spotify 쿼터 제한에 도달했다.\n\n> **💡 교훈**: 이름 유사도만으로 동일 인물을 판단하는 방식은 신뢰도가 매우 낮다. *\"이름이 비슷하다\"*와 *\"같은 사람이다\"*는 완전히 다른 문제였다.\n\n---\n\n## 2차 시도 (최종 해결): Wikidata API 연동 및 Entity Resolution\n\n이름 문자열을 직접 비교하는 대신, **위키데이터(Wikidata)**라는 신뢰 가능한 공개 지식 베이스를 매개체로 삼았다.\n\n```text\nSpotify 아티스트명 (영문)\n         ↓\nWikidata에서 해당 인물(Entity) 조회\n         ↓\nWikidata가 보유한 한글 레이블 및 별칭(Alias) 획득\n         ↓\n그 한글 이름으로 KOPIS 출연진과 교차 매칭\n```\n\n문자열 유사도가 아니라, 위키데이터라는 제3의 공인 소스가 *\"이 영문 이름과 이 한글 이름이 같은 실존 인물을 가리킨다\"*고 검증(Entity Resolution)해주는 방식이라 배우와 가수를 혼동하는 문제를 구조적으로 해소했다.\n\n- **한계점 및 관리**: Wikidata에 한글 이름/별칭이 등록되어 있지 않은 일부 비주류 아티스트는 매칭이 누락될 수 있으나, 시스템 신뢰도를 저해하는 오탐(False Positive)을 줄이기 위한 아키텍처로 안착했다.\n\n---\n\n## 시도 방식별 비교 정리\n\n| 구분 | 매칭 방식 | 발생한 문제점 및 한계 |\n|---|---|---|\n| **최초** | 문자열 완전 일치 | 언어가 다르면(영문 vs 한글) 매칭 자체가 원천 불가능 |\n| **1차 개선** | Spotify 검색 결과 신뢰 | 배우→동명이인 가수 오탐 매칭 발생, 429 API 쿼터 초과 |\n| **최종 해결** | **Wikidata 매개 매칭 (Entity Resolution)** | **오탐 위험 감소, 안정적 매칭 파이프라인 확립** (일부 미등록 아티스트 예외 관리) |\n\n> **🌟 핵심 배운 점**: 겉으로 보이는 증상(\"매칭이 안 된다\")을 빠르게 때우는 1차 시도가 오히려 새로운 버그(잘못된 매칭)를 만든다는 것을 확인했다. 데이터 통합에서는 문자열 유사도를 맹신하지 않고, **신뢰 가능한 3자 데이터베이스를 매개로 한 검증 구조**를 설계하는 것이 가장 중요하다."
  },
  {
    "id": "log-1",
    "title": "Spring Boot + JPA에서 N+1 문제가 발생하는 이유와 Fetch Join 최적화",
    "date": "2026-08-12",
    "category": "트러블슈팅",
    "tags": [
      "JPA",
      "Spring Boot",
      "MySQL",
      "성능 최적화"
    ],
    "linkedProjectId": "proj-1787068301402",
    "content": "5th-MVP-SetPIK-Server 등 백엔드 개발 중 연관 엔티티가 지연 로딩(LAZY)으로 설정되어 있어 루프를 돌며 getter를 호출할 때마다 매번 SELECT 쿼리가 발생하는 N+1 문제 해결.\n\n### 해결 과정\n1. **Batch Size 설정**: `default_batch_fetch_size: 100`을 설정하여 IN 절 쿼리로 묶음 처리.\n2. **Fetch Join 적용**: 목록 조회 전용 JPQL에 `JOIN FETCH`를 적용하여 1회 단일 JOIN 쿼리로 모든 데이터를 한번에 가져오도록 수정.\n3. **결과**: 쿼리 대폭 단축 및 API 응답 성능 개선!"
  },
  {
    "id": "log-2",
    "title": "C++ 스마트 포인터의 순환 참조(Circular Reference)와 weak_ptr",
    "date": "2026-07-28",
    "category": "기술 학습 (TIL)",
    "tags": [
      "C++",
      "Memory",
      "Smart Pointer"
    ],
    "linkedProjectId": "proj-1",
    "content": "자료구조를 구현하며 부모 노드와 자식 노드가 서로 `std::shared_ptr`를 가지게 설계했더니, 소멸자가 호출되지 않아 메모리 릭이 발생하는 것을 발견했다.\n\n- **원인**: Reference Count가 서로 물려 0으로 떨어지지 않는 순환 참조 발생.\n- **해결**: 부모가 자식을 가리킬 때는 `shared_ptr`, 자식이 부모를 참조할 때는 참조 카운트를 올리지 않는 `std::weak_ptr`를 사용하도록 변경.\n- **결과**: 객체 소멸 정상 확인 및 Valgrind 메모리 릭 0 byte 달성."
  },
  {
    "id": "log-3",
    "title": "2학년 1학기 종강 회고: CS 기본기의 중요성과 2학기를 맞이하는 다짐",
    "date": "2026-06-25",
    "category": "학기 회고",
    "tags": [
      "회고",
      "학업",
      "2학년 2학기 준비"
    ],
    "content": "2학년 1학기는 자료구조와 컴퓨터구조를 배우며 개발자로서의 시야가 완전히 바뀐 학기였다.\n단순히 프레임워크나 라이브러리를 쓰는 법을 넘어서, 메모리 구조와 CPU 클럭, 트리 밸런싱 같은 저수준 원리를 파고들면서 코드 한 줄을 짤 때도 시간 복잡도와 메모리 사용량을 신중히 계산하게 되었다.\n\n다가오는 2학년 2학기는 **운영체제, 데이터베이스, 알고리즘**이라는 CS의 심장을 배우는 학기다.\n이 지식들을 내 주력 프로젝트에 녹여내어 '진짜 실력 있는 개발자'로 한 단계 도약하자!"
  }
];

export const initialCoverLetters: CoverLetterItem[] = [
  {
    "id": "cl-hmk-2026",
    "companyName": "네이버 / 카카오 / 토스",
    "targetRole": "서비스 기획 & 백엔드 엔지니어 / 인턴",
    "questionCategory": "협업 및 갈등해결",
    "question": "서로 다른 배경을 가진 구성원들과 협업하여 문제를 해결하거나, 사용자의 실제 목소리를 바탕으로 프로젝트의 방향성을 전환(피벗)했던 경험을 구체적으로 기술해 주십시오. (1,000자 이내)",
    "linkedProjectIds": [
      "proj-hmk-2026"
    ],
    "content": "[다전공 5인 팀의 교수 인터뷰 기반 문제 재정의와 'AI 비판정' 기여도 리포트 구조 설계]\n\n2026 명지대 'AI·AX 창업 전략 아이디어 경진대회'에서 5인 다전공 팀(데이터사이언스·문헌정보·경영정보·아동학·디지털미디어)으로 참가하여, 팀 프로젝트 무임승차 방지를 위한 기여도 근거 리포트 서비스 '한만큼'을 기획하고 백엔드 아키텍처를 설계했습니다.\n\n초기에는 타이핑 속도나 코드 라인 등 모든 활동을 수치화하는 '정밀 측정 모델'을 구상했으나, 문제의 실재성을 검증하기 위해 교수 4인을 대상으로 서면 인터뷰를 직접 설계·진행했습니다. 그 결과 교수들이 필요로 한 것은 'AI의 일방적 점수 매김'이 아니라 학생 간 평가 이의제기 시 참고할 수 있는 '최소한의 객관적 증거 자료'임을 파악했습니다.\n\n이에 따라 두 가지 핵심 피벗을 단행했습니다. 첫째, 'AI가 판정하지 않는다'는 대원칙을 수립하고, AI는 GitHub·Notion 등의 분산 로그를 만들기·다듬기·이끌기(MRL) 3축으로 분류·집계만 담당하도록 범위를 한정했습니다. 둘째, '정밀 측정'의 욕심을 내려놓고 '작업 근거 제공'으로 타깃을 좁혀, 온라인 기록 0%가 실제 기여도 0%를 의미하지 않는다는 오탐 방지 가이드를 리포트에 명시했습니다.\n\n이 경험을 통해 기술적 화려함보다 실제 현장의 신뢰를 얻는 단순하고 설명 가능한 모델의 중요성, 그리고 한계를 투명하게 인정하고 방어 논리를 세우는 협업과 문제 정의의 본질을 체득했습니다.",
    "targetCharCount": 1000,
    "memo": "명지대 AI·AX 창업 경진대회(한만큼) - 현장 인터뷰 기반 고객 문제 재정의 및 다전공 협업 면접 대비",
    "interviewTips": [
      "초기 아이디어에서 교수 인터뷰 후 피벗을 결정하게 된 가장 결정적인 계기는 무엇이었나요?",
      "'AI가 판정하지 않는다'는 원칙을 서비스 구조와 UI에 어떻게 반영했나요?",
      "데이터사이언스, 문헌정보, 경영 등 서로 다른 5개 전공 팀원들과 의견 충돌 시 어떻게 조율했나요?"
    ],
    "keyStrengths": [
      "현장 고객(교수) 인터뷰 설계 및 데이터 기반 문제 재정의",
      "AI 윤리 원칙 기반 서비스 기획 및 백엔드 로그 파이프라인 설계",
      "다전공 5인 팀 소통 조율 및 PSST 사업화 모델 도출"
    ],
    "updatedAt": "2026-09-13"
  },
  {
    "id": "cl-1",
    "companyName": "카카오 / 네이버",
    "targetRole": "서버 / 백엔드 개발자 인턴",
    "questionCategory": "기술적 도전 및 문제해결",
    "question": "본인이 수행한 프로젝트 중 가장 기술적으로 도전적이었던 문제와, 이를 해결하기 위해 시도한 구체적인 과정 및 결과를 기술해 주십시오. (1,000자 이내)",
    "linkedProjectIds": [
      "proj-1787068301402"
    ],
    "content": "[Spotify-KOPIS 이종 데이터 식별 불일치 해결과 Wikidata Entity Resolution 파이프라인 구축]\n\n'5th-MVP-SetPIK-Server'에서 사용자의 Spotify 플레이리스트 취향을 분석하여 KOPIS(한국공연예술전산망) 공연 라인업과 매칭하는 백엔드 핵심 로직을 개발했습니다.\n\n초기 매칭 로직에서 Spotify의 영문 아티스트명('Car, the garden')과 KOPIS의 한글 표기('카더가든') 불일치로 인해 추천 결과가 0건으로 나오는 치명적 결함을 발견했습니다.\n\n1차로 Spotify 검색 API를 이용한 역매칭을 시도했으나, 연극/뮤지컬 배우가 동명이인 가수로 오탐(False Positive)되거나 단시간 대량 호출로 인한 429 Too Many Requests 쿼터 초과 문제가 발생했습니다.\n\n단순 문자열 유사도 비교의 한계를 인식하고, 공인 지식 베이스인 Wikidata API를 매개로 한 Entity Resolution 아키텍처를 도입했습니다. 영문 식별자로부터 Wikidata의 검증된 다국어 레이블 및 한글 별칭(Alias)을 조회하여 KOPIS 출연진과 교차 검증함으로써 이름만으로 연결하던 오탐 위험을 줄이고 안정적인 추천 파이프라인을 완성했습니다.",
    "targetCharCount": 1000,
    "memo": "외부 API 연동, 데이터 불일치 해결, Entity Resolution 및 429 레이트 리밋 제어 면접 대비",
    "interviewTips": [
      "Spotify 영문 표기와 KOPIS 한글 표기 간의 식별 불일치 문제를 어떻게 정의하고 해결했나요?",
      "단순 검색 API 대신 Wikidata 지식 베이스를 선택한 기술적 배경과 장단점은 무엇인가요?",
      "외부 API 연동 시 레이트 리밋(429) 및 네트워크 지연을 방어하기 위한 캐싱 전략은 어떻게 구상했나요?"
    ],
    "keyStrengths": [
      "이종 데이터 소스 간 다국어 Entity Resolution 및 데이터 파이프라인 구축",
      "Java & Spring Boot 기반 서비스 로직 모듈화 및 외부 API 예외 방어",
      "Dockerfile을 활용한 컨테이너 패키징 및 협업 역량"
    ],
    "updatedAt": "2026-08-28"
  }
];

// Apply this owner-requested revision once; preserve later edits and deleted projects.
export function upgradeHanmankeumProject(items: ProjectItem[], activitiesVersion = 0): ProjectItem[] {
  if (activitiesVersion >= 5) return items;
  const current = initialProjects.find(project => project.id === 'proj-hmk-2026')!;
  return items.map(item => {
    if (item.id !== current.id) return item;
    if (activitiesVersion < 4) return { ...item, ...current, title: item.title, featured: item.featured };
    return {
      ...item,
      period: current.period,
      resultDescription: current.resultDescription,
      starBullets: item.starBullets?.map(entry => entry.replace('PDF·시연 영상을 제작해 AI 리터러시 경진대회 결선에 진출했습니다.', 'PDF·시연 영상을 제작해 AI 리터러시 경진대회에서 우수상을 수상했습니다.')),
      troubleshootingStory: item.troubleshootingStory?.replace('최종 심사 결과는 확정 후 별도 갱신합니다.', '2026년 11월 26일 결선 발표 후 우수상을 수상했습니다.'),
    };
  });
}

// Refresh the completed SoloMap revision once without restoring deleted projects.
export function upgradeSoloMapProject(items: ProjectItem[]): ProjectItem[] {
  const current = initialProjects.find(project => project.id === 'proj-mju-solomap')!;
  return items.map(item => item.id === current.id && (!item.updatedAt || item.updatedAt < '2026-11-24')
    ? { ...item, ...current, featured: item.featured }
    : item.id === current.id && item.period === '2026.09.09 - 2026.12.08 (12.08 최종 발표 예정)'
      ? { ...item, period: current.period, resultDescription: item.resultDescription?.replace(' 2026.12.08 최종 발표 예정.', '') } : item);
}
