import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  X, 
  Loader2, 
  RefreshCw,
  FolderGit2,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, ProjectItem, TechSkill } from '../types';

interface AiCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  projects: ProjectItem[];
  skills: TechSkill[];
}

export const AiCoachModal: React.FC<AiCoachModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  skills
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerateAdvice = async () => {
    setIsLoading(true);
    try {
      const projectSummaries = projects.map(p => `${p.title} (${p.category} | ${p.techStack.join(', ')})`);
      const skillNames = skills.map(s => `${s.name} (${s.level})`);

      const res = await fetch('/api/ai/semester-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          targetRole: profile.targetRole,
          currentProjects: projectSummaries,
          skills: skillNames
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback(data);
      } else {
        alert('AI 조언을 생성하지 못했습니다.');
      }
    } catch (err) {
      alert('AI 조언 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                AI 포트폴리오 & 커리어 코치
              </h2>
              <p className="text-xs text-slate-500">
                {profile.name}님의 프로젝트 아카이브 진단 및 취업 대비 빌드업 전략
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {!feedback && !isLoading && (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-bold text-slate-900 text-base">
                  현재 프로젝트 아카이브 진단 & 킬러 스펙 제안
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  등록된 {projects.length}개 프로젝트와 기술 스택을 종합 분석하여, 네이버/카카오/토스 등 주요 IT 기업 개발자 채용에서 서류 및 면접 합격률을 높일 차기 전략을 제안합니다.
                </p>
              </div>

              <button
                onClick={handleGenerateAdvice}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center space-x-2 mx-auto shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI 포트폴리오 전략 분석하기</span>
              </button>
            </div>
          )}

          {isLoading && (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                {profile.name}님의 프로젝트 아카이브를 AI가 정밀 분석하고 있습니다...
              </p>
              <p className="text-xs text-slate-400">
                목표 직무({profile.targetRole})에 최적화된 아키텍처 및 트러블슈팅 포인트를 탐색합니다.
              </p>
            </div>
          )}

          {feedback && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Summary Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50 border border-indigo-100 text-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  포트폴리오 역량 총평
                </span>
                <p className="text-sm font-semibold leading-relaxed text-slate-900">
                  {feedback.semesterSummary}
                </p>
              </div>

              {/* Suggested Main Project */}
              {feedback.suggestedNextProject && (
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                  <div className="flex items-center space-x-2">
                    <FolderGit2 className="w-5 h-5 text-amber-600" />
                    <h4 className="font-bold text-slate-900 text-sm">
                      추천 킬러 프로젝트 주제
                    </h4>
                  </div>

                  <div>
                    <h5 className="font-bold text-indigo-700 text-base">
                      {feedback.suggestedNextProject.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {feedback.suggestedNextProject.reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {feedback.suggestedNextProject.techStack?.map((t: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 text-xs font-mono font-semibold border border-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {feedback.recommendations && feedback.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Target className="w-4 h-4 text-indigo-600" />
                    <span>분야별 역량 강화 전략</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {feedback.recommendations.map((rec: any, i: number) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-indigo-600 block">
                          {rec.category}
                        </span>
                        <h5 className="font-bold text-slate-900 text-xs">{rec.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed">{rec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CS / Troubleshooting Focus Tips */}
              {feedback.csFocusTips && (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                  <span className="font-bold text-emerald-800 flex items-center space-x-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>면접관 어필 포인트:</span>
                  </span>
                  <p className="text-slate-700 leading-relaxed">{feedback.csFocusTips}</p>
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleGenerateAdvice}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>새로 분석하기</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
