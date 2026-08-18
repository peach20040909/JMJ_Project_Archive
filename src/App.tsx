import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { ProjectArchive } from './components/ProjectArchive';
import { CourseworkArchive } from './components/CourseworkArchive';
import { TechStackMatrix } from './components/TechStackMatrix';
import { SemesterRoadmap } from './components/SemesterRoadmap';
import { DevLogsSection } from './components/DevLogsSection';
import { AiCoachModal } from './components/AiCoachModal';
import { ExportModal } from './components/ExportModal';
import { PublicPortfolioView } from './components/PublicPortfolioView';

import {
  UserProfile,
  ProjectItem,
  CourseworkSubject,
  TechSkill,
  SemesterGoal,
  DevLog
} from './types';

import {
  initialProfile,
  initialProjects,
  initialCoursework,
  initialTechSkills,
  initialGoals,
  initialDevLogs
} from './data/initialData';

import {
  FolderGit2,
  BookOpen,
  Cpu,
  Target,
  MessageSquareCode,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'devarchive_profile_v1',
  PROJECTS: 'devarchive_projects_v1',
  COURSEWORK: 'devarchive_coursework_v1',
  SKILLS: 'devarchive_skills_v1',
  GOALS: 'devarchive_goals_v1',
  LOGS: 'devarchive_logs_v1'
};

export default function App() {
  // 1. Core State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [courseworks, setCourseworks] = useState<CourseworkSubject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COURSEWORK);
    return saved ? JSON.parse(saved) : initialCoursework;
  });

  const [skills, setSkills] = useState<TechSkill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialTechSkills;
  });

  const [goals, setGoals] = useState<SemesterGoal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [devLogs, setDevLogs] = useState<DevLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : initialDevLogs;
  });

  // Navigation & View Mode State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isPublicView, setIsPublicView] = useState<boolean>(false);

  // Modals
  const [isAiCoachOpen, setIsAiCoachOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSEWORK, JSON.stringify(courseworks));
  }, [courseworks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(devLogs));
  }, [devLogs]);

  // CRUD Handlers - Profile
  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  // CRUD Handlers - Projects
  const handleAddProject = (p: ProjectItem) => {
    setProjects(prev => [p, ...prev]);
  };
  const handleUpdateProject = (p: ProjectItem) => {
    setProjects(prev => prev.map(item => item.id === p.id ? p : item));
  };
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  };

  // CRUD Handlers - Coursework
  const handleAddCoursework = (c: CourseworkSubject) => {
    setCourseworks(prev => [...prev, c]);
  };
  const handleUpdateCoursework = (c: CourseworkSubject) => {
    setCourseworks(prev => prev.map(item => item.id === c.id ? c : item));
  };
  const handleDeleteCoursework = (id: string) => {
    setCourseworks(prev => prev.filter(item => item.id !== id));
  };

  // CRUD Handlers - Skills
  const handleAddSkill = (s: TechSkill) => {
    setSkills(prev => [...prev, s]);
  };
  const handleUpdateSkill = (s: TechSkill) => {
    setSkills(prev => prev.map(item => item.id === s.id ? s : item));
  };
  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(item => item.id !== id));
  };

  // CRUD Handlers - Goals
  const handleAddGoal = (g: SemesterGoal) => {
    setGoals(prev => [...prev, g]);
  };
  const handleUpdateGoal = (g: SemesterGoal) => {
    setGoals(prev => prev.map(item => item.id === g.id ? g : item));
  };
  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(item => item.id !== id));
  };

  // CRUD Handlers - DevLogs
  const handleAddLog = (l: DevLog) => {
    setDevLogs(prev => [l, ...prev]);
  };
  const handleUpdateLog = (l: DevLog) => {
    setDevLogs(prev => prev.map(item => item.id === l.id ? l : item));
  };
  const handleDeleteLog = (id: string) => {
    setDevLogs(prev => prev.filter(item => item.id !== id));
  };

  // Import and Reset
  const handleImportData = (data: any) => {
    if (data.profile) setProfile(data.profile);
    if (data.projects) setProjects(data.projects);
    if (data.courseworks) setCourseworks(data.courseworks);
    if (data.skills) setSkills(data.skills);
    if (data.goals) setGoals(data.goals);
    if (data.devLogs) setDevLogs(data.devLogs);
  };

  const handleResetData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setCourseworks(initialCoursework);
    setSkills(initialTechSkills);
    setGoals(initialGoals);
    setDevLogs(initialDevLogs);
    localStorage.clear();
  };

  // If in Public Portfolio View (Visitor / Recruiter mode)
  if (isPublicView) {
    return (
      <PublicPortfolioView
        profile={profile}
        projects={projects}
        courseworks={courseworks}
        skills={skills}
        onBackToArchive={() => setIsPublicView(false)}
      />
    );
  }

  // Render Dashboard Overview Tab
  const renderDashboardOverview = () => {
    const featuredProjs = projects.filter(p => p.featured);
    const overallProgress = goals.length > 0
      ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
      : 0;

    return (
      <div className="space-y-8 py-6">
        
        {/* 2-2 Semester Action Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/60 border border-indigo-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                2학년 2학기 진학 가이드
              </span>
              <span className="text-xs text-amber-300 font-mono flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CS 3대장(알고리즘·OS·DB) 집중기</span>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {profile.name}님의 2학년 2학기 맞춤형 포트폴리오 아카이브
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              기이수한 1학년 기초 & 2학년 1학기 전공 과목을 바탕으로, 2-2학기 주력 프로젝트(WebSocket/Spring Boot) 릴리즈와 CS 심화 이론을 실무형 포트폴리오로 아카이빙하세요.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 flex-shrink-0">
            <button
              onClick={() => setIsAiCoachOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>AI 2학기 커리어 조언</span>
            </button>
            <button
              onClick={() => setIsPublicView(true)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
            >
              공개 뷰 확인
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Featured Projects & Goals Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Featured Projects (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">대표 프로젝트 ({featuredProjs.length}개)</h3>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
              >
                <span>전체 아카이브 보기 ({projects.length}개)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {featuredProjs.map(project => (
                <div
                  key={project.id}
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{project.period}</span>
                    </div>
                    <span className="text-xs text-slate-400">{project.teamType} • {project.role}</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700/60">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2-2 Goals & Coursework Snapshot (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 2-2 Semester Roadmap Goal Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">2-2학기 핵심 목표 현황</h3>
                </div>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  로드맵 관리
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">학기 전체 진행률</span>
                  <span className="font-mono text-indigo-400 font-bold">{overallProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Goal Items */}
              <div className="space-y-2">
                {goals.slice(0, 4).map(g => (
                  <div
                    key={g.id}
                    onClick={() => setActiveTab('roadmap')}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors flex items-center justify-between cursor-pointer text-xs"
                  >
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${g.progress === 100 ? 'bg-emerald-400' : 'bg-indigo-400'}`}></span>
                      <span className="text-slate-200 truncate">{g.title}</span>
                    </div>
                    <span className="text-slate-400 font-mono flex-shrink-0 font-bold">{g.progress}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CS Coursework & DevLogs snapshot */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">2-2 수강 예정 전공 4과목</h3>
                </div>
                <button
                  onClick={() => setActiveTab('coursework')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  과목 목록
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="font-bold text-white">알고리즘</div>
                  <div className="text-[10px] text-slate-400">DP, 그래프, 코딩테스트</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="font-bold text-white">운영체제</div>
                  <div className="text-[10px] text-slate-400">동기화, 가상메모리</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="font-bold text-white">데이터베이스</div>
                  <div className="text-[10px] text-slate-400">트랜잭션, B+ Tree 인덱스</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80">
                  <div className="font-bold text-white">웹서버/SW공학</div>
                  <div className="text-[10px] text-slate-400">REST API, CI/CD 배포</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recent DevLogs Preview Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareCode className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">최근 트러블슈팅 & 기술 학습 일지</h3>
            </div>
            <button
              onClick={() => setActiveTab('logs')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
            >
              <span>일지 전체보기 ({devLogs.length}편)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {devLogs.slice(0, 3).map(log => (
              <div
                key={log.id}
                onClick={() => setActiveTab('logs')}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {log.category}
                    </span>
                    <span className="text-[11px] text-slate-500">{log.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">{log.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {log.content.replace(/[#*`]/g, '')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {log.tags.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPublicView={isPublicView}
        setIsPublicView={setIsPublicView}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        profile={profile}
      />

      {/* Main Profile Hero Banner */}
      <ProfileHero
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        projects={projects}
        courseworks={courseworks}
        skills={skills}
        goals={goals}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
        onNavigateTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && renderDashboardOverview()}

        {activeTab === 'projects' && (
          <ProjectArchive
            projects={projects}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
            targetRole={profile.targetRole}
          />
        )}

        {activeTab === 'coursework' && (
          <CourseworkArchive
            courseworks={courseworks}
            projects={projects}
            onAddCoursework={handleAddCoursework}
            onUpdateCoursework={handleUpdateCoursework}
            onDeleteCoursework={handleDeleteCoursework}
          />
        )}

        {activeTab === 'skills' && (
          <TechStackMatrix
            skills={skills}
            onAddSkill={handleAddSkill}
            onUpdateSkill={handleUpdateSkill}
            onDeleteSkill={handleDeleteSkill}
          />
        )}

        {activeTab === 'roadmap' && (
          <SemesterRoadmap
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            onOpenAiCoach={() => setIsAiCoachOpen(true)}
          />
        )}

        {activeTab === 'logs' && (
          <DevLogsSection
            devLogs={devLogs}
            projects={projects}
            onAddLog={handleAddLog}
            onUpdateLog={handleUpdateLog}
            onDeleteLog={handleDeleteLog}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-900/60 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-slate-400">
            DevArchive • 소프트웨어학과 2학년 2학기 맞춤형 포트폴리오 아카이브 시스템
          </p>
          <p>
            기이수 CS 과목, 프로젝트 산출물, 트러블슈팅 일지 및 2-2학기 성장 로드맵 관리
          </p>
        </div>
      </footer>

      {/* AI Strategy Coach Modal */}
      <AiCoachModal
        isOpen={isAiCoachOpen}
        onClose={() => setIsAiCoachOpen(false)}
        profile={profile}
        projects={projects}
        courseworks={courseworks}
        goals={goals}
      />

      {/* Export & Data Management Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={profile}
        projects={projects}
        courseworks={courseworks}
        skills={skills}
        goals={goals}
        devLogs={devLogs}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />
    </div>
  );
}
