import React from 'react';
import { 
  FolderGit2, 
  Cpu, 
  MessageSquareCode, 
  Sparkles, 
  Eye, 
  Download, 
  LayoutDashboard,
  Github,
  FileEdit,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPublicView: boolean;
  setIsPublicView: (val: boolean) => void;
  onOpenAiCoach: () => void;
  onOpenExport: () => void;
  onOpenGitHubImport: () => void;
  profile: UserProfile;
  saveStatus?: 'saved' | 'saving' | 'idle';
  lastSavedText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isPublicView,
  setIsPublicView,
  onOpenAiCoach,
  onOpenExport,
  onOpenGitHubImport,
  profile,
  saveStatus = 'saved',
  lastSavedText = '자동 저장됨'
}) => {
  const navItems = [
    { id: 'overview', label: '대시보드', icon: LayoutDashboard },
    { id: 'projects', label: '프로젝트 아카이브', icon: FolderGit2 },
    { id: 'coverletter', label: 'AI 자기소개서 작성', icon: FileEdit },
    { id: 'skills', label: '기술 스택 매트릭스', icon: Cpu },
    { id: 'logs', label: '트러블슈팅 일지', icon: MessageSquareCode },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-indigo-600/20">
              JMJ
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  JMJ_Archive
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200/80">
                  Portfolio & Job Prep
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {profile.university} {profile.department} • {profile.name}
              </p>
            </div>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center space-x-2">
            
            {/* Auto-Save Status Badge */}
            <div 
              className={`hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                saveStatus === 'saving' 
                  ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
              }`}
              title="데이터 변경 시 브라우저 및 서버 파일로 자동 실시간 저장됩니다"
            >
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                  <span>저장 중...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{lastSavedText}</span>
                </>
              )}
            </div>

            {/* GitHub Auto Import Button */}
            <button
              onClick={onOpenGitHubImport}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
              title="GitHub 링크로 프로젝트 자동 등록"
            >
              <Github className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">GitHub 자동 등록</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </button>

            {/* AI Coach Button */}
            <button
              onClick={onOpenAiCoach}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">AI 포트폴리오 코치</span>
            </button>

            {/* Public Portfolio Visitor Mode */}
            <button
              onClick={() => setIsPublicView(!isPublicView)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">공개 뷰</span>
            </button>

            {/* Export / Backup */}
            <button
              onClick={onOpenExport}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="데이터 백업 및 Markdown 내보내기"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto scrollbar-none py-1.5 border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
