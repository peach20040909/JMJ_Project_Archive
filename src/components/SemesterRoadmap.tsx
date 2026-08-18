import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Flame, 
  Sparkles, 
  Edit, 
  Trash2, 
  Check, 
  TrendingUp,
  AlertTriangle,
  Award,
  ChevronRight
} from 'lucide-react';
import { SemesterGoal } from '../types';
import confetti from 'canvas-confetti';

interface SemesterRoadmapProps {
  goals: SemesterGoal[];
  onAddGoal: (goal: SemesterGoal) => void;
  onUpdateGoal: (goal: SemesterGoal) => void;
  onDeleteGoal: (id: string) => void;
  onOpenAiCoach: () => void;
}

export const SemesterRoadmap: React.FC<SemesterRoadmapProps> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onOpenAiCoach
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SemesterGoal | null>(null);

  const [formData, setFormData] = useState<Partial<SemesterGoal>>({
    title: '',
    category: '전공 학점',
    targetDate: '2026.12.20',
    progress: 0,
    priority: 'High',
    milestones: [
      { id: 'm1', text: '', done: false }
    ]
  });

  const categories = ['All', '전공 학점', '주력 프로젝트', '알고리즘/코테', '대회/해커톤', '기타'];

  const filteredGoals = goals.filter(g => {
    if (selectedCategory === 'All') return true;
    return g.category === selectedCategory;
  });

  const overallProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0;

  // Toggle milestone completion
  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;

    const nextMilestones = goal.milestones.map(m => {
      if (m.id === milestoneId) return { ...m, done: !m.done };
      return m;
    });

    const doneCount = nextMilestones.filter(m => m.done).length;
    const newProgress = nextMilestones.length > 0 
      ? Math.round((doneCount / nextMilestones.length) * 100)
      : goal.progress;

    if (newProgress === 100 && goal.progress < 100) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    onUpdateGoal({
      ...goal,
      milestones: nextMilestones,
      progress: newProgress,
      isCompleted: newProgress === 100
    });
  };

  const handleOpenAdd = () => {
    setFormData({
      id: `goal-${Date.now()}`,
      title: '',
      category: '주력 프로젝트',
      targetDate: '2026.11.30',
      progress: 0,
      priority: 'High',
      milestones: [
        { id: `m-${Date.now()}-1`, text: '기획 및 아키텍처 설계', done: false },
        { id: `m-${Date.now()}-2`, text: '핵심 기능 개발 및 배포', done: false }
      ]
    });
    setEditingGoal(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (goal: SemesterGoal) => {
    setFormData({ ...goal });
    setEditingGoal(goal);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title) {
      alert('목표 제목은 필수입니다.');
      return;
    }

    const validMilestones = (formData.milestones || [])
      .filter(m => m.text.trim() !== '')
      .map((m, idx) => ({
        id: m.id || `m-${Date.now()}-${idx}`,
        text: m.text,
        done: !!m.done
      }));

    const doneCount = validMilestones.filter(m => m.done).length;
    const calcProgress = validMilestones.length > 0 
      ? Math.round((doneCount / validMilestones.length) * 100)
      : (formData.progress || 0);

    const goalToSave: SemesterGoal = {
      id: formData.id || `goal-${Date.now()}`,
      title: formData.title,
      category: formData.category || '전공 학점',
      targetDate: formData.targetDate || '2026.12.20',
      progress: calcProgress,
      isCompleted: calcProgress === 100,
      priority: formData.priority || 'High',
      milestones: validMilestones.length > 0 ? validMilestones : [
        { id: `m-${Date.now()}-1`, text: '목표 착수 및 준비', done: false }
      ]
    };

    if (editingGoal) {
      onUpdateGoal(goalToSave);
    } else {
      onAddGoal(goalToSave);
    }
    setIsEditing(false);
  };

  const handleMilestoneTextChange = (idx: number, text: string) => {
    const next = [...(formData.milestones || [])];
    next[idx] = { ...next[idx], text };
    setFormData({ ...formData, milestones: next });
  };

  const handleAddMilestoneField = () => {
    const next = [...(formData.milestones || []), { id: `m-${Date.now()}`, text: '', done: false }];
    setFormData({ ...formData, milestones: next });
  };

  const handleRemoveMilestoneField = (idx: number) => {
    const next = (formData.milestones || []).filter((_, i) => i !== idx);
    setFormData({ ...formData, milestones: next });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Low':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">2학년 2학기 목표 & 마일스톤</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono border border-indigo-500/30">
              평균 달성률 {overallProgress}%
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            2-2학기 전공 학점 유지, 주력 프로젝트 릴리즈, 알고리즘 티어업, 대회 참가를 위한 단계별 실행 계획
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAiCoach}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI 로드맵 조언</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>새 목표 추가</span>
          </button>
        </div>
      </div>

      {/* Progress Overview Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/40 border border-indigo-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              2026 2학년 2학기 로드맵 진행도
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              총 {goals.length}개 핵심 목표 중 {goals.filter(g => g.progress === 100).length}개 완료
            </h3>
          </div>
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-mono">
            {overallProgress}%
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-3 overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto scrollbar-none p-1.5 rounded-xl bg-slate-900 border border-slate-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat === 'All' ? '전체 목표' : cat}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGoals.map(goal => (
          <div
            key={goal.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
                    {goal.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getPriorityBadge(goal.priority)}`}>
                    우선순위: {goal.priority}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(goal)}
                    className="p-1 text-slate-400 hover:text-slate-200"
                    title="수정"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`'${goal.title}' 목표를 삭제하시겠습니까?`)) {
                        onDeleteGoal(goal.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Target Date */}
              <div>
                <h4 className="text-base font-bold text-white tracking-tight leading-snug">
                  {goal.title}
                </h4>
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>목표 기한: {goal.targetDate}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">진행률</span>
                  <span className={`font-bold ${goal.progress === 100 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      goal.progress === 100
                        ? 'bg-emerald-400'
                        : 'bg-gradient-to-r from-indigo-500 to-sky-400'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Interactive Milestones Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  세부 마일스톤 체크리스트 ({goal.milestones.filter(m => m.done).length}/{goal.milestones.length})
                </span>
                <div className="space-y-1.5">
                  {goal.milestones.map(m => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(goal.id, m.id)}
                      className={`p-2 rounded-lg text-xs flex items-start space-x-2 cursor-pointer transition-colors ${
                        m.done
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-800'
                      }`}
                    >
                      <button className="flex-shrink-0 mt-0.5">
                        {m.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                      <span className={`leading-relaxed ${m.done ? 'line-through text-slate-400' : ''}`}>
                        {m.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Goal Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 text-slate-100 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>{editingGoal ? '목표 및 마일스톤 수정' : '새 학기 목표 등록'}</span>
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                닫기
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">목표 제목 *</label>
                <input
                  type="text"
                  placeholder="예: 2-2학기 전공 핵심(알고리즘, OS, DB) A+ 달성"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="전공 학점">전공 학점</option>
                    <option value="주력 프로젝트">주력 프로젝트</option>
                    <option value="알고리즘/코테">알고리즘/코테</option>
                    <option value="대회/해커톤">대회/해커톤</option>
                    <option value="자격증/어학">자격증/어학</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">우선순위</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="High">High (최우선)</option>
                    <option value="Medium">Medium (보통)</option>
                    <option value="Low">Low (보조)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">목표 완료 예정일 (Target Date)</label>
                <input
                  type="text"
                  placeholder="2026.12.20"
                  value={formData.targetDate || ''}
                  onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Milestones list */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-medium">세부 마일스톤 목록</label>
                  <button
                    type="button"
                    onClick={handleAddMilestoneField}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    + 마일스톤 추가
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.milestones || []).map((m, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={`마일스톤 ${idx + 1}`}
                        value={m.text}
                        onChange={e => handleMilestoneTextChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                      />
                      {(formData.milestones || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMilestoneField(idx)}
                          className="px-2 text-slate-400 hover:text-rose-400 text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
