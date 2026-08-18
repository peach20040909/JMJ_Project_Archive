import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  TrendingUp, 
  Lightbulb, 
  BookOpen, 
  FolderGit2, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  ArrowRight,
  Flame
} from 'lucide-react';
import { UserProfile, ProjectItem, CourseworkSubject, SemesterGoal } from '../types';

interface AiCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  projects: ProjectItem[];
  courseworks: CourseworkSubject[];
  goals: SemesterGoal[];
}

export const AiCoachModal: React.FC<AiCoachModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  courseworks,
  goals
}) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const completedCourses = courseworks
    .filter(c => c.semester !== '2학년 2학기 (수강예정)')
    .map(c => c.name);

  const upcomingCourses = courseworks
    .filter(c => c.semester === '2학년 2학기 (수강예정)')
    .map(c => c.name);

  const goalTitles = goals.map(g => g.title);

  const fetchAiFeedback = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/semester-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          targetRole: profile.targetRole,
          completedCourses,
          upcomingCourses,
          currentProjects: projects.map(p => ({ title: p.title, category: p.category, techStack: p.techStack })),
          goals: goalTitles
        })
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(data);
      } else {
        setError(data.error || '피드백 생성에 실패했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setError('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !feedback && !loading) {
      fetchAiFeedback();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl text-slate-100 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-indigo-950/80 via-purple-950/50 to-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-400 p-[2px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                <span>2학년 2학기 맞춤형 AI 커리어 전략 코치</span>
              </h2>
              <p className="text-xs text-indigo-300">
                소프트웨어학과 2학년을 위한 CS 심화 & 포트폴리오 빌드업 로드맵
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchAiFeedback}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="피드백 다시 생성"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base">2학년 2학기 포트폴리오 전략 분석 중...</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {profile.name}님의 기이수 과목({completedCourses.length}개), 2-2학기 수강 과목({upcomingCourses.length}개), 등록 프로젝트({projects.length}개)를 종합 진단하고 있습니다.
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center space-y-3">
              <p>{error}</p>
              <button
                onClick={fetchAiFeedback}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                다시 시도하기
              </button>
            </div>
          ) : feedback ? (
            <div className="space-y-6">
              
              {/* Semester Summary Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span>2학년 2학기 포트폴리오 전략 총평</span>
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                  {feedback.semesterSummary}
                </p>
              </div>

              {/* Recommendations 3 Action Items */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-base flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>2학기 핵심 실천 전략 (Action Plans)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {feedback.recommendations?.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-2.5"
                    >
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-indigo-400 uppercase">
                          {rec.category}
                        </span>
                        <h5 className="font-bold text-white text-xs sm:text-sm leading-snug">
                          {rec.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                          {rec.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Next Project Banner */}
              {feedback.suggestedNextProject && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/50 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <FolderGit2 className="w-4 h-4" />
                      <span>2학년 2학기 추천 메인 프로젝트 주제</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      High-Impact
                    </span>
                  </div>

                  <div>
                    <h5 className="text-base font-extrabold text-white">
                      {feedback.suggestedNextProject.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {feedback.suggestedNextProject.reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {feedback.suggestedNextProject.techStack?.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-slate-800 text-emerald-300 text-xs font-mono border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CS Focus Tips */}
              {feedback.csFocusTips && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm space-y-1.5">
                  <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-xs">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>2-2학기 전공 이론(OS, DB, 알고리즘) 포트폴리오 연계 팁</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {feedback.csFocusTips}
                  </p>
                </div>
              )}

            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs">
          <span className="text-slate-500">Gemini 3.7 Flash AI 기반 분석</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
