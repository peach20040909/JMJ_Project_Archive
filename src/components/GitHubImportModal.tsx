import React, { useState } from 'react';
import { 
  Github, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  Loader2, 
  FolderGit2, 
  Layers, 
  Calendar, 
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';
import { ProjectItem } from '../types';

interface GitHubImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (project: ProjectItem) => void;
  targetRole?: string;
}

export const GitHubImportModal: React.FC<GitHubImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
  targetRole = "Fullstack & Backend Software Engineer"
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzedProject, setAnalyzedProject] = useState<ProjectItem | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setError('GitHub 저장소 링크를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalyzedProject(null);

    try {
      const res = await fetch('/api/github/import-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, targetRole })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || '저장소 분석 중 오류가 발생했습니다.');
      }

      setAnalyzedProject(data.project);
    } catch (err: any) {
      setError(err.message || '저장소 분석에 실패했습니다. 올바른 공개 GitHub 링크인지 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (analyzedProject) {
      onImportSuccess(analyzedProject);
      onClose();
      // Reset state
      setRepoUrl('');
      setAnalyzedProject(null);
      setError(null);
    }
  };

  const handleSampleClick = (sample: string) => {
    setRepoUrl(sample);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>GitHub 저장소 링크로 포트폴리오 자동 등록</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">AI 자동분석</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                GitHub 링크만 입력하면 README와 기술스택을 AI가 분석하여 완성형 포트폴리오로 등록합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Input Form */}
          <form onSubmit={handleAnalyze} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              GitHub 저장소 주소 (URL)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Github className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="예: https://github.com/username/my-project 또는 owner/repo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 flex-shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>AI 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>자동 분석하기</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Links */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
              <span>예시 저장소:</span>
              <button
                type="button"
                onClick={() => handleSampleClick('https://github.com/minsu-dev/campus-mate-backend')}
                className="text-indigo-600 hover:text-indigo-800 underline font-medium"
              >
                CampusMate 백엔드
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleSampleClick('https://github.com/facebook/react')}
                className="text-indigo-600 hover:text-indigo-800 underline font-medium"
              >
                React Repo
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading Animation Card */}
          {isLoading && (
            <div className="p-8 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">GitHub 소스코드 및 README 분석 중</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  저장소 언어, 커밋 내역, 주요 아키텍처를 파악하여 STAR 이력서 및 트러블슈팅 스토리로 구조화하고 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Analyzed Project Preview Card */}
          {analyzedProject && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200">
                    {analyzedProject.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{analyzedProject.period}</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>분석 완료</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{analyzedProject.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{analyzedProject.summary}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">추출된 기술 스택:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analyzedProject.techStack.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs font-mono border border-slate-200 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAR Bullets Preview */}
              {analyzedProject.starBullets && analyzedProject.starBullets.length > 0 && (
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                  <span className="font-bold text-indigo-700 block">AI 생성 STAR 이력서 요약:</span>
                  {analyzedProject.starBullets.map((b, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed">• {b}</p>
                  ))}
                </div>
              )}

              {/* Features Preview */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">핵심 기능:</span>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                  {analyzedProject.keyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-semibold text-xs transition-colors"
          >
            취소
          </button>

          {analyzedProject && (
            <button
              onClick={handleConfirmAdd}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>포트폴리오에 자동 등록하기</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
