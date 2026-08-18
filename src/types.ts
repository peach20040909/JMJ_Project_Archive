export type SemesterType = 
  | '1학년 1학기' 
  | '1학년 2학기' 
  | '2학년 1학기' 
  | '2학년 여름방학' 
  | '2학년 2학기 (예정/진행중)' 
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
  semester: SemesterType;
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
  semester: '1학년 1학기' | '1학년 2학기' | '2학년 1학기' | '2학년 2학기 (수강예정)';
  credits: number;
  grade: 'A+' | 'A0' | 'B+' | 'B0' | '수강예정' | 'P';
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
