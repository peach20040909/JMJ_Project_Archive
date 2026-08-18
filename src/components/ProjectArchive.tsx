import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Star, 
  Edit3, 
  Trash2, 
  Code2, 
  Check, 
  X,
  FileText,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ProjectItem, ProjectCategory, SemesterType } from '../types';

interface ProjectArchiveProps {
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
  onOpenGitHubImport?: () => void;
  targetRole?: string;
}

const CATEGORIES: ProjectCategory[] = ['All', 'Web', 'Backend', 'Frontend', 'System', 'Algorithm', 'AI/Data'];

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onOpenGitHubImport,
  targetRole = 'Fullstack & Backend Software Engineer'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // AI Enhancer state
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceSuccess, setEnhanceSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: '',
    summary: '',
    category: 'Web',
    semester: '2학년 1학기',
    period: '2026.03 - 2026.06',
    teamType: '개인',
    role: '메인 개발',
    techStack: [],
    problemDescription: '',
    solutionDescription: '',
    resultDescription: '',
    keyFeatures: [''],
    githubUrl: '',
    demoUrl: '',
    featured: true,
    starBullets: [],
    troubleshootingStory: ''
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesCat = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Handle Form open
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      category: 'Web',
      semester: '2학년 1학기',
      period: '2026.03 - 2026.06',
      teamType: '개인',
      role: '메인 개발',
      techStack: ['React', 'TypeScript'],
      problemDescription: '',
      solutionDescription: '',
      resultDescription: '',
      keyFeatures: ['핵심 기능 구현'],
      githubUrl: '',
      demoUrl: '',
      featured: true,
      starBullets: [],
      troubleshootingStory: ''
    });
    setEnhanceSuccess(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingId(project.id);
    setFormData(project);
    setEnhanceSuccess(false);
    setIsFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) {
      alert('프로젝트 제목과 한 줄 요약은 필수입니다.');
      return;
    }

    if (editingId) {
      onUpdateProject({
        ...(formData as ProjectItem),
        id: editingId,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    } else {
      const newProj: ProjectItem = {
        ...(formData as ProjectItem),
        id: `proj-${Date.now()}`,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      onAddProject(newProj);
    }

    setIsFormOpen(false);
  };

  // AI Project Polish Handler
  const handleAiEnhance = async () => {
    if (!formData.title || !formData.summary) {
      alert('AI 첨삭을 위해 최소한 프로젝트 제목과 간단한 요약을 입력해주세요.');
      return;
    }

    setIsEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          techStack: formData.techStack,
          role: formData.role,
          problem: formData.problemDescription,
          solution: formData.solutionDescription,
          result: formData.resultDescription,
          targetRole
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData(prev => ({
          ...prev,
          summary: data.enhancedSummary || prev.summary,
          starBullets: data.starBullets || prev.starBullets,
          troubleshootingStory: data.troubleshootingStory || prev.troubleshootingStory
        }));
        setEnhanceSuccess(true);
      } else {
        alert('AI 첨삭을 불러오지 못했습니다.');
      }
    } catch (err) {
      alert('AI 서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-6 py-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>프로젝트 아카이브</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
              총 {projects.length}개
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            GitHub 과제, 팀 프로젝트, CS 실습 결과물을 체계적으로 관리하고 STAR 기법으로 정리합니다.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 flex-shrink-0">
          {/* GitHub Auto Import Button */}
          {onOpenGitHubImport && (
            <button
              onClick={onOpenGitHubImport}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-sm transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
              <span>GitHub 링크로 자동 등록</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </button>
          )}

          {/* Manual Add Button */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>수동 등록</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="제목, 기술스택 검색..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-sm">해당 조건에 맞는 프로젝트가 없습니다.</h3>
          <p className="text-xs text-slate-400">
            GitHub 링크를 붙여넣어 새 프로젝트를 바로 추가해보세요!
          </p>
          {onOpenGitHubImport && (
            <button
              onClick={onOpenGitHubImport}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold inline-flex items-center space-x-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub 링크로 가져오기</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between p-5 space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200/70">
                      {project.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {project.semester}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {project.featured && (
                      <span className="p-1 rounded bg-amber-50 text-amber-600 text-xs font-bold flex items-center" title="대표 프로젝트">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      </span>
                    )}
                    <button
                      onClick={(e) => handleOpenEdit(project, e)}
                      className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="수정"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`'${project.title}' 프로젝트를 삭제하시겠습니까?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title and Summary */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Role and Period */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="truncate">{project.role} ({project.teamType})</span>
                  <span className="font-mono flex-shrink-0">{project.period}</span>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center font-bold">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-indigo-600 font-semibold group-hover:underline">
                  상세보기 및 STAR 이력서 →
                </span>
                <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-900"
                      title="GitHub 저장소"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-900"
                      title="라이브 데모"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{selectedProject.period}</span>
                  <span className="text-xs text-slate-500">• {selectedProject.teamType} ({selectedProject.role})</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedProject.title}</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const p = selectedProject;
                    setSelectedProject(null);
                    handleOpenEdit(p);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center space-x-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>수정</span>
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              
              {/* Summary */}
              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-slate-800 font-medium leading-relaxed">
                {selectedProject.summary}
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">사용 기술 스택</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200 font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* STAR Resume Bullets */}
              {selectedProject.starBullets && selectedProject.starBullets.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <h4 className="font-bold text-amber-900 flex items-center space-x-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>STAR(상황-과제-행동-결과) 이력서 요약</span>
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-800">
                    {selectedProject.starBullets.map((b, i) => (
                      <p key={i} className="leading-relaxed">• {b}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Problem & Solution */}
              {(selectedProject.problemDescription || selectedProject.solutionDescription) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.problemDescription && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 text-xs">문제 정의 (Problem)</span>
                      <p className="text-slate-600 text-xs leading-relaxed">{selectedProject.problemDescription}</p>
                    </div>
                  )}
                  {selectedProject.solutionDescription && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-700 text-xs">기술적 해결책 (Solution)</span>
                      <p className="text-slate-600 text-xs leading-relaxed">{selectedProject.solutionDescription}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">주요 기능</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
                    {selectedProject.keyFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Troubleshooting Story */}
              {selectedProject.troubleshootingStory && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <span>트러블슈팅 & 성능 개선 일지</span>
                  </h4>
                  <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                    {selectedProject.troubleshootingStory}
                  </pre>
                </div>
              )}

              {/* Links */}
              <div className="flex items-center space-x-3 pt-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center space-x-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub 소스코드</span>
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>라이브 데모 링크</span>
                  </a>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Project Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            
            {/* Form Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? '프로젝트 정보 수정' : '새 프로젝트 등록'}
                </h3>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700">프로젝트 제목 *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="예: CampusMate - 전공서적 대여 & 중고 플랫폼"
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">분야/카테고리</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900"
                  >
                    <option value="Web">Web</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="System">System</option>
                    <option value="Algorithm">Algorithm</option>
                    <option value="App">App</option>
                    <option value="AI/Data">AI/Data</option>
                  </select>
                </div>
              </div>

              {/* Summary with AI Enhance button */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">프로젝트 한 줄 요약 *</label>
                  <button
                    type="button"
                    onClick={handleAiEnhance}
                    disabled={isEnhancing}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200 flex items-center space-x-1"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>AI 첨삭 중...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>AI STAR 이력서 자동 첨삭</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  rows={2}
                  placeholder="프로젝트의 목적과 핵심 가치를 간단히 적어주세요."
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
                {enhanceSuccess && (
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>Gemini AI가 STAR 요약 및 트러블슈팅 문장을 업그레이드했습니다!</span>
                  </p>
                )}
              </div>

              {/* Semester, Period, Team, Role */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-slate-700">해당 학기</label>
                  <select
                    value={formData.semester}
                    onChange={e => setFormData({ ...formData, semester: e.target.value as SemesterType })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="1학년 1학기">1학년 1학기</option>
                    <option value="1학년 2학기">1학년 2학기</option>
                    <option value="2학년 1학기">2학년 1학기</option>
                    <option value="2학년 여름방학">2학년 여름방학</option>
                    <option value="2학년 2학기 (예정/진행중)">2학년 2학기 (예정/진행중)</option>
                    <option value="기타/개인">기타/개인</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">진행 기간</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={e => setFormData({ ...formData, period: e.target.value })}
                    placeholder="예: 2026.03 - 2026.06"
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">팀 구성</label>
                  <select
                    value={formData.teamType}
                    onChange={e => setFormData({ ...formData, teamType: e.target.value as any })}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  >
                    <option value="개인">개인</option>
                    <option value="팀 (2명)">팀 (2명)</option>
                    <option value="팀 (3명)">팀 (3명)</option>
                    <option value="팀 (4명)">팀 (4명)</option>
                    <option value="팀 (5인 이상)">팀 (5인 이상)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">담당 역할</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    placeholder="예: 백엔드 리더 (40%)"
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <label className="font-bold text-slate-700">기술 스택 (Enter로 추가)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (techInput.trim() && !formData.techStack?.includes(techInput.trim())) {
                          setFormData({ ...formData, techStack: [...(formData.techStack || []), techInput.trim()] });
                          setTechInput('');
                        }
                      }
                    }}
                    placeholder="예: Spring Boot, React, MySQL..."
                    className="flex-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (techInput.trim() && !formData.techStack?.includes(techInput.trim())) {
                        setFormData({ ...formData, techStack: [...(formData.techStack || []), techInput.trim()] });
                        setTechInput('');
                      }
                    }}
                    className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.techStack?.map((t, i) => (
                    <span key={i} className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-mono font-semibold border border-indigo-200">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, techStack: formData.techStack?.filter((_, idx) => idx !== i) })}
                        className="text-indigo-400 hover:text-indigo-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">GitHub 주소</label>
                  <input
                    type="text"
                    value={formData.githubUrl || ''}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">데모 / 배포 링크</label>
                  <input
                    type="text"
                    value={formData.demoUrl || ''}
                    onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full mt-1 p-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              {/* Troubleshooting */}
              <div>
                <label className="font-bold text-slate-700">트러블슈팅 & 문제 해결 과정</label>
                <textarea
                  value={formData.troubleshootingStory || ''}
                  onChange={e => setFormData({ ...formData, troubleshootingStory: e.target.value })}
                  rows={3}
                  placeholder="발생했던 오류 및 최적화 해결 과정을 적어주세요 (마크다운 지원)."
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-mono"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? '수정 완료' : '프로젝트 등록'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
