import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Award, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  FolderGit2, 
  Edit, 
  Trash2, 
  Sparkles,
  BookMarked,
  Layers,
  GraduationCap
} from 'lucide-react';
import { CourseworkSubject, ProjectItem } from '../types';

interface CourseworkArchiveProps {
  courseworks: CourseworkSubject[];
  projects: ProjectItem[];
  onAddCoursework: (subject: CourseworkSubject) => void;
  onUpdateCoursework: (subject: CourseworkSubject) => void;
  onDeleteCoursework: (id: string) => void;
}

export const CourseworkArchive: React.FC<CourseworkArchiveProps> = ({
  courseworks,
  projects,
  onAddCoursework,
  onUpdateCoursework,
  onDeleteCoursework
}) => {
  const [selectedSemesterTab, setSelectedSemesterTab] = useState<string>('All');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editingSubject, setEditingSubject] = useState<CourseworkSubject | null>(null);
  const [formData, setFormData] = useState<Partial<CourseworkSubject>>({
    name: '',
    semester: '2학년 2학기 (수강예정)',
    credits: 3,
    grade: '수강예정',
    professor: '',
    keyConcepts: [''],
    termProjectName: '',
    review: ''
  });

  const [conceptInput, setConceptInput] = useState('');

  const semestersList = [
    'All',
    '1학년 1학기',
    '1학년 2학기',
    '2학년 1학기',
    '2학년 2학기 (수강예정)'
  ];

  const filteredCourses = courseworks.filter(c => {
    if (selectedSemesterTab === 'All') return true;
    return c.semester === selectedSemesterTab;
  });

  // Grouping by semester for 'All' tab
  const semesterGroups: { [key: string]: CourseworkSubject[] } = {
    '2학년 2학기 (수강예정)': courseworks.filter(c => c.semester === '2학년 2학기 (수강예정)'),
    '2학년 1학기': courseworks.filter(c => c.semester === '2학년 1학기'),
    '1학년 2학기': courseworks.filter(c => c.semester === '1학년 2학기'),
    '1학년 1학기': courseworks.filter(c => c.semester === '1학년 1학기')
  };

  const handleOpenAdd = () => {
    setFormData({
      id: `course-${Date.now()}`,
      name: '',
      semester: '2학년 2학기 (수강예정)',
      credits: 3,
      grade: '수강예정',
      professor: '',
      keyConcepts: [],
      termProjectName: '',
      review: ''
    });
    setEditingSubject(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (subject: CourseworkSubject) => {
    setFormData({ ...subject });
    setEditingSubject(subject);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('과목명은 필수입니다.');
      return;
    }

    const subjectToSave: CourseworkSubject = {
      id: formData.id || `course-${Date.now()}`,
      name: formData.name,
      semester: formData.semester || '2학년 2학기 (수강예정)',
      credits: Number(formData.credits) || 3,
      grade: formData.grade || '수강예정',
      professor: formData.professor || '',
      keyConcepts: formData.keyConcepts && formData.keyConcepts.length > 0 ? formData.keyConcepts : ['핵심 CS 개념'],
      termProjectName: formData.termProjectName || '',
      linkedProjectId: formData.linkedProjectId || '',
      repoUrl: formData.repoUrl || '',
      review: formData.review || ''
    };

    if (editingSubject) {
      onUpdateCoursework(subjectToSave);
    } else {
      onAddCoursework(subjectToSave);
    }
    setIsEditing(false);
  };

  const handleAddConcept = () => {
    if (!conceptInput.trim()) return;
    const current = formData.keyConcepts || [];
    if (!current.includes(conceptInput.trim())) {
      setFormData({ ...formData, keyConcepts: [...current, conceptInput.trim()] });
    }
    setConceptInput('');
  };

  const handleRemoveConcept = (c: string) => {
    const current = formData.keyConcepts || [];
    setFormData({ ...formData, keyConcepts: current.filter(item => item !== c) });
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'A0':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/30';
      case 'B+':
      case 'B0':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case '수강예정':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">전공 교과목 및 학업 아카이브</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono border border-slate-700">
              총 {courseworks.length}개 과목
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            소프트웨어학과의 핵심 전공 교과목, 배운 핵심 원리, 텀 프로젝트 및 회고를 체계적으로 정리합니다.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>새 교과목 추가</span>
        </button>
      </div>

      {/* 2-2 Semester Highlight Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-emerald-950/40 border border-indigo-500/40 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">2학년 2학기 핵심 전공 수강 로드맵</h3>
              <p className="text-xs text-indigo-300">소프트웨어 엔지니어링 역량의 근간이 되는 CS 3대장 수강기</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-medium">
            2026 가을학기
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-emerald-400 mb-1">알고리즘 (Algorithms)</div>
            <p className="text-[11px] text-slate-300">DP, 그리디, 분할정복, 그래프 최적화 & 코딩테스트 골드</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-sky-400 mb-1">운영체제 (Operating Systems)</div>
            <p className="text-[11px] text-slate-300">프로세스/스레드 동기화, Mutex/Semaphore, 가상 메모리</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-amber-400 mb-1">데이터베이스 (Database)</div>
            <p className="text-[11px] text-slate-300">트랜잭션 ACID, B+ Tree 인덱스, 쿼리 튜닝, 격리수준</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs font-bold text-purple-400 mb-1">웹서버 & SW공학</div>
            <p className="text-[11px] text-slate-300">RESTful API 아키텍처, TDD, CI/CD 자동화 파이프라인</p>
          </div>
        </div>
      </div>

      {/* Semester Filter Tabs */}
      <div className="flex space-x-1 overflow-x-auto scrollbar-none p-1.5 rounded-xl bg-slate-900 border border-slate-800">
        {semestersList.map(sem => (
          <button
            key={sem}
            onClick={() => setSelectedSemesterTab(sem)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedSemesterTab === sem
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {sem === 'All' ? '전체 학기 보기' : sem}
          </button>
        ))}
      </div>

      {/* Course List Display */}
      {selectedSemesterTab === 'All' ? (
        <div className="space-y-8">
          {Object.entries(semesterGroups).map(([semesterName, list]) => {
            if (list.length === 0) return null;
            return (
              <div key={semesterName} className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <h3 className="text-lg font-bold text-white">{semesterName}</h3>
                  <span className="text-xs text-slate-400">({list.length}과목)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {list.map(course => renderCourseCard(course))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map(course => renderCourseCard(course))}
        </div>
      )}

      {/* Course Add / Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>{editingSubject ? '전공 교과목 정보 수정' : '새 전공 교과목 등록'}</span>
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                닫기
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">교과목명 *</label>
                <input
                  type="text"
                  placeholder="예: 자료구조 (Data Structures)"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">이수 학기</label>
                <select
                  value={formData.semester}
                  onChange={e => setFormData({ ...formData, semester: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="1학년 1학기">1학년 1학기</option>
                  <option value="1학년 2학기">1학년 2학기</option>
                  <option value="2학년 1학기">2학년 1학기</option>
                  <option value="2학년 2학기 (수강예정)">2학년 2학기 (수강예정)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">학점 및 취득 성적</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.credits || 3}
                    onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })}
                    className="w-1/3 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-center"
                    placeholder="3학점"
                  />
                  <select
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value as any })}
                    className="w-2/3 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="수강예정">수강예정</option>
                    <option value="A+">A+</option>
                    <option value="A0">A0</option>
                    <option value="B+">B+</option>
                    <option value="B0">B0</option>
                    <option value="P">Pass (P)</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">교수님 성함 (선택)</label>
                <input
                  type="text"
                  placeholder="예: 김교수님"
                  value={formData.professor || ''}
                  onChange={e => setFormData({ ...formData, professor: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Key Concepts Tags */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">학습한 핵심 CS 개념 키워드</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="개념 입력 (예: AVL Tree, 가상 메모리, 트랜잭션 등) 후 엔터"
                    value={conceptInput}
                    onChange={e => setConceptInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddConcept();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddConcept}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(formData.keyConcepts || []).map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-300 text-xs border border-slate-700 flex items-center space-x-1.5"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveConcept(c)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Term Project */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">과제 / 텀 프로젝트명</label>
                <input
                  type="text"
                  placeholder="예: C++ 기반 Red-Black Tree 엔진 직접 구현 과제"
                  value={formData.termProjectName || ''}
                  onChange={e => setFormData({ ...formData, termProjectName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Linked Project Select */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">연계된 프로젝트 선택 (아카이브 연동)</label>
                <select
                  value={formData.linkedProjectId || ''}
                  onChange={e => setFormData({ ...formData, linkedProjectId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">연계 프로젝트 없음 (단독 교과목)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.category})</option>
                  ))}
                </select>
              </div>

              {/* Review / Learnings */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">과목 수강 소감 & 배운 점 (Review)</label>
                <textarea
                  rows={3}
                  placeholder="이 과목을 통해 얻은 소프트웨어적 통찰이나 느낀 점을 기록하세요."
                  value={formData.review || ''}
                  onChange={e => setFormData({ ...formData, review: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
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
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderCourseCard(course: CourseworkSubject) {
    const isExpanded = expandedCourseId === course.id;
    const linkedProj = projects.find(p => p.id === course.linkedProjectId);

    return (
      <div
        key={course.id}
        className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
      >
        <div className="space-y-2.5">
          {/* Top Row: Grade Badge & Semester */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getGradeBadge(course.grade)}`}>
                {course.grade}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {course.credits}학점
              </span>
              {course.professor && (
                <span className="text-xs text-slate-500">
                  • {course.professor}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleOpenEdit(course)}
                className="p-1 text-slate-400 hover:text-slate-200"
                title="수정"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`'${course.name}' 과목을 삭제하시겠습니까?`)) {
                    onDeleteCoursework(course.id);
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-400"
                title="삭제"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Subject Name */}
          <h4 className="text-base font-bold text-white tracking-tight">
            {course.name}
          </h4>

          {/* Key Concepts Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.keyConcepts.map((concept, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/60"
              >
                {concept}
              </span>
            ))}
          </div>

          {/* Term project badge if any */}
          {course.termProjectName && (
            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-1.5">
              <BookMarked className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate">과제: {course.termProjectName}</span>
            </div>
          )}

          {/* Linked Project Banner */}
          {linkedProj && (
            <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 truncate mr-2">
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span className="truncate">연계 프로젝트: {linkedProj.title}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                아카이브 수록
              </span>
            </div>
          )}

          {/* Review Quote */}
          {course.review && (
            <p className="text-xs text-slate-400 italic pt-1 leading-relaxed border-l-2 border-slate-700 pl-2.5">
              "{course.review}"
            </p>
          )}
        </div>
      </div>
    );
  }
};
