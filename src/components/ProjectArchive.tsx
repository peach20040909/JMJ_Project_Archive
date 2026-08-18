import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Search, 
  Star, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Sparkles, 
  Wrench, 
  CheckCircle2, 
  Edit, 
  Trash2, 
  Eye, 
  Layers, 
  Code2, 
  ChevronRight,
  Filter,
  FileCode,
  Lightbulb,
  X,
  AlertCircle
} from 'lucide-react';
import { ProjectItem, ProjectCategory, SemesterType } from '../types';
import Markdown from 'react-markdown';

interface ProjectArchiveProps {
  projects: ProjectItem[];
  onAddProject: (project: ProjectItem) => void;
  onUpdateProject: (project: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
  targetRole?: string;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  targetRole = 'Software Engineer'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);

  // Modals
  const [viewingProject, setViewingProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [detailTab, setDetailTab] = useState<'overview' | 'troubleshooting' | 'star' | 'features'>('overview');

  // Form State for Create/Edit
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: '',
    summary: '',
    category: 'Web',
    semester: '2학년 1학기',
    period: '2026.03 - 2026.06',
    teamType: '개인',
    role: '',
    techStack: [],
    problemDescription: '',
    solutionDescription: '',
    resultDescription: '',
    keyFeatures: [''],
    githubUrl: '',
    demoUrl: '',
    featured: false,
    starBullets: [],
    troubleshootingStory: ''
  });

  const [techInput, setTechInput] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const categories: ProjectCategory[] = ['All', 'Web', 'Backend', 'Frontend', 'System', 'Algorithm', 'AI/Data'];
  const semesters = [
    'All',
    '1학년 1학기',
    '1학년 2학기',
    '2학년 1학기',
    '2학년 여름방학',
    '2학년 2학기 (예정/진행중)',
    '기타/개인'
  ];

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSemester = selectedSemester === 'All' || p.semester === selectedSemester;
    const matchesFeatured = !onlyFeatured || p.featured;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.techStack.some(t => t.toLowerCase().includes(query)) ||
      p.role.toLowerCase().includes(query);

    return matchesCategory && matchesSemester && matchesFeatured && matchesSearch;
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      id: `proj-${Date.now()}`,
      title: '',
      summary: '',
      category: 'Web',
      semester: '2학년 2학기 (예정/진행중)',
      period: '2026.09 - 2026.11',
      teamType: '팀 (3명)',
      role: '풀스택 & 백엔드 개발',
      techStack: ['Spring Boot', 'React', 'MySQL'],
      problemDescription: '',
      solutionDescription: '',
      resultDescription: '',
      keyFeatures: ['사용자 인증 및 권한 관리', '실시간 데이터 처리'],
      githubUrl: '',
      demoUrl: '',
      featured: false,
      starBullets: [],
      troubleshootingStory: '',
      updatedAt: new Date().toISOString().split('T')[0]
    });
    setEditingProject(null);
    setIsCreating(true);
    setAiError(null);
  };

  // Open Edit Modal
  const handleOpenEdit = (project: ProjectItem) => {
    setFormData({ ...project });
    setEditingProject(project);
    setIsCreating(false);
    setAiError(null);
  };

  // Save Project
  const handleSaveProject = () => {
    if (!formData.title || !formData.summary) {
      alert('프로젝트 제목과 한 줄 소개는 필수입니다.');
      return;
    }

    const cleanedFeatures = (formData.keyFeatures || []).filter(f => f.trim() !== '');

    const projectToSave: ProjectItem = {
      id: formData.id || `proj-${Date.now()}`,
      title: formData.title,
      summary: formData.summary,
      category: formData.category || 'Web',
      semester: formData.semester || '2학년 1학기',
      period: formData.period || '2026',
      teamType: formData.teamType || '개인',
      role: formData.role || '개발',
      techStack: formData.techStack && formData.techStack.length > 0 ? formData.techStack : ['Java', 'Spring'],
      problemDescription: formData.problemDescription || '',
      solutionDescription: formData.solutionDescription || '',
      resultDescription: formData.resultDescription || '',
      keyFeatures: cleanedFeatures.length > 0 ? cleanedFeatures : ['핵심 기능 구현 완료'],
      githubUrl: formData.githubUrl || '',
      demoUrl: formData.demoUrl || '',
      docsUrl: formData.docsUrl || '',
      imageUrl: formData.imageUrl || '',
      featured: !!formData.featured,
      starBullets: formData.starBullets || [],
      troubleshootingStory: formData.troubleshootingStory || '',
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingProject) {
      onUpdateProject(projectToSave);
    } else {
      onAddProject(projectToSave);
    }

    setIsCreating(false);
    setEditingProject(null);
  };

  // AI Project Enhance API Trigger
  const handleGenerateAiEnhance = async () => {
    if (!formData.title || !formData.summary) {
      setAiError('AI 분석을 위해 최소한 프로젝트 제목과 요약 설명을 입력해주세요.');
      return;
    }

    setIsGeneratingAi(true);
    setAiError(null);

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
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          summary: data.enhancedSummary || prev.summary,
          starBullets: data.starBullets || prev.starBullets,
          troubleshootingStory: data.troubleshootingStory || prev.troubleshootingStory
        }));
      } else {
        setAiError(data.error || 'AI 생성 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setAiError('서버와 통신하는 중 문제가 발생했습니다.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Add Tech Tag
  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.techStack || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, techStack: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  // Remove Tech Tag
  const handleRemoveTech = (tech: string) => {
    const current = formData.techStack || [];
    setFormData({ ...formData, techStack: current.filter(t => t !== tech) });
  };

  // Key Feature array handler
  const handleFeatureChange = (index: number, val: string) => {
    const next = [...(formData.keyFeatures || [])];
    next[index] = val;
    setFormData({ ...formData, keyFeatures: next });
  };

  const handleAddFeatureField = () => {
    setFormData({ ...formData, keyFeatures: [...(formData.keyFeatures || []), ''] });
  };

  const handleRemoveFeatureField = (index: number) => {
    const next = (formData.keyFeatures || []).filter((_, i) => i !== index);
    setFormData({ ...formData, keyFeatures: next });
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Controls: Title, Search, Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">프로젝트 아카이브</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-mono border border-slate-700">
              {filteredProjects.length} / {projects.length}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            1학년 기초 과제부터 2학년 전공 심화 및 2-2학기 주력 프로젝트까지 체계적으로 관리합니다.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>새 프로젝트 추가</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Box (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="프로젝트명, 기술 스택, 키워드로 검색..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                지우기
              </button>
            )}
          </div>

          {/* Semester Dropdown (3 cols) */}
          <div className="sm:col-span-3">
            <select
              value={selectedSemester}
              onChange={e => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">전체 학기 / 기간</option>
              {semesters.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Featured Toggle (3 cols) */}
          <div className="sm:col-span-3 flex items-center justify-end">
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`w-full sm:w-auto px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-center space-x-1.5 border transition-colors ${
                onlyFeatured
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Star className={`w-4 h-4 ${onlyFeatured ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
              <span>대표 프로젝트만</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pt-1">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center space-x-1">
            <Filter className="w-3 h-3 text-indigo-400" />
            <span>분야:</span>
          </span>
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
              {cat === 'All' ? '전체' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300">조건에 맞는 프로젝트가 없습니다</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            검색어나 필터를 초기화하거나, 우측 상단의 '새 프로젝트 추가' 버튼을 눌러 첫 프로젝트를 등록해보세요.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSemester('All');
              setSearchQuery('');
              setOnlyFeatured(false);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium border border-slate-700"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl bg-slate-900 border transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 ${
                project.featured 
                  ? 'border-indigo-500/40 hover:border-indigo-500/70' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 space-y-3.5">
                {/* Meta Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                      {project.semester}
                    </span>
                  </div>

                  {/* Star Toggle */}
                  <button
                    onClick={() => onUpdateProject({ ...project, featured: !project.featured })}
                    className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                    title={project.featured ? '대표 프로젝트 해제' : '대표 프로젝트로 등록'}
                  >
                    <Star className={`w-4 h-4 ${project.featured ? 'text-amber-400 fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Title and Summary */}
                <div>
                  <h3 
                    onClick={() => {
                      setViewingProject(project);
                      setDetailTab('overview');
                    }}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Role & Team */}
                <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{project.teamType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wrench className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[140px]">{project.role}</span>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[11px] font-mono border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Problem Solving / STAR preview badge */}
                {(project.troubleshootingStory || (project.starBullets && project.starBullets.length > 0)) && (
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate font-medium">
                      {project.troubleshootingStory ? '트러블슈팅 일지 수록' : 'STAR 이력서 총평 완성'}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer: Links & Action Buttons */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {/* External links */}
                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="GitHub 저장소"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="라이브 데모"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* View / Edit / Delete */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setViewingProject(project);
                      setDetailTab('overview');
                    }}
                    className="px-2.5 py-1 rounded-md bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 font-medium text-xs flex items-center space-x-1 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>상세보기</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    title="프로젝트 수정"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`'${project.title}' 프로젝트를 삭제하시겠습니까?`)) {
                        onDeleteProject(project.id);
                      }
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="프로젝트 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {viewingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl text-slate-100 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Top Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    {viewingProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                    {viewingProject.semester}
                  </span>
                  {viewingProject.featured && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>대표 프로젝트</span>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setViewingProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">{viewingProject.title}</h2>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{viewingProject.summary}</p>
              </div>

              {/* Meta information bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{viewingProject.period}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{viewingProject.teamType} ({viewingProject.role})</span>
                </div>
                {viewingProject.githubUrl && (
                  <a
                    href={viewingProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {viewingProject.demoUrl && (
                  <a
                    href={viewingProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              {/* Tech stack badge row */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {viewingProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 px-6 bg-slate-900/60 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setDetailTab('overview')}
                className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  detailTab === 'overview'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                개요 및 핵심 기능
              </button>
              <button
                onClick={() => setDetailTab('troubleshooting')}
                className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  detailTab === 'troubleshooting'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>문제 해결 & 트러블슈팅</span>
              </button>
              <button
                onClick={() => setDetailTab('star')}
                className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                  detailTab === 'star'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>STAR 이력서 총평</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {detailTab === 'overview' && (
                <div className="space-y-6">
                  {/* Problem & Solution Box */}
                  {(viewingProject.problemDescription || viewingProject.solutionDescription) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4" />
                          <span>해결하고자 한 문제 상황</span>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {viewingProject.problemDescription || '기존 프로세스의 비효율 및 구조적 개선 필요성 인식'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4" />
                          <span>기술적 해결 방안 & 접근</span>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {viewingProject.solutionDescription || '적합한 아키텍처 및 라이브러리 도입을 통한 모듈화'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Result & Impact */}
                  {viewingProject.resultDescription && (
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                      <div className="text-indigo-300 font-semibold text-xs uppercase tracking-wider flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>성과 및 배운 점 (Outcome & Learnings)</span>
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                        {viewingProject.resultDescription}
                      </p>
                    </div>
                  )}

                  {/* Key Features list */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>주요 구현 기능 (Key Features)</span>
                    </h4>
                    <ul className="space-y-2">
                      {viewingProject.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-slate-300 text-xs sm:text-sm">
                          <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {detailTab === 'troubleshooting' && (
                <div className="space-y-4">
                  {viewingProject.troubleshootingStory ? (
                    <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 prose prose-invert prose-sm max-w-none text-slate-300">
                      <div className="markdown-body">
                        <Markdown>{viewingProject.troubleshootingStory}</Markdown>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-800/40 rounded-xl border border-slate-800 space-y-3">
                      <Wrench className="w-8 h-8 text-slate-500 mx-auto" />
                      <p className="text-slate-400 text-sm">작성된 트러블슈팅 일지가 없습니다.</p>
                      <button
                        onClick={() => {
                          setViewingProject(null);
                          handleOpenEdit(viewingProject);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium"
                      >
                        수정창에서 AI 트러블슈팅 일지 생성하기
                      </button>
                    </div>
                  )}
                </div>
              )}

              {detailTab === 'star' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-xs">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>STAR 기법 이력서 요약 문장</span>
                    </div>
                    {viewingProject.starBullets && viewingProject.starBullets.length > 0 ? (
                      <div className="space-y-2.5">
                        {viewingProject.starBullets.map((bullet, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                            {bullet}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-xs">
                        STAR 문장이 아직 생성되지 않았습니다. 프로젝트 수정 창에서 AI 자동 생성을 실행해보세요.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs">
              <span className="text-slate-500">최종 수정일: {viewingProject.updatedAt}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const toEdit = viewingProject;
                    setViewingProject(null);
                    handleOpenEdit(toEdit);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium"
                >
                  편집하기
                </button>
                <button
                  onClick={() => setViewingProject(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Create / Edit Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl p-6 text-slate-100 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FolderGit2 className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">
                  {editingProject ? '프로젝트 수정' : '새 프로젝트 등록'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="text-slate-400 hover:text-white text-sm"
              >
                닫기
              </button>
            </div>

            {/* AI Assistant Quick Generator Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">AI 프로젝트 스토리 & STAR 자동 생성</h4>
                  <p className="text-xs text-indigo-300">제목과 대략적인 내용만 적고 버튼을 누르면 이력서용 STAR 문장과 트러블슈팅을 다듬어줍니다.</p>
                </div>
              </div>
              <button
                onClick={handleGenerateAiEnhance}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-xs font-semibold whitespace-nowrap shadow-md transition-all flex items-center space-x-1.5 flex-shrink-0"
              >
                {isGeneratingAi ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    <span>AI 작성중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI로 자동 완성하기</span>
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">프로젝트 제목 *</label>
                <input
                  type="text"
                  placeholder="예: CampusMate - 교내 선착순 기자재 대여 플랫폼"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Summary */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">한 줄 요약 (Summary) *</label>
                <input
                  type="text"
                  placeholder="프로젝트의 핵심 가치와 구현 내용을 한눈에 알 수 있게 작성하세요."
                  value={formData.summary || ''}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category & Semester */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">카테고리</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Web">Web (웹 풀스택/프론트/백엔드)</option>
                  <option value="Backend">Backend (백엔드/API)</option>
                  <option value="Frontend">Frontend (프론트엔드/UI)</option>
                  <option value="System">System (시스템/C++/메모리)</option>
                  <option value="Algorithm">Algorithm (알고리즘/자료구조)</option>
                  <option value="App">App (모바일 앱)</option>
                  <option value="AI/Data">AI/Data (인공지능/데이터)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">수행 학기 / 시기</label>
                <select
                  value={formData.semester}
                  onChange={e => setFormData({ ...formData, semester: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="1학년 1학기">1학년 1학기</option>
                  <option value="1학년 2학기">1학년 2학기</option>
                  <option value="2학년 1학기">2학년 1학기</option>
                  <option value="2학년 여름방학">2학년 여름방학</option>
                  <option value="2학년 2학기 (예정/진행중)">2학년 2학기 (예정/진행중)</option>
                  <option value="기타/개인">기타/개인</option>
                </select>
              </div>

              {/* Period & Team Type */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">진행 기간</label>
                <input
                  type="text"
                  placeholder="2026.03 - 2026.06 (4개월)"
                  value={formData.period || ''}
                  onChange={e => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">팀 규모</label>
                <select
                  value={formData.teamType}
                  onChange={e => setFormData({ ...formData, teamType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="개인">개인 (1인 개발)</option>
                  <option value="팀 (2명)">팀 (2명)</option>
                  <option value="팀 (3명)">팀 (3명)</option>
                  <option value="팀 (4명)">팀 (4명)</option>
                  <option value="팀 (5인 이상)">팀 (5인 이상)</option>
                </select>
              </div>

              {/* Role */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">맡은 역할 & 기여도</label>
                <input
                  type="text"
                  placeholder="예: 백엔드 리드 & RESTful API 설계 (기여도 50%)"
                  value={formData.role || ''}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Tech Stack Tag Selector */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">사용 기술 스택 (Tech Stack)</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="기술 입력 (예: React, Spring Boot, MySQL, Docker 등) 후 추가"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    추가
                  </button>
                </div>

                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5">
                  {(formData.techStack || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 text-xs font-mono border border-slate-700 flex items-center space-x-1.5"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(t)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">해결하려 한 문제 상황 (Problem)</label>
                <textarea
                  rows={2}
                  placeholder="예: 학기 초 선착순 대여 시 동시성 충돌로 인한 중복 대여 문제 발생..."
                  value={formData.problemDescription || ''}
                  onChange={e => setFormData({ ...formData, problemDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Solution Description */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">기술적 해결 접근 (Solution)</label>
                <textarea
                  rows={2}
                  placeholder="예: 비관적 락(Pessimistic Lock)과 JPA 페치 조인을 적용하여..."
                  value={formData.solutionDescription || ''}
                  onChange={e => setFormData({ ...formData, solutionDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Result Description */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">성과 및 배운 점 (Result)</label>
                <textarea
                  rows={2}
                  placeholder="예: 500 TPS 동시성 테스트 통과, 쿼리 수 41회->1회 단축 및 A+ 성적 획득..."
                  value={formData.resultDescription || ''}
                  onChange={e => setFormData({ ...formData, resultDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Key Features */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">주요 구현 기능 목록</label>
                  <button
                    type="button"
                    onClick={handleAddFeatureField}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    + 항목 추가
                  </button>
                </div>
                <div className="space-y-2">
                  {(formData.keyFeatures || []).map((feat, idx) => (
                    <div key={idx} className="flex space-x-2">
                      <input
                        type="text"
                        placeholder={`기능 ${idx + 1}`}
                        value={feat}
                        onChange={e => handleFeatureChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm"
                      />
                      {(formData.keyFeatures || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFeatureField(idx)}
                          className="px-2 text-slate-400 hover:text-rose-400 text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">GitHub Repo URL</label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl || ''}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Live Demo URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.demoUrl || ''}
                  onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Troubleshooting Markdown & STAR */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 mb-1 font-medium">트러블슈팅 스토리 (Markdown 지원)</label>
                <textarea
                  rows={4}
                  placeholder="문제 발생 원인, 분석 도구, 해결 과정, 배운 점 등을 마크다운으로 자유롭게 작성하세요."
                  value={formData.troubleshootingStory || ''}
                  onChange={e => setFormData({ ...formData, troubleshootingStory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                />
              </div>

              {/* Featured checkbox */}
              <div className="sm:col-span-2 flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredProjectCheckbox"
                  checked={!!formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="featuredProjectCheckbox" className="text-sm font-medium text-slate-300 flex items-center space-x-1 cursor-pointer">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span>대표 프로젝트로 메인 상단에 강조 표시</span>
                </label>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveProject}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30"
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
