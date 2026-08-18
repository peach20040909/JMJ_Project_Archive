import React, { useState } from 'react';
import { 
  Cpu, 
  Plus, 
  Code2, 
  Server, 
  Database, 
  Layers, 
  Sparkles, 
  Edit, 
  Trash2, 
  Check, 
  Star
} from 'lucide-react';
import { TechSkill } from '../types';

interface TechStackMatrixProps {
  skills: TechSkill[];
  onAddSkill: (skill: TechSkill) => void;
  onUpdateSkill: (skill: TechSkill) => void;
  onDeleteSkill: (id: string) => void;
}

export const TechStackMatrix: React.FC<TechStackMatrixProps> = ({
  skills,
  onAddSkill,
  onUpdateSkill,
  onDeleteSkill
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkill, setEditingSkill] = useState<TechSkill | null>(null);
  const [formData, setFormData] = useState<Partial<TechSkill>>({
    name: '',
    category: 'Languages',
    level: 'Competent (과제/프로젝트 구현)',
    score: 80,
    experience: '',
    featured: true
  });

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database & Infra', 'CS Fundamentals'];

  const filteredSkills = skills.filter(s => {
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  const handleOpenAdd = () => {
    setFormData({
      id: `skill-${Date.now()}`,
      name: '',
      category: 'Languages',
      level: 'Competent (과제/프로젝트 구현)',
      score: 80,
      experience: '',
      featured: false
    });
    setEditingSkill(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (skill: TechSkill) => {
    setFormData({ ...skill });
    setEditingSkill(skill);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('기술명을 입력해주세요.');
      return;
    }

    const skillToSave: TechSkill = {
      id: formData.id || `skill-${Date.now()}`,
      name: formData.name,
      category: formData.category || 'Languages',
      level: formData.level || 'Competent (과제/프로젝트 구현)',
      score: Number(formData.score) || 75,
      experience: formData.experience || '',
      featured: !!formData.featured
    };

    if (editingSkill) {
      onUpdateSkill(skillToSave);
    } else {
      onAddSkill(skillToSave);
    }
    setIsEditing(false);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Languages':
        return <Code2 className="w-4 h-4 text-indigo-400" />;
      case 'Frontend':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Database & Infra':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'CS Fundamentals':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getLevelColor = (score: number) => {
    if (score >= 85) return 'from-indigo-500 to-emerald-400';
    if (score >= 75) return 'from-sky-500 to-indigo-500';
    return 'from-amber-500 to-sky-500';
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">기술 스택 & 역량 매트릭스</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 font-mono border border-slate-700">
              {skills.length}개 스택
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            프로그래밍 언어, 백엔드/프론트엔드 프레임워크, 데이터베이스, CS 핵심 역량 숙련도
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>새 기술 스택 추가</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto scrollbar-none p-1.5 rounded-xl bg-slate-900 border border-slate-800">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {cat !== 'All' && getCategoryIcon(cat)}
            <span>{cat === 'All' ? '전체 보기' : cat}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              {/* Header: Name, Category, Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                      <span>{skill.name}</span>
                      {skill.featured && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      )}
                    </h4>
                    <span className="text-xs text-slate-400">{skill.category}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1 text-slate-400 hover:text-slate-200"
                    title="수정"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`'${skill.name}' 기술을 삭제하시겠습니까?`)) {
                        onDeleteSkill(skill.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Score Bar & Level */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{skill.level}</span>
                  <span className="font-mono text-sky-400 font-bold">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/60">
                  <div
                    className={`bg-gradient-to-r ${getLevelColor(skill.score)} h-full rounded-full`}
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Experience / Description */}
              {skill.experience && (
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {skill.experience}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 text-slate-100 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-sky-400" />
                <span>{editingSkill ? '기술 스택 수정' : '새 기술 스택 추가'}</span>
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
                <label className="block text-slate-300 mb-1 font-medium">기술명 *</label>
                <input
                  type="text"
                  placeholder="예: Java, Spring Boot, React, MySQL..."
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">분야 / 카테고리</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Languages">Languages (언어)</option>
                  <option value="Frontend">Frontend (프론트엔드)</option>
                  <option value="Backend">Backend (백엔드)</option>
                  <option value="Database & Infra">Database & Infra (데이터베이스/인프라)</option>
                  <option value="CS Fundamentals">CS Fundamentals (컴퓨터과학 기본기)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">숙련도 수준 (Level)</label>
                <select
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Familiar (기초 문법)">Familiar (기초 문법 및 튜토리얼 이해)</option>
                  <option value="Competent (과제/프로젝트 구현)">Competent (과제 및 프로젝트 핵심 기능 구현)</option>
                  <option value="Proficient (아키텍처/최적화)">Proficient (아키텍처 설계, 동시성, 성능 최적화)</option>
                  <option value="Expert">Expert (심화 튜닝 및 라이브러리 내부 원리 이해)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-300 font-medium">자신감 점수 (Score: {formData.score}%)</label>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={formData.score || 75}
                  onChange={e => setFormData({ ...formData, score: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">경험 및 역량 설명</label>
                <textarea
                  rows={3}
                  placeholder="예: Spring Data JPA를 사용한 동시성 제어 및 REST API 설계 경험..."
                  value={formData.experience || ''}
                  onChange={e => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredSkillCheck"
                  checked={!!formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="featuredSkillCheck" className="text-sm font-medium text-slate-300 cursor-pointer">
                  주요 핵심 기술(Featured)로 설정
                </label>
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
                className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold"
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
