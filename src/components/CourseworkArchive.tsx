import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Award, 
  Link as LinkIcon, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { CourseworkSubject, ProjectItem } from '../types';

interface CourseworkArchiveProps {
  courseworks: CourseworkSubject[];
  projects: ProjectItem[];
  onAddCoursework: (c: CourseworkSubject) => void;
  onUpdateCoursework: (c: CourseworkSubject) => void;
  onDeleteCoursework: (id: string) => void;
}

const SEMESTERS = ['전체', '1학년 1학기', '1학년 2학기', '2학년 1학기', '2학년 2학기 (수강예정)'] as const;

export const CourseworkArchive: React.FC<CourseworkArchiveProps> = ({
  courseworks,
  projects,
  onAddCoursework,
  onUpdateCoursework,
  onDeleteCoursework
}) => {
  const [selectedSemester, setSelectedSemester] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CourseworkSubject>>({
    name: '',
    semester: '2학년 2학기 (수강예정)',
    credits: 3,
    grade: '수강예정',
    professor: '',
    keyConcepts: [],
    termProjectName: '',
    linkedProjectId: '',
    repoUrl: '',
    review: ''
  });

  const [conceptInput, setConceptInput] = useState('');

  const filteredCourses = courseworks.filter(c => {
    const matchesSemester = selectedSemester === '전체' || c.semester === selectedSemester;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.keyConcepts.some(concept => concept.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.professor && c.professor.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSemester && matchesSearch;
  });

  const totalCredits = courseworks
    .filter(c => c.grade !== '수강예정')
    .reduce((sum, c) => sum + c.credits, 0);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      semester: '2학년 2학기 (수강예정)',
      credits: 3,
      grade: '수강예정',
      professor: '',
      keyConcepts: [''],
      termProjectName: '',
      linkedProjectId: '',
      repoUrl: '',
      review: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (c: CourseworkSubject) => {
    setEditingId(c.id);
    setFormData(c);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('과목명은 필수입니다.');
      return;
    }

    if (editingId) {
      onUpdateCoursework({
        ...(formData as CourseworkSubject),
        id: editingId
      });
    } else {
      const newCourse: CourseworkSubject = {
        ...(formData as CourseworkSubject),
        id: `course-${Date.now()}`
      };
      onAddCoursework(newCourse);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>컴퓨터공학 전공 교과목 아카이브</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              이수 {totalCredits}학점
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            1학년 기초부터 2학년 2학기 코어 CS(알고리즘, 운영체제, DB)까지 교과목 이론과 프로젝트를 연결합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>과목 추가</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {SEMESTERS.map(sem => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedSemester === sem
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {sem}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="과목명, 핵심 개념 검색..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => {
          const linkedProj = projects.find(p => p.id === course.linkedProjectId);
          const isUpcoming = course.grade === '수강예정';

          return (
            <div
              key={course.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                isUpcoming
                  ? 'bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/20 border-indigo-200 shadow-sm'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300'
              }`}
            >
              <div className="space-y-3">
                
                {/* Semester & Grade Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {course.semester} • {course.credits}학점
                  </span>
                  
                  <div className="flex items-center space-x-1.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${
                      isUpcoming 
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {course.grade}
                    </span>
                    <button
                      onClick={() => handleOpenEdit(course)}
                      className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`'${course.name}' 과목을 삭제하시겠습니까?`)) {
                          onDeleteCoursework(course.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Course Name & Professor */}
                <div>
                  <h3 className="text-base font-bold text-slate-900">{course.name}</h3>
                  {course.professor && (
                    <span className="text-xs text-slate-500">담당 교수: {course.professor}</span>
                  )}
                </div>

                {/* Key Concepts Tags */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">핵심 학습 이론 & 키워드:</span>
                  <div className="flex flex-wrap gap-1">
                    {course.keyConcepts.map((concept, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Term Project */}
                {course.termProjectName && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-slate-900 block">텀 프로젝트/실습:</span>
                    <p className="text-slate-600">{course.termProjectName}</p>
                  </div>
                )}

                {/* Course Review */}
                {course.review && (
                  <p className="text-xs text-slate-500 italic bg-slate-50/50 p-2 rounded-lg border border-slate-100 leading-relaxed">
                    "{course.review}"
                  </p>
                )}
              </div>

              {/* Linked Project Badge */}
              {linkedProj && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span className="flex items-center space-x-1 truncate mr-2">
                    <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">연계: {linkedProj.title}</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? '교과목 정보 수정' : '새 전공 교과목 등록'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">과목명 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 운영체제"
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">이수 학기</label>
                  <select
                    value={formData.semester}
                    onChange={e => setFormData({ ...formData, semester: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  >
                    <option value="1학년 1학기">1학년 1학기</option>
                    <option value="1학년 2학기">1학년 2학기</option>
                    <option value="2학년 1학기">2학년 1학기</option>
                    <option value="2학년 2학기 (수강예정)">2학년 2학기 (수강예정)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">학점</label>
                  <input
                    type="number"
                    value={formData.credits}
                    onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">성적</label>
                  <select
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  >
                    <option value="A+">A+</option>
                    <option value="A0">A0</option>
                    <option value="B+">B+</option>
                    <option value="B0">B0</option>
                    <option value="수강예정">수강예정</option>
                    <option value="P">P (Pass)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">담당 교수</label>
                  <input
                    type="text"
                    value={formData.professor || ''}
                    onChange={e => setFormData({ ...formData, professor: e.target.value })}
                    placeholder="교수님 성함"
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">핵심 학습 개념 (Enter로 추가)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={conceptInput}
                    onChange={e => setConceptInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (conceptInput.trim() && !formData.keyConcepts?.includes(conceptInput.trim())) {
                          setFormData({ ...formData, keyConcepts: [...(formData.keyConcepts || []), conceptInput.trim()] });
                          setConceptInput('');
                        }
                      }
                    }}
                    placeholder="예: 가상 메모리, 뮤텍스, 동기화..."
                    className="flex-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (conceptInput.trim() && !formData.keyConcepts?.includes(conceptInput.trim())) {
                        setFormData({ ...formData, keyConcepts: [...(formData.keyConcepts || []), conceptInput.trim()] });
                        setConceptInput('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.keyConcepts?.map((c, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold border border-emerald-200">
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, keyConcepts: formData.keyConcepts?.filter((_, idx) => idx !== i) })}
                        className="text-emerald-400 hover:text-emerald-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">텀 프로젝트 / 실습 과제명</label>
                <input
                  type="text"
                  value={formData.termProjectName || ''}
                  onChange={e => setFormData({ ...formData, termProjectName: e.target.value })}
                  placeholder="예: MIPS 명령어 파이프라인 시뮬레이터"
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">수강 소감 / 목표</label>
                <textarea
                  value={formData.review || ''}
                  onChange={e => setFormData({ ...formData, review: e.target.value })}
                  rows={2}
                  placeholder="이 과목을 통해 배우고자 하는 바나 느낀 점을 적어주세요."
                  className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1 shadow-sm"
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
