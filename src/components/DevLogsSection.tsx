import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Plus, 
  Calendar, 
  Tag, 
  FolderGit2, 
  Edit, 
  Trash2, 
  ChevronRight,
  BookOpen,
  Search,
  Sparkles
} from 'lucide-react';
import { DevLog, ProjectItem } from '../types';
import Markdown from 'react-markdown';

interface DevLogsSectionProps {
  devLogs: DevLog[];
  projects: ProjectItem[];
  onAddLog: (log: DevLog) => void;
  onUpdateLog: (log: DevLog) => void;
  onDeleteLog: (id: string) => void;
}

export const DevLogsSection: React.FC<DevLogsSectionProps> = ({
  devLogs,
  projects,
  onAddLog,
  onUpdateLog,
  onDeleteLog
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingLog, setEditingLog] = useState<DevLog | null>(null);

  const [formData, setFormData] = useState<Partial<DevLog>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: '트러블슈팅',
    tags: [],
    content: '',
    linkedProjectId: ''
  });

  const [tagInput, setTagInput] = useState('');

  const categories = ['All', '트러블슈팅', '기술 학습 (TIL)', '학기 회고', '세미나/스터디'];

  const filteredLogs = devLogs.filter(log => {
    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      log.title.toLowerCase().includes(query) ||
      log.content.toLowerCase().includes(query) ||
      log.tags.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setFormData({
      id: `log-${Date.now()}`,
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: '트러블슈팅',
      tags: ['Spring Boot', '최적화'],
      content: '### 🔍 문제 정의\n\n### 🛠️ 해결 과정\n\n### 💡 배운 점',
      linkedProjectId: ''
    });
    setEditingLog(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (log: DevLog) => {
    setFormData({ ...log });
    setEditingLog(log);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      alert('제목과 본문은 필수입니다.');
      return;
    }

    const logToSave: DevLog = {
      id: formData.id || `log-${Date.now()}`,
      title: formData.title,
      date: formData.date || new Date().toISOString().split('T')[0],
      category: formData.category || '트러블슈팅',
      tags: formData.tags && formData.tags.length > 0 ? formData.tags : ['CS'],
      content: formData.content,
      linkedProjectId: formData.linkedProjectId || ''
    };

    if (editingLog) {
      onUpdateLog(logToSave);
    } else {
      onAddLog(logToSave);
    }
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const current = formData.tags || [];
    if (!current.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...current, tagInput.trim()] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (t: string) => {
    const current = formData.tags || [];
    setFormData({ ...formData, tags: current.filter(item => item !== t) });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">트러블슈팅 & 개발 회고 일지</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-mono border border-slate-700">
              {devLogs.length}편 기록
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            버그 해결 과정, 기술 학습 노트, 학기별 회고를 기록하여 성장 궤적을 증명합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>새 개발일지 작성</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="일지 제목, 태그, 본문 내용 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {cat === 'All' ? '전체 보기' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Log Posts List */}
      <div className="space-y-4">
        {filteredLogs.map(log => {
          const linkedProj = projects.find(p => p.id === log.linkedProjectId);

          return (
            <div
              key={log.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4"
            >
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {log.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{log.date}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white pt-0.5">{log.title}</h3>
                </div>

                <div className="flex items-center space-x-1 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEdit(log)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center space-x-1"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>수정</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`'${log.title}' 글을 삭제하시겠습니까?`)) {
                        onDeleteLog(log.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Linked Project tag if any */}
              {linkedProj && (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-950/40 text-indigo-300 text-xs border border-indigo-500/30">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>연계 프로젝트: {linkedProj.title}</span>
                </div>
              )}

              {/* Markdown Content */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 text-sm leading-relaxed">
                <div className="markdown-body">
                  <Markdown>{log.content}</Markdown>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {log.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs border border-slate-700/60 flex items-center space-x-1"
                  >
                    <Tag className="w-3 h-3 text-indigo-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <MessageSquareCode className="w-5 h-5 text-indigo-400" />
                <span>{editingLog ? '개발일지 수정' : '새 개발일지 작성'}</span>
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
                <label className="block text-slate-300 mb-1 font-medium">제목 *</label>
                <input
                  type="text"
                  placeholder="예: Spring Boot + JPA Fetch Join 최적화와 N+1 해결기"
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
                    <option value="트러블슈팅">트러블슈팅</option>
                    <option value="기술 학습 (TIL)">기술 학습 (TIL)</option>
                    <option value="학기 회고">학기 회고</option>
                    <option value="세미나/스터디">세미나/스터디</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">작성 날짜</label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">연계 프로젝트 (선택)</label>
                <select
                  value={formData.linkedProjectId || ''}
                  onChange={e => setFormData({ ...formData, linkedProjectId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">연계 프로젝트 없음 (일반 학습/회고)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">태그</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="태그 입력 후 엔터"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(formData.tags || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 text-xs border border-slate-700 flex items-center space-x-1.5"
                    >
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">본문 내용 (Markdown 지원) *</label>
                <textarea
                  rows={8}
                  placeholder="마크다운 형식으로 트러블슈팅 과정 및 학습 내용을 자세히 기록하세요."
                  value={formData.content || ''}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                />
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
