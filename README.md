# JMJ Archive · 장민준 포트폴리오

> 프로젝트를 만들고, 설계 판단과 문제 해결 과정을 기록하는 개발 포트폴리오입니다.

[포트폴리오 사이트](https://jmj-archive-portfolio.ai.studio/) · [GitHub](https://github.com/peach20040909) · [이메일](mailto:a01027010769@gmail.com)

## 프로젝트 소개

분산된 프로젝트와 학습 기록을 한곳에서 관리하고, 채용 담당자에게 본인 역할·구현 내용·문제 해결 과정을 전달하는 웹 서비스입니다.

프로젝트 기록을 관리하는 화면과 기업 제출용 공개 화면을 제공합니다. React·TypeScript 프론트엔드와 Express 서버를 사용하며, Gemini API를 통한 프로젝트 요약·자기소개서 작성 보조 기능을 포함합니다. AI가 생성한 문구는 실제 경험과 대조해 확인해야 합니다.

## 대표 작업물

| 프로젝트 | 문제와 구현 | 링크 |
|---|---|---|
| Mobility Field Lab · 해외탐방 조사 플랫폼 | 공유 이동수단 조사 기록, 사진 저장, 두 사람의 독립 판정과 조정, 지도·지표, CSV 내보내기 | [저장소](https://github.com/peach20040909/mobility-field-lab) · [시연](https://peach20040909.github.io/mobility-field-lab/) |
| 한만큼 | GitHub·Notion 작업 기록을 MRL 3축으로 집계해 교수에게 팀 기여 근거를 제공 | [저장소](https://github.com/peach20040909/hanmankeum) · [시연](https://hanmankeum.onrender.com/) |
| MJU SoloMap · 혼밥지도 | 캠퍼스 주변 식당 검색, 혼밥 난이도 필터, 지도·추천 경험 | [저장소](https://github.com/peach20040909/MJU_solomap) · [시연](https://mju-solomap.onrender.com/) |
| Loadmap · 팀 프로젝트 | 강의 복습 후보 구간을 시각화하는 서비스의 React·TypeScript 개발 참여 | [팀 저장소](https://github.com/6eaverr/SW-programming) |
| SetPIK · 팀 프로젝트 | Spotify 취향과 공연 정보를 연결하는 Spring Boot 서비스의 서브 개발 참여 | [팀 저장소](https://github.com/DEPthes/5th-MVP-SetPIK-Server) |

`5th-Server-minjun*` 스터디 저장소는 대표 포트폴리오 목록에서 제외합니다. 팀 프로젝트의 서비스 전체 기능과 개인이 맡은 역할은 구분해 소개합니다.

## 이 저장소의 기능

- 학기·분야별 프로젝트 분류와 상세 기록
- GitHub URL 기반 프로젝트 등록 및 AI 요약 보조
- 기술 스택과 관련 경험 관리
- 트러블슈팅·학습 일지
- 자기소개서 초안과 면접 질문 작성 보조
- 채용 담당자용 공개 뷰 및 인쇄
- JSON 백업·복원과 Markdown 내보내기

## 기술과 구조

React 19 · TypeScript · Tailwind CSS · Node.js · Express · Google GenAI SDK

```text
src/App.tsx                       상태 관리와 저장
src/components/                   프로젝트·공개 뷰·편집 화면
src/data/initialData.ts            기본 포트폴리오 데이터
src/data/userArchiveData.json      서버 저장 데이터
server.ts                         Express 서버 및 AI API
```

## 공개 화면과 관리 화면

기본 주소는 채용 담당자용 공개 화면으로 시작하도록 구성했습니다. 편집할 때는 `?view=manage`를 사용합니다. 이 설정은 소스를 다시 배포한 뒤 적용됩니다.

[공개 포트폴리오](https://jmj-archive-portfolio.ai.studio/) · [관리 화면](https://jmj-archive-portfolio.ai.studio/?view=manage)

## 실행

```bash
npm install
npm run dev
```

AI 기능은 로컬 환경 변수 `GEMINI_API_KEY`를 설정합니다. 키는 Git에 커밋하지 않습니다.

```bash
npm run build
npm start
```

공개/관리 진입 경로는 다음 명령으로 확인합니다.

```bash
npm run lint
node --import tsx --test tests/public-entry.test.tsx
```

실행 스크립트와 실제 모델 설정은 `package.json` 및 `server.ts`를 기준으로 확인합니다.

## 설계 판단과 현재 범위

- 관리용 기록과 채용 담당자가 읽는 공개 화면을 분리했습니다.
- 프로젝트는 문제·본인 역할·해결 과정·확인 가능한 결과로 설명합니다.
- 브라우저 LocalStorage와 서버 JSON 파일을 사용합니다. 계정 기반 다중 사용자 서비스는 현재 범위에 포함하지 않습니다.
- 예정 기능과 실험적 AI 연결은 완성된 기능과 구분합니다.
- 사용 시간 단축·정확도 개선 등 정량 성과는 측정 자료가 확보된 경우에만 기재합니다.

## 개발자

장민준 · 명지대학교 융합소프트웨어학부 데이터사이언스전공

[GitHub](https://github.com/peach20040909) · [포트폴리오](https://jmj-archive-portfolio.ai.studio/) · [문의](mailto:a01027010769@gmail.com)
