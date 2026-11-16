export interface PortfolioActivity {
  id: string;
  title: string;
  subtitle?: string;
  summary?: string;
  kind: '수상' | '선발' | '진출' | '참여' | '실무';
  outcome: string;
  stages: string[];
  note?: string;
  period?: string;
  role?: string;
  tags?: string[];
}

export const ACTIVITIES_VERSION = 3;
export const academyExperience: PortfolioActivity = {
  id: 'j-english-ax', title: '제이영어학원', subtitle: '교육 현장의 반복 업무를 AI로 자동화한 AX 경험',
  kind: '실무', outcome: '재직 중 · AX',
  summary: '학교별 시험 자료 편집·합본 제작의 반복 업무를 AI로 자동화했습니다. GPT·Codex로 변형문제 생성기를 제작하고 학원 DB 기반 워크스페이스를 설계했습니다.',
  period: '2023.03 ~ 현재 · 2027.02 종료 예정',
  role: '교육 운영 지원 · AI 업무 자동화 · 워크스페이스 설계',
  tags: ['AX', 'GPT', 'Codex', '문서 자동화', 'DB 설계'],
  stages: ['반복 업무 파악', 'AI 자동화 적용', '결과 검수·개선'],
  note: '학교별 시험 범위에 맞춘 자료 편집, 교재 합본 제작, 학습 관리 등 실제 학원 운영 업무를 맡으며 반복되는 작업을 자동화했습니다.\n\n• 자료 편집·합본 자동화: 여러 교육 자료를 내려받고 시험 범위에 맞게 편집·통합하는 작업에 AI를 활용했습니다.\n• 변형문제 생성기: GPT·Codex로 유형별 문제 생성기를 제작하고, 문제 유형별 지침과 DB 구조를 구체화했습니다. 12개 지문에서 36문제를 생성해 문제·해설 자료로 정리한 업무 기록이 있습니다.\n• AI 보조 검수: 생성 문제와 기존 교재의 정답·해설을 GPT로 점검하고, 오류를 확인·수정했습니다.\n• 학원 DB 기반 워크스페이스: 교육 자료와 업무 흐름을 연결하는 전체 워크스페이스를 설계했습니다.\n\n근무 기간 중 2024.03 ~ 2025.09는 군 복무로 제외하며, 전역 후 학원 업무에 복귀했습니다.',
};

// Add the academy once, then enrich older records without restoring intentionally deleted entries.
export function upgradeActivities(items: PortfolioActivity[], version = 0): PortfolioActivity[] {
  if (version >= ACTIVITIES_VERSION) return items;
  const existing = version < 2 && !items.some(item => item.id === academyExperience.id) ? [...items, academyExperience] : items;
  return existing.map(item => {
    const current = activities.find(activity => activity.id === item.id);
    if (!current) return item;
    return { ...current, ...item,
      summary: item.summary || current.summary,
      subtitle: ['student-major', 'startup', 'expressway-ai'].includes(item.id) ? current.subtitle : item.subtitle || current.subtitle,
      note: !item.note || item.note === '결과 미기재' ? current.note : item.note,
    };
  });
}

// Confirmed by the portfolio owner on 2026-11-14. Omit unknown dates and roles.
export const activities: PortfolioActivity[] = [
  academyExperience,
  {
    id: 'hackathon', title: '명지대학교 AI 창의적 아이디어 해커톤',
    subtitle: '고리(Go:RE)', kind: '수상', outcome: '우수상',
    summary: '위치 기반 AI 타임캡슐 서비스 ‘고리’를 출품해 우수상을 수상했습니다. 장소에 남긴 사진과 편지를 다시 방문해 확인하는 웹 서비스를 팀으로 구현했습니다.',
    role: '메인 개발 · 웹앱 구현 및 API 연동', tags: ['웹 서비스', 'AI 활용', '팀 프로젝트'],
    note: '위치 기반 AI 타임캡슐 서비스 고리(Go:RE)를 6인 팀으로 개발했습니다. 웹앱 구현과 API 연동을 담당했으며, 명지대학교 AI 창의적 아이디어 해커톤에서 우수상을 수상했습니다.',
    stages: ['해커톤 참여', '우수상 수상'],
  },
  {
    id: 'student-major', title: '학생설계전공 공모전',
    subtitle: 'AX 시스템공학전공',
    summary: '기업의 규정·문서·데이터를 AI 업무 시스템으로 연결하는 융합 교육과정을 제안했습니다. 지식 구조화, 시스템 설계, 평가·검증을 중심으로 설계해 본선 은상을 수상했습니다.',
    role: '학생설계전공 교육과정 기획 참여 · 3인 팀',
    tags: ['교육과정 설계', 'AX', 'RAG', 'AI 신뢰성'],
    note: 'AX System Engineering을 제안하는 3인 팀의 교육과정 개발 공모전입니다.\n\n• 문제 정의: 개별 AI 기능 개발을 넘어 기업 데이터·업무 시스템·승인 절차를 연결할 수 있는 인재 양성의 필요성을 분석했습니다.\n• 교육 방향: 지식 구조화 → 검색·업무 시스템 설계 → 근거·권한·실행 결과 평가의 흐름으로 전공 방향을 제안했습니다.\n• 핵심 역량: 업무 프로세스 분석, RAG 기반 지식 활용, 데이터 거버넌스, AI 신뢰성 평가와 사람의 검토·승인을 교육 목표에 반영했습니다.\n\n1차 서류 합격 후 본선에서 은상을 수상했습니다.',
    kind: '수상', outcome: '은상',
    stages: ['1차 서류 합격', '본선 은상 수상'],
  },
  {
    id: 'overseas', title: '해외탐방', subtitle: 'Mobility Field Lab',
    kind: '선발', outcome: '최종 합격',
    summary: '해외탐방 최종 선발 후 서울과 유럽의 공유 이동수단을 같은 기준으로 조사할 웹앱을 준비하고 있습니다. 현장 사진·독립 검수·지도·지표를 연결하는 조사 흐름을 구현했습니다.',
    stages: ['서류 합격', '면접', '최종 합격'],
    note: '해외 현장조사에 사용할 기록·검수·분석 플랫폼을 준비하고 있습니다.',
  },
  {
    id: 'startup', title: '창업경진대회', kind: '진출',
    subtitle: '한만큼',
    summary: '팀 프로젝트의 기여도를 작업 기록과 근거 리포트로 설명하는 ‘한만큼’을 제안했습니다. 교수 인터뷰를 바탕으로 문제와 서비스 방향을 구체화해 본선에 진출했습니다.',
    role: '현장 조사 · 서비스 기획 · 백엔드 구조 설계',
    tags: ['사용자 조사', '서비스 기획', '창업 아이디어'],
    note: '팀 프로젝트의 흩어진 협업 기록을 모아 개인별 기여를 설명하는 근거 리포트 서비스 ‘한만큼’으로 참가했습니다. 교수 인터뷰와 서비스 기획, 백엔드 데이터 흐름 설계에 참여했습니다. AI는 활동 기록을 정리하고 최종 판단은 교수가 수행하는 구조를 제안했습니다. 본선 진출 후 최종 수상에는 이르지 못했습니다.',
    outcome: '본선 진출 후 탈락', stages: ['본선 진출', '본선 탈락'],
  },
  {
    id: 'ai-literacy', title: 'AI 리터러시 경진대회', kind: '진출',
    subtitle: '한만큼',
    summary: 'GitHub·Notion 등 흩어진 협업 기록을 팀 기여도의 근거로 정리하는 ‘한만큼’으로 1차 서류를 통과했습니다. 11월 26일 발표를 준비하며 결과와 최종 산출물을 정리할 예정입니다.',
    note: '한만큼으로 1차 서류에 합격했습니다. 2026년 11월 26일 발표 예정이며, 발표 결과와 최종 산출물은 종료 후 반영합니다.',
    outcome: '1차 서류 합격', stages: ['1차 서류 합격'],
  },
  {
    id: 'expressway-ai', title: '한국도로공사 AI 활용 공모전', kind: '참여',
    subtitle: 'AI 세이프콜(Safe-Call)', period: '2026.11',
    summary: '위험 정차를 감지한 뒤 운전자와 음성으로 대화해 대피 상태를 확인하는 2차사고 예방 아이디어입니다. 도움이 필요한 사건의 관제 인계와 뒤차 경고를 함께 연결하도록 기획했습니다.',
    role: '개인 참가 · 서비스 기획 · AI 연계 흐름 설계',
    tags: ['음성 AI', 'RAG', '도로 안전', '서비스 기획'],
    outcome: '참여', stages: ['문제 분석', '개인 기획안 작성', '공모전 참여'],
    note: '제안명: AI 세이프콜 — 멈춘 차는 AI가 먼저 찾고, 뒤차는 AI가 깨운다.\n\n• 문제 정의: 고속도로 사고·고장 직후 구조 인력이 도착하기 전까지 운전자의 대피 상태와 필요한 도움을 확인하는 대응 공백에 주목했습니다.\n• 서비스 흐름: 기존 관제의 위험 정차 감지 → 사건 접수 → 음성 안내·대피 응답 확인 및 후방 경고 → 우선 인계 → 관제 확인·조치 기록으로 구성했습니다.\n• AI 활용 구상: STT·LLM·TTS와 매뉴얼 기반 RAG를 결합해 응답을 정리하고, 도로 위험 정보와 함께 관제 우선순위를 지원하도록 제안했습니다.\n• 안전한 운영 설계: 승인된 안내 문구·상황별 분기, 불확실한 응답의 사람 인계, 미응답 대체 절차와 동의·최소 수집 원칙을 반영했습니다.\n• 검증 계획: 안내 발신·후방 경고 1분 이내를 제안 목표로 두고, 연결률·대피 응답률·관제 인계 시간을 시범사업에서 비교 검증하도록 기획했습니다.\n\n개인 참가 기획안이며 실제 운영·실증 성과는 포함하지 않았습니다. 심사 결과 미기재.',
  },
];
