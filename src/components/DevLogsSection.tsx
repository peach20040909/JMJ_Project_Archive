import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Plus, 
  Search, 
  Tag, 
  Calendar, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Link as LinkIcon,
  Code2,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DevLog, ProjectItem } from '../types';

interface DevLogsSectionProps {
  devLogs: DevLog[];
  projects: ProjectItem[];
  onAddLog: (log: DevLog) => void;
  onUpdateLog: (log: DevLog) => void;
  onDeleteLog: (id: string) => void;
}

const CATEGORIES = ['전체', '트러블슈팅', '기술 학습 (TIL)', '학기 회고', '세미나/스터디'] as const;

export const DevLogsSection: React.FC<DevLogsSectionProps> = ({
  devLogs,
  projects,
  onAddLog,
  onUpdateLog,
  onDeleteLog
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<DevLog | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<DevLog>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    category: '트러블슈팅',
    tags: [],
    content: '',
    linkedProjectId: ''
  });

  const [tagInput, setTagInput] = useState('');

  const filteredLogs = devLogs.filter(log => {
    const matchesCat = selectedCat === '전체' || log.category === selectedCat;
    const matchesSearch = 
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: '트러블슈팅',
      tags: ['Spring Boot', '성능최적화'],
      content: `### 🔍 문제 상황\n- \n\n### 🛠️ 원인 분석\n- \n\n### 💡 해결 방법\n- \n\n### 📈 결과 및 배운 점\n- `,
      linkedProjectId: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (log: DevLog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingId(log.id);
    setFormData(log);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('제목과 내용은 필수입니다.');
      return;
    }

    if (editingId) {
      onUpdateLog({
        ...(formData as DevLog),
        id: editingId
      });
    } else {
      const newLog: DevLog = {
        ...(formData as DevLog),
        id: `log-${Date.now()}`
      };
      onAddLog(newLog);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>트러블슈팅 & 기술 학습 일지</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              총 {devLogs.length}편
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            개발 중 직면한 버그 해결 과정, CS 이론 공부(TIL), 학기말 회고를 기록하는 엔지니어링 일지입니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>새 일지 작성</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="제목, 태그, 내용 검색..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Logs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLogs.map(log => {
          const linkedProj = projects.find(p => p.id === log.linkedProjectId);

          return (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer p-5 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    {log.category}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <span className="text-[11px] text-slate-400 font-mono">{log.date}</span>
                    <button
                      onClick={(e) => handleOpenEdit(log, e)}
                      className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`'${log.title}' 일지를 삭제하시겠습니까?`)) {
                          onDeleteLog(log.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {log.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {log.content.replace(/[#*`]/g, '')}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap gap-1">
                  {log.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                {linkedProj && (
                  <div className="text-[11px] text-indigo-600 font-semibold truncate flex items-center space-x-1">
                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{linkedProj.title}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold">
                    {selectedLog.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedLog.date}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedLog.title}</h2>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
                {selectedLog.tags.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown>{selectedLog.content}</ReactMarkdown>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? '일지 수정' : '새 개발 일지 작성'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-slate-700">일지 제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: Spring Boot JPA N+1 문제 해결 및 Fetch Join 최적화"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="트러블슈팅">트러블슈팅</option>
                    <option value="기술 학습 (TIL)">기술 학습 (TIL)</option>
                    <option value="학기 회고">학기 회고</option>
                    <option value="세미나/스터디">세미나/스터디</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">작성일</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">연계 프로젝트</label>
                  <select
                    value={formData.linkedProjectId || ''}
                    onChange={e => setFormData({ ...formData, linkedProjectId: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="">없음</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="font-bold text-slate-700">태그 (Enter로 추가)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
                          setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
                          setTagInput('');
                        }
                      }
                    }}
                    placeholder="예: JPA, Redis, 동시성제어..."
                    className="flex-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
                        setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
                        setTagInput('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.tags?.map((t, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-mono font-semibold border border-blue-200">
                      <span>#{t}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, tags: formData.tags?.filter((_, idx) => idx !== i) })}
                        className="text-blue-400 hover:text-blue-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="font-bold text-slate-700">내용 (Markdown 지원) *</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  placeholder="발생한 문제, 원인, 해결 방법 및 결과를 자유롭게 기록해주세요."
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono"
                  required
                />
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
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1 shadow-sm"
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
