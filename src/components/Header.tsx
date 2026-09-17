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
    { id: 'projects', label: '프로젝트', icon: FolderGit2 },
    { id: 'coverletter', label: '자기소개서', icon: FileEdit },
    { id: 'skills', label: '기술 스택', icon: Cpu },
    { id: 'logs', label: '트러블슈팅', icon: MessageSquareCode },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none flex-shrink-0" 
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-xs">
              JMJ
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-zinc-900 text-sm sm:text-base tracking-tight whitespace-nowrap">
                {profile.name}
              </span>
              <span className="hidden lg:inline-block text-xs text-zinc-300 font-normal">
                |
              </span>
              <span className="hidden lg:inline-block text-xs font-medium text-zinc-500 whitespace-nowrap">
                {profile.targetRole || 'Software Engineer'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items - Never Wrap, Always Single Line */}
          <nav className="hidden lg:flex items-center p-1 bg-zinc-100/90 rounded-xl border border-zinc-200/80 flex-shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all select-none ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-zinc-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            {/* Auto-Save Subtle Indicator */}
            <div 
              className="hidden xl:flex items-center space-x-1.5 px-2 py-1 text-xs text-zinc-500"
              title="데이터 변경 시 자동 저장됩니다"
            >
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-3 h-3 text-amber-500 animate-spin flex-shrink-0" />
                  <span className="text-[11px] text-amber-600 font-medium whitespace-nowrap">저장 중</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-[11px] text-zinc-500 whitespace-nowrap">{lastSavedText}</span>
                </>
              )}
            </div>

            {/* GitHub Auto Import */}
            <button
              onClick={onOpenGitHubImport}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
              title="GitHub 링크로 프로젝트 등록"
            >
              <Github className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">GitHub 등록</span>
            </button>

            {/* AI Coach */}
            <button
              onClick={onOpenAiCoach}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200/70 transition-colors whitespace-nowrap"
              title="AI 포트폴리오 코치"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">AI 코치</span>
            </button>

            {/* Public Portfolio Visitor Mode */}
            <button
              onClick={() => setIsPublicView(!isPublicView)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold border border-zinc-200/80 transition-colors whitespace-nowrap"
              title="채용담당자용 공개 뷰 전환"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">공개 뷰</span>
            </button>

            {/* Export / Backup */}
            <button
              onClick={onOpenExport}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors flex-shrink-0"
              title="데이터 백업 및 Markdown 내보내기"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Medium & Mobile Navigation Tabs */}
        <nav className="flex lg:hidden space-x-1 overflow-x-auto scrollbar-none py-2 border-t border-zinc-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 select-none ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
