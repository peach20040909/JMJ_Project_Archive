import React, { useState } from 'react';
import { 
  Cpu, 
  Plus, 
  Star, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Layers,
  Code,
  Server,
  Database,
  Terminal
} from 'lucide-react';
import { TechSkill } from '../types';

interface TechStackMatrixProps {
  skills: TechSkill[];
  onAddSkill: (s: TechSkill) => void;
  onUpdateSkill: (s: TechSkill) => void;
  onDeleteSkill: (id: string) => void;
}

const CATEGORIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Database & Infra',
  'CS Fundamentals'
] as const;

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<TechSkill>>({
    name: '',
    category: 'Backend',
    level: 'Competent (과제/프로젝트 구현)',
    score: 80,
    experience: '',
    featured: true
  });

  const filteredSkills = skills.filter(s => 
    selectedCat === 'All' || s.category === selectedCat
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Backend',
      level: 'Competent (과제/프로젝트 구현)',
      score: 80,
      experience: '',
      featured: true
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (s: TechSkill) => {
    setEditingId(s.id);
    setFormData(s);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('기술명을 입력해주세요.');
      return;
    }

    if (editingId) {
      onUpdateSkill({
        ...(formData as TechSkill),
        id: editingId
      });
    } else {
      const newSkill: TechSkill = {
        ...(formData as TechSkill),
        id: `skill-${Date.now()}`
      };
      onAddSkill(newSkill);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>기술 스택 & 역량 매트릭스</span>
            <span className="px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 text-xs font-bold border border-violet-200">
              총 {skills.length}개 기술
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            프로그래밍 언어, 프레임워크, CS 기초 역량의 숙련도와 실제 적용 프로젝트 경험을 수치화합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>기술 스택 추가</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              selectedCat === cat
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-violet-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold text-slate-900">{skill.name}</span>
                  {skill.featured && (
                    <span title="대표 기술">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`'${skill.name}' 기술을 삭제하시겠습니까?`)) {
                        onDeleteSkill(skill.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-violet-50 text-violet-700 font-semibold border border-violet-100">
                  {skill.category}
                </span>
                <span className="font-mono text-slate-600 font-bold">{skill.score}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-violet-500 to-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${skill.score}%` }}
                ></div>
              </div>

              <div className="text-xs font-semibold text-slate-700">
                {skill.level}
              </div>

              {skill.experience && (
                <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {skill.experience}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? '기술 스택 수정' : '새 기술 스택 추가'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700">기술/언어/도구명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="예: Java / Spring Boot"
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="Languages">Languages</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database & Infra">Database & Infra</option>
                    <option value="CS Fundamentals">CS Fundamentals</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">숙련도 레벨</label>
                  <select
                    value={formData.level}
                    onChange={e => setFormData({ ...formData, level: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="Familiar (기초 문법)">Familiar (기초 문법)</option>
                    <option value="Competent (과제/프로젝트 구현)">Competent (과제/구현)</option>
                    <option value="Proficient (아키텍처/최적화)">Proficient (최적화/설계)</option>
                    <option value="Expert">Expert (마스터)</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700">
                  <span>자신감 점수</span>
                  <span className="text-violet-600 font-mono">{formData.score}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={formData.score}
                  onChange={e => setFormData({ ...formData, score: Number(e.target.value) })}
                  className="w-full mt-2 accent-violet-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">실제 구현 및 활용 경험</label>
                <textarea
                  value={formData.experience || ''}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  rows={3}
                  placeholder="예: RESTful API 서버 구축, JPA N+1 최적화 및 비관적 락 적용"
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-skill"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-violet-600 accent-violet-600"
                />
                <label htmlFor="featured-skill" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  대표 기술 스택으로 강조 (Featured)
                </label>
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
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold flex items-center space-x-1 shadow-sm"
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
