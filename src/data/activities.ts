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
  status?: string;
  role?: string;
  tags?: string[];
}

export const ACTIVITIES_VERSION = 4;
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
    if (version < 4 && ['startup', 'ai-literacy'].includes(item.id)) {
      return { ...item, ...current, title: item.title, status: item.status ?? current.status };
    }
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
    "id": "startup",
    "title": "창업경진대회",
    "kind": "진출",
    "subtitle": "한만큼 · 사업 아이디어",
    "summary": "교수 인터뷰로 확인한 평가 근거의 필요성을 ‘한만큼’ 사업 아이디어로 구체화했습니다. 협업 기록 기반 기여 리포트의 화면 목업과 구독 모델을 기획했습니다.",
    "role": "문제 발견 · 사업 모델 · 현장 조사 · 교수 인터뷰 설계·진행",
    "tags": [
      "교수 인터뷰",
      "사업 모델",
      "UI 목업",
      "서비스 기획"
    ],
    "outcome": "본선 진출 후 탈락",
    "stages": [
      "본선 진출",
      "본선 탈락"
    ],
    "note": "MJU 창업 아이디어 경진대회 · HMK 5인 팀\n\n• 문제 발견: 2026.09.10~11 명지대 교수 4인의 이메일 서면 인터뷰를 설계·진행했습니다. 설명과 생각이 다를 때 조정이 어렵고, 작업 기록을 참고 자료로 활용할 의향이 있다는 답변을 바탕으로 공정한 평가에 필요한 확인 가능한 근거에 집중했습니다.\n• 서비스 기획: 학기 초 도구 연결·템플릿 선택 후 팀이 유형별 가중치에 합의하고 기준을 잠그는 흐름을 화면 목업으로 제안했습니다. GitHub·Notion·Docs 기록 수집과 기획·제작·QA·발표자료·조율 분류는 이 단계의 기획안입니다. 학기 중 점수·순위는 공개하지 않도록 설계했습니다.\n• 산출 모델: 마감 후 개인 비중 = Σ(유형 가중치 × 유형 내 활동 비중)을 원자료와 함께 확인하는 방식을 제안했습니다. 온라인 기록 0%는 실제 기여 0%를 의미하지 않으며, 학생 서술과 교수 관측은 수치에 합산하지 않습니다.\n• 사업 모델: 교수 무료 체험(1분반·최대 5팀) → 팀 수 기준 학과 구독 → 대학 계약·LMS 연동을 검토했습니다. 교내 창업지원·예비창업패키지·민간 투자 순의 자금 계획과 3·6·12개월 검증 로드맵을 구성했습니다. 기존 LMS와 협업 도구 통계를 보완하는 서비스로 포지셔닝했습니다.\n• 팀 구성: 박서준(팀장·기획/PM), 장민준(현장 조사), 김효준(기획·산출 모델), 김유민(자료 조사), 양우림(기획 지원).\n\n완성도는 예시 데이터를 사용한 UI 목업·사업 계획 단계입니다. 이후 AI 리터러시 경진대회에서 실제 서비스 구현과 AI 검증 설계로 발전시켰습니다."
  },
  {
    "id": "ai-literacy",
    "title": "AI 리터러시 경진대회",
    "kind": "진출",
    "subtitle": "한만큼 · 서비스 구현",
    "summary": "창업 아이디어를 실제 배포 서비스로 발전시키며 UX·UI와 사이트 구현을 총괄했습니다. AI는 기록 정리·분류를 돕고, 원본 확인과 최종 판단은 교수가 맡도록 설계했습니다.",
    "role": "UX·UI 설계 및 사이트 구현 총괄 · 시연 영상·최종결과물 제작",
    "tags": [
      "AI 검증",
      "UX·UI",
      "Vercel",
      "Turso",
      "Claude API"
    ],
    "outcome": "결선 진출",
    "stages": [
      "1차 서류 합격",
      "결선 진출"
    ],
    "status": "11.26 결선 발표 예정 · 11.19 최종 제출 마감",
    "note": "명지대 AI 리터러시 경진대회 · 박서준(팀장), 장민준, 김효준의 3인 팀\n\n• 아이디어에서 구현으로: 창업경진대회의 목업을 실제 배포 서비스(hanmankeum.vercel.app)로 발전시켰습니다. UX·UI 설계와 사이트 구현을 총괄하고 시연 영상·최종결과물을 제작했습니다.\n• 교수 기준 존중: 서비스가 정한 유형 대신 교수가 원래 쓰던 평가기준을 AI가 정리하고, 교수가 수정·확정하는 방식으로 바꿨습니다. AI의 기준 정리·기록 분류·근거 요약·자기 기술은 모두 사람이 확인하는 초안이며 서비스는 성적을 산출하지 않습니다.\n• AI 검증: AI 분류와 규칙 판단이 엇갈리면 ‘확인 필요’로 올려 교수가 원본을 보고 결정하도록 했습니다. 사람이 수정한 뒤에도 AI의 원래 판단을 보존합니다.\n• 사용 투명성: 기록마다 AI 도움을 표시하고, 요약 문장에 근거 기록 번호 인용을 필수로 했습니다. 인용이 없는 문장은 서버가 제외하며 자기 기술은 AI 초안 대비 수정률을 기록합니다.\n• 프롬프트 관리: criteria-draft-v2, criteria-classify-v1, summary-v1, selfdraft-v2를 버전별로 관리하고 별도 프롬프트 문서로 제출합니다.\n• 기술·결과물: Node.js, Vercel, Turso(libSQL), Anthropic Claude API(claude-haiku), GitHub REST API, Notion Webhook, Playwright를 사용했습니다. 학생별 기여율·계산 근거·원본 링크를 담은 교수용 근거 리포트 PDF, 1분 시연 영상, 최종결과물 PDF(17쪽), 프롬프트 PDF(16쪽), 발표 PPT를 제작했습니다. 서비스 테스트는 22개입니다.\n\n창업 버전의 사업화 전략에서 AI를 검증하며 사용하는 실제 서비스로 초점을 옮겼습니다. 최종 심사 결과는 확정 후 별도 갱신합니다."
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
