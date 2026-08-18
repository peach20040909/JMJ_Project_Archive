export type SemesterType = 
  | '1학년' 
  | '2학년' 
  | '3학년' 
  | '4학년' 
  | '사이드 프로젝트' 
  | '산학/인턴십' 
  | '기타/개인';

export type ProjectCategory = 
  | 'All' 
  | 'Web' 
  | 'App' 
  | 'Backend' 
  | 'Frontend' 
  | 'System' 
  | 'Algorithm' 
  | 'AI/Data';

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  category: 'Web' | 'App' | 'Backend' | 'Frontend' | 'System' | 'Algorithm' | 'AI/Data';
  semester: string;
  period: string;
  teamType: '개인' | '팀 (2명)' | '팀 (3명)' | '팀 (4명)' | '팀 (5인 이상)';
  role: string;
  techStack: string[];
  problemDescription?: string;
  solutionDescription?: string;
  resultDescription?: string;
  keyFeatures: string[];
  githubUrl?: string;
  demoUrl?: string;
  docsUrl?: string;
  imageUrl?: string;
  featured: boolean;
  starBullets?: string[];
  troubleshootingStory?: string;
  updatedAt: string;
}

export interface CourseworkSubject {
  id: string;
  name: string;
  semester: string;
  credits: number;
  grade: string;
  professor?: string;
  keyConcepts: string[];
  termProjectName?: string;
  linkedProjectId?: string;
  repoUrl?: string;
  review?: string;
}

export interface TechSkill {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database & Infra' | 'CS Fundamentals';
  level: 'Familiar (기초 문법)' | 'Competent (과제/프로젝트 구현)' | 'Proficient (아키텍처/최적화)' | 'Expert';
  score: number; // 1-100
  experience: string;
  featured: boolean;
}

export interface SemesterGoal {
  id: string;
  title: string;
  category: '전공 학점' | '주력 프로젝트' | '알고리즘/코테' | '대회/해커톤' | '자격증/어학' | '기타';
  targetDate: string;
  progress: number; // 0-100
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
  milestones: { id: string; text: string; done: boolean }[];
}

export interface DevLog {
  id: string;
  title: string;
  date: string;
  category: '트러블슈팅' | '기술 학습 (TIL)' | '학기 회고' | '세미나/스터디';
  tags: string[];
  content: string;
  linkedProjectId?: string;
}

export interface CoverLetterItem {
  id: string;
  companyName: string; // 지원 기업 (e.g. 네이버, 카카오, 토스, 라인, 쿠팡, 당근 등)
  targetRole: string; // 지원 직무 (e.g. 서버/백엔드 개발자 인턴, 프론트엔드 엔지니어)
  questionCategory: '지원동기 및 직무역량' | '기술적 도전 및 문제해결' | '협업 및 갈등해결' | '주도적 학습 및 성장' | '자유 양식';
  question: string; // 자기소개서 문항
  linkedProjectIds: string[]; // 선택된 프로젝트 ID 배열
  content: string; // 작성/생성된 자기소개서 본문
  targetCharCount: number; // 목표 글자수 (예: 500, 800, 1000자)
  memo?: string; // 개인 메모
  interviewTips?: string[]; // AI 추천 면접 예상 질문 리스트
  keyStrengths?: string[]; // 어필된 핵심 기술 역량
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  englishName: string;
  title: string;
  university: string;
  department: string;
  currentSemester: string;
  gpa: string;
  targetRole: string;
  email: string;
  githubUrl: string;
  blogUrl: string;
  solvedAcTier: string;
  solvedCount: number;
  bio: string;
  location: string;
  interests: string[];
}
