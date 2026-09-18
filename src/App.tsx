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
  PROFILE: 'jmj_archive_profile_v8',
  PROJECTS: 'jmj_archive_projects_v8',
  SKILLS: 'jmj_archive_skills_v8',
  LOGS: 'jmj_archive_logs_v8',
  COVER_LETTERS: 'jmj_archive_coverletters_v8'
};

export default function App() {
  // 1. Core State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem('jmj_archive_profile_v7') || localStorage.getItem('jmj_archive_profile_v6');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.gpa === '4.18 / 4.50' || !parsed.gpa) {
          parsed.gpa = '4.27 / 4.50';
        }
        // Remove '(예정 / 진행 중)' or '(2026 Fall)' suffixes to keep pure semester name
        if (parsed.currentSemester && (parsed.currentSemester.includes('예정') || parsed.currentSemester.includes('진행') || parsed.currentSemester.includes('2026 Fall'))) {
          parsed.currentSemester = '2학년 2학기';
        }
        return parsed;
      } catch (e) {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS) || localStorage.getItem('jmj_archive_projects_v7') || localStorage.getItem('jmj_archive_projects_v6');
    if (saved) {
      try {
        let parsed: ProjectItem[] = JSON.parse(saved);
        // Ensure the SoloMap project is present and has full links & metadata
        const hasSolomap = parsed.some(p => p.id === 'proj-mju-solomap' || p.title.includes('혼밥지도') || (p.demoUrl && p.demoUrl.includes('mju-solomap')));
        const solomapProj = initialProjects.find(p => p.id === 'proj-mju-solomap');
        if (!hasSolomap && solomapProj) {
          parsed = [solomapProj, ...parsed];
        } else if (hasSolomap && solomapProj) {
          parsed = parsed.map(p => {
            if (p.id === 'proj-mju-solomap' || p.title.includes('혼밥지도')) {
              return {
                ...solomapProj,
                ...p,
                title: p.title || '혼밥지도 - 명지대학교 인문캠퍼스',
                githubUrl: p.githubUrl || solomapProj.githubUrl || 'https://github.com/peach20040909/mju-solomap',
                demoUrl: p.demoUrl || solomapProj.demoUrl || 'https://mju-solomap.onrender.com/',
                semester: '2학년 2학기',
                period: p.period || '2026.09 - 2026.12',
                role: p.role || '기획 및 개발 (개인)',
                teamType: p.teamType || '개인',
                techStack: (p.techStack && p.techStack.length > 0) ? p.techStack : ['JavaScript', 'CSS', 'HTML', 'TypeScript', 'Leaflet', 'Render'],
                summary: p.summary || solomapProj.summary,
                problemDescription: p.problemDescription || solomapProj.problemDescription,
                solutionDescription: p.solutionDescription || solomapProj.solutionDescription,
                resultDescription: p.resultDescription || solomapProj.resultDescription,
                keyFeatures: (p.keyFeatures && p.keyFeatures.length > 0) ? p.keyFeatures : solomapProj.keyFeatures,
                starBullets: (p.starBullets && p.starBullets.length > 0) ? p.starBullets : solomapProj.starBullets,
                troubleshootingStory: p.troubleshootingStory || solomapProj.troubleshootingStory
              };
            }
            return p;
          });
        }

        // Ensure the HMK project is present
        const hasHmk = parsed.some(p => p.id === 'proj-hmk-2026' || p.title.includes('한만큼'));
        if (!hasHmk) {
          const hmkProj = initialProjects.find(p => p.id === 'proj-hmk-2026');
          if (hmkProj) {
            parsed = [hmkProj, ...parsed];
          }
        }

        // Clean semester labels (remove '예정/진행중' suffix)
        parsed = parsed.map(p => {
          if (p.semester && (p.semester.includes('예정') || p.semester.includes('진행'))) {
            return { ...p, semester: '2학년 2학기' };
          }
          return p;
        });

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
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS) || localStorage.getItem('jmj_archive_skills_v7') || localStorage.getItem('jmj_archive_skills_v6');
    return saved ? JSON.parse(saved) : initialTechSkills;
  });

  const [devLogs, setDevLogs] = useState<DevLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS) || localStorage.getItem('jmj_archive_logs_v7') || localStorage.getItem('jmj_archive_logs_v6');
    if (saved) {
      try {
        let parsed: DevLog[] = JSON.parse(saved);
        // Make sure the SoloMap log is present
        const hasSolomapLog = parsed.some(l => l.id === 'log-mju-solomap' || l.title.includes('혼밥지도'));
        if (!hasSolomapLog) {
          const soloLog = initialDevLogs.find(l => l.id === 'log-mju-solomap');
          if (soloLog) parsed = [soloLog, ...parsed];
        }
        // Make sure the new HMK log is present
        const hasHmkLog = parsed.some(l => l.id === 'log-hmk-2026' || l.title.includes('한만큼'));
        if (!hasHmkLog) {
          const hmkLog = initialDevLogs.find(l => l.id === 'log-hmk-2026');
          if (hmkLog) parsed = [hmkLog, ...parsed];
        }
        // Make sure the Spotify-Wikidata log is present
        const hasSpotifyLog = parsed.some(l => l.id === 'log-spotify-kopis-matching' || l.title.includes('Spotify-KOPIS'));
        if (!hasSpotifyLog) {
          const newLog = initialDevLogs.find(l => l.id === 'log-spotify-kopis-matching');
          if (newLog) parsed = [...parsed, newLog];
        }
        return parsed;
      } catch (e) {
        return initialDevLogs;
      }
    }
    return initialDevLogs;
  });

  const [coverLetters, setCoverLetters] = useState<CoverLetterItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COVER_LETTERS) || localStorage.getItem('jmj_archive_coverletters_v7') || localStorage.getItem('jmj_archive_coverletters_v6');
    if (saved) {
      try {
        let parsed: CoverLetterItem[] = JSON.parse(saved);
        // Make sure the HMK cover letter is present
        const hasHmkCl = parsed.some(c => c.id === 'cl-hmk-2026' || c.question.includes('한만큼') || c.question.includes('피벗'));
        if (!hasHmkCl) {
          const hmkCl = initialCoverLetters.find(c => c.id === 'cl-hmk-2026');
          if (hmkCl) parsed = [hmkCl, ...parsed];
        }
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
      <div className="space-y-10 py-8">
        
        {/* Section 1: Featured Projects (Full 3-Column Grid) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4 text-zinc-900" />
              <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                대표 프로젝트 ({featuredProjs.length})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-zinc-600 hover:text-zinc-900 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>전체 프로젝트 보기 ({projects.length}개)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjs.map(project => (
              <div
                key={project.id}
                onClick={() => setActiveTab('projects')}
                className="p-5 rounded-xl bg-white border border-zinc-200/80 hover:border-zinc-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">{project.period}</span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {project.title}
                  </h4>

                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-zinc-50 text-zinc-600 text-[11px] font-mono border border-zinc-200/60">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-zinc-400 self-center font-medium">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                    <span className="text-[11px] font-medium text-zinc-400">{project.role}</span>
                    <span className="text-[11px] text-indigo-600 font-semibold group-hover:underline flex items-center space-x-0.5">
                      <span>상세보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 2-Column Grid (Engineering DevLogs & Core Skills) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: DevLogs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquareCode className="w-4 h-4 text-zinc-900" />
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                  최근 트러블슈팅 & 엔지니어링 일지
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('logs')}
                className="text-xs text-zinc-600 hover:text-zinc-900 font-medium flex items-center space-x-1 transition-colors"
              >
                <span>전체보기 ({devLogs.length}편)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {devLogs.slice(0, 3).map(log => {
                const linkedProj = projects.find(p => p.id === log.linkedProjectId);
                return (
                  <div
                    key={log.id}
                    onClick={() => setActiveTab('logs')}
                    className="p-4 rounded-xl bg-white border border-zinc-200/80 hover:border-zinc-300 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                          {log.category}
                        </span>
                        {linkedProj && (
                          <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                            • {linkedProj.title}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">{log.date}</span>
                    </div>

                    <h4 className="font-bold text-zinc-900 text-xs group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {log.title}
                    </h4>

                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                      {log.content.replace(/[#*`]/g, '')}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {log.tags.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-50 text-zinc-500 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Core Tech Skills & Solved.ac (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-zinc-900" />
                <h3 className="text-base font-bold text-zinc-900 tracking-tight">핵심 기술 스택</h3>
              </div>
              <button
                onClick={() => setActiveTab('skills')}
                className="text-xs text-zinc-600 hover:text-zinc-900 font-medium flex items-center space-x-1 transition-colors"
              >
                <span>매트릭스 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tech Stack List */}
            <div className="p-4 rounded-xl bg-white border border-zinc-200/80 space-y-2.5">
              <div className="space-y-2">
                {featuredSkills.slice(0, 5).map(skill => (
                  <div
                    key={skill.id}
                    onClick={() => setActiveTab('skills')}
                    className="p-2.5 rounded-lg bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/60 transition-colors cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-900 text-xs">{skill.name}</span>
                      <span className="text-[11px] font-mono text-zinc-500">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-zinc-200/70 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-zinc-800 h-full rounded-full transition-all"
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solved.ac Stats Card */}
            <div className="p-4 rounded-xl bg-zinc-900 text-white space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">알고리즘 & CS 문제 해결</span>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[11px] font-mono font-bold">
                  {profile.solvedAcTier}
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold tracking-tight">{profile.solvedCount}</span>
                <span className="text-xs text-zinc-400">문제 해결 완료</span>
              </div>
            </div>

            {/* Quick Action to AI Cover Letter */}
            <div 
              onClick={() => setActiveTab('coverletter')}
              className="p-4 rounded-xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all cursor-pointer flex items-center justify-between group shadow-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5">
                  <FileEdit className="w-3.5 h-3.5 text-zinc-700" />
                  <h4 className="font-semibold text-zinc-900 text-xs group-hover:text-indigo-600 transition-colors">
                    AI 자기소개서 & 면접 질문 대비
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-500">
                  프로젝트 경험 기반 {coverLetters.length}건 작성 및 관리 중
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>

          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col antialiased">
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <>
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
            {renderDashboardOverview()}
          </>
        )}

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

      {/* Clean Footer */}
      <footer className="mt-16 border-t border-zinc-200/80 bg-white py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-zinc-800">
            JMJ_Archive • 장민준 개발자 포트폴리오 & 직무 아카이브
          </p>
          <p className="text-zinc-400">
            GitHub 연동 프로젝트 아카이브, STAR 기법 성과 분석, 기술 스택 매트릭스, AI 자기소개서
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
