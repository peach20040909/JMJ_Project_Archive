import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { ProjectArchive } from './components/ProjectArchive';
import { TechStackMatrix } from './components/TechStackMatrix';
import { DevLogsSection } from './components/DevLogsSection';
import { AiCoachModal } from './components/AiCoachModal';
import { ExportModal } from './components/ExportModal';
import { PublicPortfolioView } from './components/PublicPortfolioView';
import { GitHubImportModal } from './components/GitHubImportModal';

import {
  UserProfile,
  ProjectItem,
  TechSkill,
  DevLog
} from './types';

import {
  initialProfile,
  initialProjects,
  initialTechSkills,
  initialDevLogs
} from './data/initialData';

import {
  FolderGit2,
  Cpu,
  MessageSquareCode,
  Sparkles,
  ArrowRight,
  Github,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers
} from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'devarchive_profile_v2',
  PROJECTS: 'devarchive_projects_v2',
  SKILLS: 'devarchive_skills_v2',
  LOGS: 'devarchive_logs_v2'
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

  const [skills, setSkills] = useState<TechSkill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : initialTechSkills;
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
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

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
    if (data.skills) setSkills(data.skills);
    if (data.devLogs) setDevLogs(data.devLogs);
  };

  const handleResetData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setSkills(initialTechSkills);
    setDevLogs(initialDevLogs);
    localStorage.clear();
  };

  // If in Public Portfolio View (Visitor / Recruiter mode)
  if (isPublicView) {
    return (
      <PublicPortfolioView
        profile={profile}
        projects={projects}
        skills={skills}
        onBackToArchive={() => setIsPublicView(false)}
      />
    );
  }

  // Render Dashboard Overview Tab
  const renderDashboardOverview = () => {
    const featuredProjs = projects.filter(p => p.featured);
    const featuredSkills = skills.filter(s => s.featured);

    return (
      <div className="space-y-8 py-6">
        
        {/* Action Callout Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50/50 border border-indigo-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold border border-indigo-200">
                개발자 포트폴리오 아카이브
              </span>
              <span className="text-xs text-indigo-700 font-mono flex items-center space-x-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>GitHub 연동 & 실무 프로젝트 관리</span>
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {profile.name}님의 프로젝트 & 기술 아카이브
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              학부 프로젝트부터 사이드 프로젝트, 오픈소스 기여까지 GitHub 저장소 링크 하나로 자동 분석하고 STAR 이력서와 트러블슈팅 일지로 아카이빙하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            {/* GitHub Auto Import */}
            <button
              onClick={() => setIsGitHubModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span>GitHub 링크로 자동 등록</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </button>

            {/* AI Coach */}
            <button
              onClick={() => setIsAiCoachOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI 포트폴리오 코치</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Featured Projects (7 cols) & Core Skills (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Featured Projects (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">대표 프로젝트 ({featuredProjs.length}개)</h3>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
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
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{project.period}</span>
                    </div>
                    <span className="text-xs text-slate-500">{project.teamType} • {project.role}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center font-bold">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tech Stack Matrix Snapshot (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tech Stack Summary Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-violet-600" />
                  <h3 className="text-base font-bold text-slate-900">핵심 기술 스택 ({skills.length}개)</h3>
                </div>
                <button
                  onClick={() => setActiveTab('skills')}
                  className="text-xs text-violet-700 hover:text-violet-900 font-bold"
                >
                  매트릭스 전체보기
                </button>
              </div>

              <div className="space-y-2.5">
                {featuredSkills.slice(0, 5).map(skill => (
                  <div
                    key={skill.id}
                    onClick={() => setActiveTab('skills')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{skill.name}</span>
                      <span className="text-[11px] font-mono font-semibold text-indigo-600">{skill.level}</span>
                    </div>
                    {skill.experience && (
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {skill.experience}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips / Solved.ac stats */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">알고리즘 & 문제 해결</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold">
                  {profile.solvedAcTier}
                </span>
              </div>
              <h4 className="text-base font-extrabold">Solved.ac {profile.solvedCount}문제 해결</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                자료구조와 알고리즘 기본기를 다지고, 프로젝트 트러블슈팅과 연계하여 CS 문제 해결 역량을 증명하세요.
              </p>
            </div>

          </div>
        </div>

        {/* Recent DevLogs Preview Row */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareCode className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">최근 트러블슈팅 & 엔지니어링 일지</h3>
            </div>
            <button
              onClick={() => setActiveTab('logs')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
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
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {log.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{log.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{log.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {log.content.replace(/[#*`]/g, '')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {log.tags.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPublicView={isPublicView}
        setIsPublicView={setIsPublicView}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGitHubImport={() => setIsGitHubModalOpen(true)}
        profile={profile}
      />

      {/* Main Profile Hero Banner */}
      <ProfileHero
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        projects={projects}
        skills={skills}
        devLogs={devLogs}
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
            onOpenGitHubImport={() => setIsGitHubModalOpen(true)}
            targetRole={profile.targetRole}
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

      {/* Clean Footer for Long-term Use through 4th Grade & Job Prep */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-700">
            DevArchive • 소프트웨어 개발자 포트폴리오 & 프로젝트 아카이브
          </p>
          <p className="text-slate-400">
            GitHub 자동 연동, STAR 이력서 성과 분석, 기술 스택 매트릭스 및 트러블슈팅 일지
          </p>
        </div>
      </footer>

      {/* GitHub Auto Import Modal */}
      <GitHubImportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        onImportSuccess={(newProject) => {
          handleAddProject(newProject);
          setActiveTab('projects');
        }}
        targetRole={profile.targetRole}
      />

      {/* AI Strategy Coach Modal */}
      <AiCoachModal
        isOpen={isAiCoachOpen}
        onClose={() => setIsAiCoachOpen(false)}
        profile={profile}
        projects={projects}
        skills={skills}
      />

      {/* Export & Data Management Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={profile}
        projects={projects}
        skills={skills}
        devLogs={devLogs}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />
    </div>
  );
}
