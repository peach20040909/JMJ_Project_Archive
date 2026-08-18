# 🚀 JMJ_Archive (장민준 개발자 포트폴리오 & 직무 아카이브)

> **"탄탄한 CS 기본기와 실무 문제 해결력을 갖춘 융합소프트웨어 엔지니어, 장민준의 종합 개발 아카이브 플랫폼"**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_3.7_Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

---

## 📌 1. 프로젝트 개요 (Overview)

**JMJ_Archive**는 명지대학교 융합소프트웨어학부 장민준(2학년 2학기)의 분산된 학업 산출물, 팀/개인 프로젝트, CS 교과목 실습, 알고리즘 풀이, 트러블슈팅 기록을 체계적으로 구조화하고 채용 담당자 및 멘토에게 효과적으로 전달하기 위해 설계된 **풀스택 포트폴리오 & 직무 역량 아카이빙 플랫폼**입니다.

GitHub 저장소 자동 분석, STAR(Situation-Task-Action-Result) 기법 기반 AI 자기소개서/면접 코칭, 실시간 이중 영구 저장소(LocalStorage + 서버 파일)를 갖추고 있습니다.

---

## ✨ 2. 핵심 기능 (Key Features)

### 1. 📁 다차원 프로젝트 아카이브
- **학기별 & 카테고리별 분류**: 2학년 여름방학, 2-1학기, 1-2학기 등 학업 타임라인과 Web, Backend, System, Algorithm 등 카테고리별 다차원 필터링
- **구조화된 상세 모달**: 문제 정의(Problem) ➔ 해결 방안(Solution) ➔ 정량적 성과(Result) ➔ 핵심 트러블슈팅 스토리텔링
- **등록된 대표 프로젝트**:
  - `Loadmap - 강의 복습 지도 서비스` (React, TypeScript / 서브 개발)
  - `5th-MVP-SetPIK-Server` (Java, Dockerfile, Spring Boot / 서브 개발자)
  - `JMJ_Archive - 포트폴리오 & 직무 아카이브` (React 19, TypeScript, Express, Gemini 3.7 Flash)

### 2. ⚡ GitHub 저장소 링크 기반 AI 자동 분석 (GitHub Parser)
- GitHub Public Repo URL 입력 시 Gemini 3.7 Flash 모델이 `README.md` 및 저장소 구조를 파싱하여 프로젝트 요약, 카테고리, 기술 스택, 핵심 기능, STAR 불릿을 자동으로 추출하여 등록

### 3. 🤖 AI 자기소개서 & 면접 시뮬레이터 (AI Cover Letter & Interview Coach)
- 등록된 프로젝트 기록을 기반으로 주요 기업(카카오, 네이버, 토스, 당근 등) 문항별 STAR 기반 자기소개서 초안 자동 생성
- 작성된 경험에 맞춤화된 **면접관 압박/꼬리 질문** 및 대비 답변 팁 자동 추출

### 4. 🛠️ 기술 스택 매트릭스 (Tech Stack Matrix)
- 언어(Java, C/C++, TS, Python, SQL), 프론트엔드(React, Tailwind), 백엔드(Spring Boot, JPA, Node.js), 데이터베이스 & 인프라(MySQL, Docker, Git), CS 전공 기초(자료구조, 알고리즘, 컴퓨터구조)를 숙련도 점수 및 실제 활용 경험과 함께 시각화

### 5. 📝 트러블슈팅 & 기술 학습 일지 (Dev Logs)
- Spring Boot + JPA N+1 문제 해결(Fetch Join), C++ 스마트 포인터 순환 참조(weak_ptr), 학기별 CS 회고 등 실무적인 문제 해결 과정 기록

### 6. 🌐 공개용 이력서 뷰 (Visitor Mode) & 원클릭 내보내기 (Export)
- 채용 담당자가 한눈에 보기 편한 깔끔한 포트폴리오 뷰 제공
- **Markdown (.md)**: GitHub Profile README 및 Notion 복사용 마크다운 원클릭 생성
- **JSON Backup**: 전체 데이터 백업 및 복원, 텍스트 직접 붙여넣기 지원

---

## 🛠️ 3. 기술 스택 (Tech Stack)

### Frontend
- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS (Utility-First Responsive UI)
- **Icons**: Lucide React
- **Effects & Animation**: Canvas-Confetti

### Backend & AI
- **Server**: Node.js, Express
- **AI Model**: Google Gemini 3.7 Flash (`@google/genai` SDK)
- **Dev Runner**: `tsx`, `vite`, `esbuild`

### Persistence
- **Client-side**: LocalStorage (`jmj_archive_*_v3`)
- **Server-side**: Persistent JSON Storage (`src/data/userArchiveData.json`)

---

## 📂 4. 디렉터리 구조 (Directory Structure)

```text
JMJ_Archive/
├── src/
│   ├── components/            # UI 컴포넌트
│   │   ├── Header.tsx         # 상단 네비게이션 & 빠른 액션
│   │   ├── ProfileCard.tsx    # 프로필 & 학업 정보 요약 카드
│   │   ├── ProjectCard.tsx    # 프로젝트 카드 & 상세 모달
│   │   ├── ProjectFilter.tsx  # 다차원 검색/필터 바
│   │   ├── TechStackView.tsx  # 기술 스택 매트릭스
│   │   ├── DevLogView.tsx     # 트러블슈팅 & 학습 일지
│   │   ├── CoverLetterView.tsx# AI 자기소개서 & 면접 뷰
│   │   ├── GitHubImportModal.tsx # GitHub 자동 파싱 모달
│   │   ├── AiCoachModal.tsx   # AI 포트폴리오 전략 코치
│   │   ├── ExportModal.tsx    # 마크다운/JSON 내보내기 및 복원
│   │   └── PublicPortfolioView.tsx # 채용 담당자용 공개 뷰
│   ├── data/
│   │   ├── initialData.ts     # 기본 데이터 셋
│   │   └── userArchiveData.json # 서버 영구 저장소
│   ├── types.ts               # 전역 TypeScript 인터페이스 정의
│   ├── App.tsx                # 메인 애플리케이션 컴포넌트
│   └── main.tsx               # 진입점
├── server.ts                  # Express 백엔드 & Gemini AI API 라우트
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 5. 로컬 개발 및 실행 방법 (Getting Started)

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정 (.env)
```env
# Gemini API Key (AI 분석 & 자기소개서 생성용)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속합니다.

### 4. 프로덕션 빌드 & 실행
```bash
npm run build
npm start
```

---

## 👤 6. 개발자 정보 (Developer Information)

- **개발자**: 장민준 (Jang Minjun)
- **소속**: 명지대학교 융합소프트웨어학부 데이터사이언스전공 (2학년 2학기)
- **Email**: [a01027010769@gmail.com](mailto:a01027010769@gmail.com)
- **GitHub**: [github.com/minjun-dev](https://github.com/minjun-dev)
- **Blog**: [velog.io/@minjun_dev](https://velog.io/@minjun_dev)
- **Solved.ac**: [solved.ac/profile/minjun-dev](https://solved.ac) (Gold IV / 284 Solved)

---

<div align="center">
  <sub>Designed & Developed by Jang Minjun © 2026. All Rights Reserved.</sub>
</div>
