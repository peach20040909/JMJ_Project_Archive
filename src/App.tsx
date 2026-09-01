import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileHero } from './components/ProfileHero';
import { ProjectArchive } from './components/ProjectArchive';
import { TechStackMatrix } from './components/TechStackMatrix';
import { DevLogsSection } from './components/DevLogsSection';
import { CoverLetterSection } from './components/CoverLetterSection';
import { AiCoachModal } from './components/AiCoachModal';
import { ExportModal } from './components/ExportModal';
import { PublicPortfolioView } from './components/PublicPortfolioView';
import { GitHubImportModal } from './components/GitHubImportModal';

import {
  UserProfile,
  ProjectItem,
  TechSkill,
  DevLog,
  CoverLetterItem
} from './types';

import {
  initialProfile,
  initialProjects,
  initialTechSkills,
  initialDevLogs,
  initialCoverLetters
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
  Layers,
  FileEdit
} from 'lucide-react';

const STORAGE_KEYS = {
  PROFILE: 'jmj_archive_profile_v6',
  PROJECTS: 'jmj_archive_projects_v6',
  SKILLS: 'jmj_archive_skills_v6',
  LOGS: 'jmj_archive_logs_v6',
  COVER_LETTERS: 'jmj_archive_coverletters_v6'
};

export default function App() {
  // 1. Core State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem('jmj_archive_profile_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.gpa === '4.18 / 4.50' || !parsed.gpa) {
          parsed.gpa = '4.27 / 4.50';
        }
        return parsed;
      } catch (e) {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS) || localStorage.getItem('jmj_archive_projects_v5');
    if (saved) {
      try {
        const parsed: ProjectItem[] = JSON.parse(saved);
        // Ensure Spotify project has the latest Wikidata starBullets & troubleshooting
        return parsed.map(p => {
          if (p.id === 'proj-1787068301402') {
            const initP = initialProjects.find(i => i.id === 'proj-1787068301402');
            return initP ? { ...p, ...initP, ...p, starBullets: initP.starBullets, troubleshootingStory: initP.troubleshootingStory } : p;
          }
          return p;
        });
      } catch (e) {
        return initialProjects;
      }
    }
    return initialProjects;
  });

  const [skills, setSkills] = useState<TechSkill[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS) || localStorage.getItem('jmj_archive_skills_v5');
    return saved ? JSON.parse(saved) : initialTechSkills;
  });

  const [devLogs, setDevLogs] = useState<DevLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS) || localStorage.getItem('jmj_archive_logs_v5');
    if (saved) {
      try {
        const parsed: DevLog[] = JSON.parse(saved);
        // Make sure the new Spotify-Wikidata log is present
        const hasSpotifyLog = parsed.some(l => l.id === 'log-spotify-kopis-matching' || l.title.includes('Spotify-KOPIS'));
        if (!hasSpotifyLog) {
          const newLog = initialDevLogs.find(l => l.id === 'log-spotify-kopis-matching');
          return newLog ? [newLog, ...parsed] : parsed;
        }
        return parsed;
      } catch (e) {
        return initialDevLogs;
      }
    }
    return initialDevLogs;
  });

  const [coverLetters, setCoverLetters] = useState<CoverLetterItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COVER_LETTERS) || localStorage.getItem('jmj_archive_coverletters_v5');
    if (saved) {
      try {
        const parsed: CoverLetterItem[] = JSON.parse(saved);
        return parsed.map(cl => {
          if (cl.id === 'cl-1') {
            const initCl = initialCoverLetters.find(c => c.id === 'cl-1');
            return initCl ? { ...cl, ...initCl } : cl;
          }
          return cl;
        });
      } catch (e) {
        return initialCoverLetters;
      }
    }
    return initialCoverLetters;
  });

  // Save status & Notification State
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('saved');
  const [lastSavedText, setLastSavedText] = useState<string>('자동 저장됨');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  // Navigation & View Mode State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isPublicView, setIsPublicView] = useState<boolean>(false);

  // Modals
  const [isAiCoachOpen, setIsAiCoachOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);

  // Initial Load from Server if no local state exists
  useEffect(() => {
    const hasLocal = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!hasLocal) {
      fetch('/api/archive-data')
        .then(res => res.json())
        .then(result => {
          if (result.success && result.data) {
            const d = result.data;
            if (d.profile) setProfile(d.profile);
            if (d.projects) setProjects(d.projects);
            if (d.skills) setSkills(d.skills);
            if (d.devLogs) setDevLogs(d.devLogs);
            if (d.coverLetters) setCoverLetters(d.coverLetters);
          }
        })
        .catch(err => console.log('Server archive load skipped:', err));
    }
  }, []);

  // Sync to LocalStorage and Server File
  useEffect(() => {
    // 1. Immediate sync to browser localStorage
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(devLogs));
    localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(coverLetters));

    setSaveStatus('saving');

    // 2. Debounced sync to server file
    const timer = setTimeout(() => {
      fetch('/api/archive-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          projects,
          skills,
          devLogs,
          coverLetters,
          updatedAt: new Date().toISOString()
        })
      })
        .then(() => {
          setSaveStatus('saved');
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          setLastSavedText(`자동 저장됨 (${timeStr})`);
        })
        .catch(err => {
          console.log('Server archive sync skipped:', err);
          setSaveStatus('saved');
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [profile, projects, skills, devLogs, coverLetters]);

  // CRUD Handlers - Profile
  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    showToast(`✅ 프로필이 성공적으로 저장되었습니다. (학점: ${updated.gpa})`);
  };

  // CRUD Handlers - Projects
  const handleAddProject = (p: ProjectItem) => {
    setProjects(prev => [p, ...prev]);
    showToast(`✅ 프로젝트 '${p.title}'이(가) 추가되었습니다.`);
  };
  const handleUpdateProject = (p: ProjectItem) => {
    setProjects(prev => prev.map(item => item.id === p.id ? p : item));
    showToast(`✅ 프로젝트 '${p.title}' 수정사항이 저장되었습니다.`);
  };
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
    showToast('🗑️ 프로젝트가 삭제되었습니다.');
  };

  // CRUD Handlers - Skills
  const handleAddSkill = (s: TechSkill) => {
    setSkills(prev => [...prev, s]);
    showToast(`✅ 기술 스택 '${s.name}'이(가) 추가되었습니다.`);
  };
  const handleUpdateSkill = (s: TechSkill) => {
    setSkills(prev => prev.map(item => item.id === s.id ? s : item));
    showToast(`✅ 기술 스택 '${s.name}'이(가) 수정되었습니다.`);
  };
  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(item => item.id !== id));
    showToast('🗑️ 기술 스택이 삭제되었습니다.');
  };

  // CRUD Handlers - DevLogs
  const handleAddLog = (l: DevLog) => {
    setDevLogs(prev => [l, ...prev]);
    showToast(`✅ 트러블슈팅 일지 '${l.title}'이(가) 등록되었습니다.`);
  };
  const handleUpdateLog = (l: DevLog) => {
    setDevLogs(prev => prev.map(item => item.id === l.id ? l : item));
    showToast(`✅ 트러블슈팅 일지가 수정되었습니다.`);
  };
  const handleDeleteLog = (id: string) => {
    setDevLogs(prev => prev.filter(item => item.id !== id));
    showToast('🗑️ 일지가 삭제되었습니다.');
  };

  // CRUD Handlers - Cover Letters
  const handleAddCoverLetter = (cl: CoverLetterItem) => {
    setCoverLetters(prev => [cl, ...prev]);
    showToast(`✅ '${cl.companyName}' 자기소개서가 저장되었습니다.`);
  };
  const handleUpdateCoverLetter = (cl: CoverLetterItem) => {
    setCoverLetters(prev => prev.map(item => item.id === cl.id ? cl : item));
    showToast(`✅ 자기소개서가 수정되었습니다.`);
  };
  const handleDeleteCoverLetter = (id: string) => {
    setCoverLetters(prev => prev.filter(item => item.id !== id));
    showToast('🗑️ 자기소개서가 삭제되었습니다.');
  };

  // Import and Reset
  const handleImportData = (data: any) => {
    if (data.profile) setProfile(data.profile);
    if (data.projects) setProjects(data.projects);
    if (data.skills) setSkills(data.skills);
    if (data.devLogs) setDevLogs(data.devLogs);
    if (data.coverLetters) setCoverLetters(data.coverLetters);
  };

  const handleResetData = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    setSkills(initialTechSkills);
    setDevLogs(initialDevLogs);
    setCoverLetters(initialCoverLetters);
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
                개발자 포트폴리오 & 취업 준비 아카이브
              </span>
              <span className="text-xs text-indigo-700 font-mono flex items-center space-x-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>GitHub 연동 & AI 자기소개서 지원</span>
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {profile.name}님의 프로젝트 & 직무 역량 아카이브
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              학부 프로젝트부터 사이드 프로젝트까지 GitHub 저장소 링크 하나로 자동 분석하고, 축적된 프로젝트 경험을 토대로 AI 기반 자기소개서와 면접 대비 꼬리 질문을 준비하세요.
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

            {/* AI Cover Letter Quick Link */}
            <button
              onClick={() => setActiveTab('coverletter')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-sm flex items-center space-x-2 transition-all hover:scale-105"
            >
              <FileEdit className="w-4 h-4" />
              <span>AI 자기소개서 작성</span>
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

            {/* Quick Link to AI Cover Letters */}
            <div 
              onClick={() => setActiveTab('coverletter')}
              className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200/90 shadow-sm hover:border-purple-300 transition-all cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-bold">
                  취업 & 인턴 지원 대비
                </span>
                <span className="text-xs text-purple-700 font-bold">{coverLetters.length}건 작성됨</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                프로젝트 기반 AI 자기소개서 & 면접 시뮬레이터
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                축적된 프로젝트의 STAR 성과와 트러블슈팅 일지를 활용해 기업별 맞춤 자소서를 작성하고 면접 꼬리 질문을 대비하세요.
              </p>
            </div>

            {/* Solved.ac stats */}
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
        saveStatus={saveStatus}
        lastSavedText={lastSavedText}
      />

      {/* Main Profile Hero Banner */}
      <ProfileHero
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        projects={projects}
        skills={skills}
        devLogs={devLogs}
        coverLettersCount={coverLetters.length}
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

        {activeTab === 'coverletter' && (
          <CoverLetterSection
            coverLetters={coverLetters}
            projects={projects}
            profile={profile}
            onAddCoverLetter={handleAddCoverLetter}
            onUpdateCoverLetter={handleUpdateCoverLetter}
            onDeleteCoverLetter={handleDeleteCoverLetter}
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
            JMJ_Archive • 장민준 개발자 포트폴리오 & 직무 아카이브
          </p>
          <p className="text-slate-400">
            GitHub 자동 연동, STAR 이력서 성과 분석, 기술 스택 매트릭스, AI 자기소개서 & 면접 시뮬레이터
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
        coverLetters={coverLetters}
        onImportData={handleImportData}
        onResetData={handleResetData}
      />
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
