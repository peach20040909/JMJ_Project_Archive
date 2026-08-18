import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  AlertTriangle,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SemesterGoal } from '../types';

interface SemesterRoadmapProps {
  goals: SemesterGoal[];
  onAddGoal: (g: SemesterGoal) => void;
  onUpdateGoal: (g: SemesterGoal) => void;
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<SemesterGoal>>({
    title: '',
    category: '주력 프로젝트',
    targetDate: '2026.11.30',
    progress: 20,
    isCompleted: false,
    priority: 'High',
    milestones: [{ id: 'm1', text: '프로젝트 기획 및 요구사항 정의', done: false }]
  });

  const [newMilestoneText, setNewMilestoneText] = useState('');

  const overallProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0;

  // Toggle milestone checkbox
  const handleToggleMilestone = (goal: SemesterGoal, milestoneId: string) => {
    const updatedMilestones = goal.milestones.map(m => 
      m.id === milestoneId ? { ...m, done: !m.done } : m
    );

    const completedCount = updatedMilestones.filter(m => m.done).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
    const isCompleted = newProgress === 100;

    if (isCompleted && !goal.isCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    onUpdateGoal({
      ...goal,
      milestones: updatedMilestones,
      progress: newProgress,
      isCompleted
    });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: '주력 프로젝트',
      targetDate: '2026.11.30',
      progress: 0,
      isCompleted: false,
      priority: 'High',
      milestones: [{ id: `m-${Date.now()}`, text: '첫 번째 세부 실행 과제', done: false }]
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (g: SemesterGoal) => {
    setEditingId(g.id);
    setFormData(g);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('목표 제목을 입력해주세요.');
      return;
    }

    if (editingId) {
      onUpdateGoal({
        ...(formData as SemesterGoal),
        id: editingId
      });
    } else {
      const newGoal: SemesterGoal = {
        ...(formData as SemesterGoal),
        id: `goal-${Date.now()}`
      };
      onAddGoal(newGoal);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>2학년 2학기 핵심 목표 & 로드맵</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              전체 진행률 {overallProgress}%
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            2학년 2학기 동안 달성할 주력 프로젝트 릴리즈, CS 전공 학점, 코딩테스트 마일스톤을 추적합니다.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenAiCoach}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold flex items-center space-x-1.5 border border-indigo-200"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI 로드맵 조언</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>목표 추가</span>
          </button>
        </div>
      </div>

      {/* Progress Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-orange-50/40 border border-amber-200/80 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-amber-900 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>2학기 로드맵 전체 달성도</span>
          </span>
          <span className="text-amber-800 font-mono text-sm">{overallProgress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Goal Cards List */}
      <div className="space-y-4">
        {goals.map(goal => (
          <div
            key={goal.id}
            className={`p-5 rounded-2xl border transition-all ${
              goal.isCompleted 
                ? 'bg-emerald-50/30 border-emerald-200 shadow-sm'
                : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
                    {goal.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>목표일: {goal.targetDate}</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    goal.priority === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {goal.priority}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{goal.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono font-bold text-amber-700">{goal.progress}%</span>
                <button
                  onClick={() => handleOpenEdit(goal)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`'${goal.title}' 목표를 삭제하시겠습니까?`)) {
                      onDeleteGoal(goal.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Milestones Checkbox List */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                세부 실행 마일스톤 ({goal.milestones.filter(m => m.done).length} / {goal.milestones.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {goal.milestones.map(m => (
                  <div
                    key={m.id}
                    onClick={() => handleToggleMilestone(goal, m.id)}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2.5 cursor-pointer transition-colors text-xs ${
                      m.done 
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {m.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                    <span className={m.done ? 'line-through text-slate-400' : ''}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Goal Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? '목표 수정' : '새 학기 목표 등록'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700">목표 제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 백준 골드 2 티어 달성 & 350문제 돌파"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
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
                  <label className="font-bold text-slate-700">목표 달성일</label>
                  <input
                    type="text"
                    value={formData.targetDate}
                    onChange={e => setFormData({ ...formData, targetDate: e.target.value })}
                    placeholder="2026.12.31"
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">우선순위</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Milestones in Form */}
              <div>
                <label className="font-bold text-slate-700">세부 마일스톤 리스트</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={newMilestoneText}
                    onChange={e => setNewMilestoneText(e.target.value)}
                    placeholder="예: 주 3회 DP 문제 풀이..."
                    className="flex-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newMilestoneText.trim()) {
                        setFormData({
                          ...formData,
                          milestones: [
                            ...(formData.milestones || []),
                            { id: `m-${Date.now()}`, text: newMilestoneText.trim(), done: false }
                          ]
                        });
                        setNewMilestoneText('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>

                <div className="space-y-1.5 mt-2">
                  {formData.milestones?.map((m, idx) => (
                    <div key={m.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-800 truncate mr-2">{m.text}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            milestones: formData.milestones?.filter((_, i) => i !== idx)
                          });
                        }}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center space-x-1 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>저장</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
