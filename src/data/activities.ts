export interface PortfolioActivity {
  id: string;
  title: string;
  subtitle?: string;
  kind: '수상' | '선발' | '진출' | '참여' | '실무';
  outcome: string;
  stages: string[];
  note?: string;
  period?: string;
  role?: string;
  tags?: string[];
}

export const ACTIVITIES_VERSION = 2;
export const academyExperience: PortfolioActivity = {
  id: 'j-english-ax', title: '제이영어학원', subtitle: '교육 현장의 반복 업무를 AI로 자동화한 AX 경험',
  kind: '실무', outcome: '재직 중 · AX',
  period: '2023.03 ~ 현재 · 2027.02 종료 예정',
  role: '교육 운영 지원 · AI 업무 자동화 · 워크스페이스 설계',
  tags: ['AX', 'GPT', 'Codex', '문서 자동화', 'DB 설계'],
  stages: ['반복 업무 파악', 'AI 자동화 적용', '결과 검수·개선'],
  note: '학교별 시험 범위에 맞춘 자료 편집, 교재 합본 제작, 학습 관리 등 실제 학원 운영 업무를 맡으며 반복되는 작업을 자동화했습니다.\n\n• 자료 편집·합본 자동화: 여러 교육 자료를 내려받고 시험 범위에 맞게 편집·통합하는 작업에 AI를 활용했습니다.\n• 변형문제 생성기: GPT·Codex로 유형별 문제 생성기를 제작하고, 문제 유형별 지침과 DB 구조를 구체화했습니다. 12개 지문에서 36문제를 생성해 문제·해설 자료로 정리한 업무 기록이 있습니다.\n• AI 보조 검수: 생성 문제와 기존 교재의 정답·해설을 GPT로 점검하고, 오류를 확인·수정했습니다.\n• 학원 DB 기반 워크스페이스: 교육 자료와 업무 흐름을 연결하는 전체 워크스페이스를 설계했습니다.\n\n근무 기간 중 2024.03 ~ 2025.09는 군 복무로 제외하며, 전역 후 학원 업무에 복귀했습니다.',
};

// Add this new experience once to older archives, preserving edits and intentional deletions thereafter.
export function upgradeActivities(items: PortfolioActivity[], version = 0): PortfolioActivity[] {
  return version >= ACTIVITIES_VERSION || items.some(item => item.id === academyExperience.id)
    ? items : [...items, academyExperience];
}

// Confirmed by the portfolio owner on 2026-11-14. Omit unknown dates and roles.
export const activities: PortfolioActivity[] = [
  academyExperience,
  {
    id: 'hackathon', title: '명지대학교 AI 창의적 아이디어 해커톤',
    subtitle: '고리(Go:RE)', kind: '수상', outcome: '우수상',
    stages: ['해커톤 참여', '우수상 수상'],
  },
  {
    id: 'student-major', title: '학생설계전공 공모전',
    kind: '수상', outcome: '은상',
    stages: ['1차 서류 합격', '본선 은상 수상'],
  },
  {
    id: 'overseas', title: '해외탐방', subtitle: 'Mobility Field Lab',
    kind: '선발', outcome: '최종 합격',
    stages: ['서류 합격', '면접', '최종 합격'],
    note: '해외 현장조사에 사용할 기록·검수·분석 플랫폼을 준비하고 있습니다.',
  },
  {
    id: 'startup', title: '창업경진대회', kind: '진출',
    outcome: '본선 진출 후 탈락', stages: ['본선 진출', '본선 탈락'],
  },
  {
    id: 'ai-literacy', title: 'AI 리터러시 경진대회', kind: '진출',
    outcome: '1차 서류 합격', stages: ['1차 서류 합격'],
  },
  {
    id: 'expressway-ai', title: '한국도로공사 AI 활용 공모전', kind: '참여',
    outcome: '참여', stages: ['공모전 참여'], note: '결과 미기재',
  },
];
