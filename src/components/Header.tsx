import React from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  Eye, 
  FileText, 
  Download, 
  RotateCcw, 
  Github, 
  BookOpen, 
  Layers, 
  Target, 
  Cpu, 
  MessageSquareCode
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPublicView: boolean;
  setIsPublicView: (val: boolean) => void;
  onOpenAiCoach: () => void;
  onOpenExport: () => void;
  profile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isPublicView,
  setIsPublicView,
  onOpenAiCoach,
  onOpenExport,
  profile
}) => {
  const navItems = [
    { id: 'overview', label: '대시보드', icon: Layers },
    { id: 'projects', label: '프로젝트 아카이브', icon: FolderGit2 },
    { id: 'coursework', label: '전공 교과목 & 과제', icon: BookOpen },
    { id: 'skills', label: '기술 스택', icon: Cpu },
    { id: 'roadmap', label: '2-2학기 목표 & 로드맵', icon: Target },
    { id: 'logs', label: '트러블슈팅 & 개발일지', icon: MessageSquareCode },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Student Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 p-[2px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">DevArchive</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  {profile.department} 2학년
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {profile.name} ({profile.englishName}) • {profile.targetRole}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiCoach}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden xs:inline">AI 2학기 전략 코칭</span>
              <span className="xs:hidden">AI 코칭</span>
            </button>

            {/* Public View Toggle */}
            <button
              onClick={() => setIsPublicView(!isPublicView)}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
                isPublicView 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
              title={isPublicView ? '관리자 모드로 전환' : '공개용 포트폴리오 웹 뷰 미리보기'}
            >
              {isPublicView ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">아카이브 관리 모드</span>
                  <span className="sm:hidden">편집모드</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">공개 포트폴리오 뷰</span>
                  <span className="sm:hidden">공개 뷰</span>
                </>
              )}
            </button>

            {/* Export & Backup */}
            <button
              onClick={onOpenExport}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
              title="데이터 백업 및 포트폴리오 내보내기"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Only in Archive Mode) */}
        {!isPublicView && (
          <div className="flex space-x-1 overflow-x-auto scrollbar-none py-2 border-t border-slate-800/60">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
