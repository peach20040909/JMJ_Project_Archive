export interface PortfolioActivity {
  id: string;
  title: string;
  subtitle?: string;
  kind: '수상' | '선발' | '진출' | '참여';
  outcome: string;
  stages: string[];
  note?: string;
}

// Confirmed by the portfolio owner on 2026-11-14. Omit unknown dates and roles.
export const activities: PortfolioActivity[] = [
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
