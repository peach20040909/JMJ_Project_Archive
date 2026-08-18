import React, { useState } from 'react';
import { 
  FileEdit, 
  Sparkles, 
  Plus, 
  Building2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  FolderGit2, 
  HelpCircle, 
  Lightbulb, 
  ArrowRight, 
  Loader2, 
  X,
  Target,
  MessageSquare,
  Share2,
  Calendar
} from 'lucide-react';
import { CoverLetterItem, ProjectItem, UserProfile } from '../types';

interface CoverLetterSectionProps {
  coverLetters: CoverLetterItem[];
  projects: ProjectItem[];
  profile: UserProfile;
  onAddCoverLetter: (cl: CoverLetterItem) => void;
  onUpdateCoverLetter: (cl: CoverLetterItem) => void;
  onDeleteCoverLetter: (id: string) => void;
}

const QUESTION_TEMPLATES = [
  {
    category: '기술적 도전 및 문제해결',
    title: '기술적 난관 극복 & 트러블슈팅',
    question: '본인이 수행한 프로젝트 중 가장 기술적으로 도전적이었던 문제와, 이를 해결하기 위해 시도한 구체적인 과정 및 정량적/정성적 결과를 기술해 주십시오. (1,000자 이내)'
  },
  {
    category: '지원동기 및 직무역량',
    title: '직무 전문성 및 지원 동기',
    question: '해당 직무(엔지니어링)에 지원하게 된 계기와, 이를 위해 꾸준히 준비해 온 프로젝트 경험 및 핵심 기술 역량을 구체적으로 기술해 주십시오. (800자 이내)'
  },
  {
    category: '주도적 학습 및 성장',
    title: 'CS 기초 원리 탐구 & 기술 습득',
    question: '기존의 익숙한 방식에서 벗어나 새로운 기술이나 컴퓨터공학 기초 원리를 밑바닥부터 깊이 파고들어 학습하고 프로젝트에 적용한 경험을 서술해 주십시오. (800자 이내)'
  },
  {
    category: '협업 및 갈등해결',
    title: '팀 프로젝트 협업 및 소통',
    question: '팀 프로젝트를 진행하며 기술적 견해 차이나 예상치 못한 난관에 부딪혔을 때, 이를 어떻게 조율하고 성공적으로 이끌어냈는지 구체적 사례를 들어 기술해 주십시오. (1,000자 이내)'
  }
];

export const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({
  coverLetters,
  projects,
  profile,
  onAddCoverLetter,
  onUpdateCoverLetter,
  onDeleteCoverLetter
}) => {
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('All');
  const [activeLetterId, setActiveLetterId] = useState<string>(coverLetters[0]?.id || '');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<CoverLetterItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [companyName, setCompanyName] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>(profile.targetRole || '백엔드 개발자 인턴');
  const [questionCategory, setQuestionCategory] = useState<any>('기술적 도전 및 문제해결');
  const [question, setQuestion] = useState<string>('');
  const [linkedProjectIds, setLinkedProjectIds] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');
  const [targetCharCount, setTargetCharCount] = useState<number>(1000);
  const [memo, setMemo] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [interviewTips, setInterviewTips] = useState<string[]>([]);
  const [keyStrengths, setKeyStrengths] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Companies List for Filter
  const companies = ['All', ...Array.from(new Set(coverLetters.map(c => c.companyName)))];
  const filteredLetters = selectedCompanyFilter === 'All'
    ? coverLetters
    : coverLetters.filter(c => c.companyName === selectedCompanyFilter);

  const currentActive = coverLetters.find(c => c.id === activeLetterId) || filteredLetters[0];

  const handleOpenNewModal = (template?: any) => {
    setEditingItem(null);
    setCompanyName('');
    setTargetRole(profile.targetRole || '백엔드 / 풀스택 엔지니어 인턴');
    setQuestionCategory(template ? template.category : '기술적 도전 및 문제해결');
    setQuestion(template ? template.question : (QUESTION_TEMPLATES[0].question));
    setLinkedProjectIds(projects.slice(0, 1).map(p => p.id));
    setContent('');
    setTargetCharCount(template?.category === '지원동기 및 직무역량' ? 800 : 1000);
    setMemo('');
    setCustomNotes('');
    setInterviewTips([]);
    setKeyStrengths([]);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (item: CoverLetterItem) => {
    setEditingItem(item);
    setCompanyName(item.companyName);
    setTargetRole(item.targetRole);
    setQuestionCategory(item.questionCategory);
    setQuestion(item.question);
    setLinkedProjectIds(item.linkedProjectIds || []);
    setContent(item.content);
    setTargetCharCount(item.targetCharCount || 1000);
    setMemo(item.memo || '');
    setCustomNotes('');
    setInterviewTips(item.interviewTips || []);
    setKeyStrengths(item.keyStrengths || []);
    setIsEditorOpen(true);
  };

  const toggleProjectSelection = (id: string) => {
    setLinkedProjectIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  // AI Generator
  const handleGenerateWithAi = async () => {
    if (!question.trim()) {
      alert('자기소개서 문항을 입력해주세요.');
      return;
    }

    const selectedProjectsData = projects.filter(p => linkedProjectIds.includes(p.id));
    if (selectedProjectsData.length === 0) {
      alert('자기소개서 작성의 근거가 될 프로젝트를 최소 1개 이상 선택해주세요.');
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName || 'IT 기업',
          targetRole,
          question,
          questionCategory,
          targetCharCount,
          selectedProjects: selectedProjectsData,
          studentProfile: {
            name: profile.name,
            university: profile.university,
            department: profile.department,
            bio: profile.bio
          },
          customNotes
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setContent(data.content || '');
        if (data.interviewTips && data.interviewTips.length > 0) {
          setInterviewTips(data.interviewTips);
        }
        if (data.keyStrengths && data.keyStrengths.length > 0) {
          setKeyStrengths(data.keyStrengths);
        }
      } else {
        alert(data.error || 'AI 자기소개서 생성에 실패했습니다.');
      }
    } catch (err) {
      alert('AI 서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!companyName.trim()) {
      alert('지원 기업명을 입력해주세요.');
      return;
    }
    if (!question.trim()) {
      alert('자기소개서 문항을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('자기소개서 본문을 입력하거나 AI로 생성해주세요.');
      return;
    }

    const newItem: CoverLetterItem = {
      id: editingItem ? editingItem.id : `cl-${Date.now()}`,
      companyName,
      targetRole,
      questionCategory,
      question,
      linkedProjectIds,
      content,
      targetCharCount,
      memo,
      interviewTips,
      keyStrengths,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingItem) {
      onUpdateCoverLetter(newItem);
    } else {
      onAddCoverLetter(newItem);
      setActiveLetterId(newItem.id);
    }
    setIsEditorOpen(false);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Live Character Counters
  const charWithSpaces = (str: string) => str.length;
  const charWithoutSpaces = (str: string) => str.replace(/\s/g, '').length;

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-purple-50/60 border border-indigo-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
              AI Cover Letter Lab
            </span>
            <span className="text-xs text-indigo-700 font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>프로젝트 기반 자기소개서 & 면접 대비</span>
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            개발자 자기소개서 & 면접 질문 시뮬레이터
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            내가 등록해 둔 {projects.length}개 프로젝트의 기술 스택, 아키텍처, 트러블슈팅 수치를 자동으로 참조하여 인턴/공채 합격 자기소개서를 생성하고 면접관의 꼬리 질문을 사전에 대비하세요.
          </p>
        </div>

        <button
          onClick={() => handleOpenNewModal()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition-all hover:scale-105 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>새 자기소개서 작성하기</span>
        </button>
      </div>

      {/* Quick Template Presets */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 flex items-center space-x-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>테크 기업 단골 자소서 문항 템플릿:</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUESTION_TEMPLATES.map((tmpl, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenNewModal(tmpl)}
              className="p-3.5 rounded-xl bg-white hover:bg-indigo-50/50 border border-slate-200/90 hover:border-indigo-300 shadow-sm transition-all cursor-pointer space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {tmpl.category}
                </span>
                <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs group-hover:text-indigo-600 transition-colors">
                {tmpl.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {tmpl.question}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Left List (4 cols) & Right Detail View (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Saved Cover Letters List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>저장된 자소서 ({coverLetters.length}개)</span>
              </h3>
              <button
                onClick={() => handleOpenNewModal()}
                className="p-1 rounded-lg hover:bg-slate-100 text-indigo-600 font-bold text-xs"
              >
                + 추가
              </button>
            </div>

            {/* Company Filter Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {companies.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCompanyFilter(c)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCompanyFilter === c
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-2 pt-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredLetters.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  작성된 자기소개서가 없습니다.
                </div>
              ) : (
                filteredLetters.map(letter => {
                  const isCurrent = (currentActive?.id === letter.id);
                  const wordCount = charWithSpaces(letter.content);
                  const linkedProjects = projects.filter(p => letter.linkedProjectIds?.includes(p.id));

                  return (
                    <div
                      key={letter.id}
                      onClick={() => setActiveLetterId(letter.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isCurrent
                          ? 'bg-indigo-50/70 border-indigo-300 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 text-xs truncate">
                          {letter.companyName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {letter.updatedAt}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-indigo-700 block">
                          [{letter.questionCategory}]
                        </span>
                        <h5 className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-medium">
                          {letter.question}
                        </h5>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="font-mono">
                          {wordCount}자 / {letter.targetCharCount}자
                        </span>
                        <span className="text-indigo-600 font-bold truncate max-w-[120px]">
                          {linkedProjects.map(p => p.title.split('-')[0].trim()).join(', ') || '프로젝트 연동'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right: Active Detail View & Analysis (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentActive ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                      {currentActive.companyName}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {currentActive.targetRole}
                    </span>
                    <span className="text-xs text-slate-400">• {currentActive.questionCategory}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1.5 leading-snug">
                    {currentActive.question}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopyText(currentActive.content, currentActive.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedId === currentActive.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>전체 복사</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(currentActive)}
                    className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center space-x-1 transition-colors"
                    title="수정하기"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`'${currentActive.companyName}' 자기소개서를 삭제하시겠습니까?`)) {
                        onDeleteCoverLetter(currentActive.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Linked Projects Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
                  <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>기반 프로젝트:</span>
                </span>
                {projects
                  .filter(p => currentActive.linkedProjectIds?.includes(p.id))
                  .map(p => (
                    <span
                      key={p.id}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200 flex items-center space-x-1.5"
                    >
                      <span className="font-bold">{p.title}</span>
                      <span className="text-indigo-600 font-mono text-[11px]">({p.techStack.slice(0, 2).join(', ')})</span>
                    </span>
                  ))}
              </div>

              {/* Live Character Count Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-700">
                      공백 포함: <strong className="text-indigo-600 text-sm">{charWithSpaces(currentActive.content)}</strong>자
                    </span>
                    <span className="text-slate-500">
                      공백 제외: <strong>{charWithoutSpaces(currentActive.content)}</strong>자
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono">
                    목표: {currentActive.targetCharCount}자 ({Math.round((charWithSpaces(currentActive.content) / currentActive.targetCharCount) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      charWithSpaces(currentActive.content) > currentActive.targetCharCount
                        ? 'bg-rose-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${Math.min(100, (charWithSpaces(currentActive.content) / currentActive.targetCharCount) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  자기소개서 본문
                </span>
                <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans selection:bg-indigo-100">
                  {currentActive.content}
                </div>
              </div>

              {/* Highlighted Key Strengths */}
              {currentActive.keyStrengths && currentActive.keyStrengths.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>이 답변에서 어필되는 핵심 엔지니어링 강점</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {currentActive.keyStrengths.map((str, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs font-medium text-emerald-900 flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Expected Interview Follow-up Questions (면접관 예상 질문) */}
              {currentActive.interviewTips && currentActive.interviewTips.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-amber-700" />
                    <h4 className="font-bold text-amber-950 text-sm">
                      면접관 심층 기술 꼬리 질문 대비 (AI Interview Prep)
                    </h4>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    면접관은 자소서에 언급된 프로젝트와 기술 스택의 트레이드오프를 파고듭니다. 다음 질문들에 대한 논리적 답변을 준비하세요:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-800">
                    {currentActive.interviewTips.map((tip, idx) => (
                      <li key={idx} className="p-2.5 rounded-lg bg-white border border-amber-200/80 font-medium flex items-start space-x-2">
                        <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Memo */}
              {currentActive.memo && (
                <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 text-xs space-y-1">
                  <span className="font-bold text-slate-700">개인 메모:</span>
                  <p>{currentActive.memo}</p>
                </div>
              )}

            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
              <FileEdit className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-base">선택된 자기소개서가 없습니다</h4>
                <p className="text-xs text-slate-500">
                  왼쪽 목록에서 자소서를 선택하거나 새로운 자기소개서를 작성해보세요.
                </p>
              </div>
              <button
                onClick={() => handleOpenNewModal()}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                + 새 자기소개서 작성
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Editor & AI Generator Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl text-slate-800 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingItem ? '자기소개서 수정 및 AI 다듬기' : '프로젝트 기반 AI 자기소개서 작성'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    프로젝트 아카이브의 실제 기술 데이터와 트러블슈팅 경험을 바탕으로 작성합니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              
              {/* Row 1: Target Company & Target Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    지원 기업명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="예: 카카오, 네이버, 토스, 라인, 쿠팡, 스타트업 인턴"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    지원 직무 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="예: 백엔드 개발자 인턴 / 서버 엔지니어 / 풀스택 개발자"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
              </div>

              {/* Row 2: Question Category & Target Length */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    문항 분류
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {[
                      '기술적 도전 및 문제해결',
                      '지원동기 및 직무역량',
                      '주도적 학습 및 성장',
                      '협업 및 갈등해결',
                      '자유 양식'
                    ].map(cat => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => {
                          setQuestionCategory(cat);
                          const matched = QUESTION_TEMPLATES.find(t => t.category === cat);
                          if (matched && !question) setQuestion(matched.question);
                        }}
                        className={`px-2.5 py-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                          questionCategory === cat
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">
                    목표 글자수 (공백포함)
                  </label>
                  <select
                    value={targetCharCount}
                    onChange={(e) => setTargetCharCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  >
                    <option value={500}>500자 내외</option>
                    <option value={800}>800자 내외</option>
                    <option value={1000}>1,000자 내외</option>
                    <option value={1500}>1,500자 내외</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Question Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">
                    자기소개서 문항 내용 <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex space-x-1">
                    {QUESTION_TEMPLATES.map((tmpl, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setQuestion(tmpl.question);
                          setQuestionCategory(tmpl.category);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold px-1.5 py-0.5 rounded hover:bg-indigo-50"
                      >
                        {tmpl.title} 예시
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="예: 본인이 경험한 프로젝트 중 가장 기술적으로 깊이 파고든 경험과 트러블슈팅 과정을 기술해 주십시오."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-xs"
                />
              </div>

              {/* Row 4: Project Selection (Crucial!) */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 flex items-center space-x-1.5">
                    <FolderGit2 className="w-4 h-4 text-indigo-600" />
                    <span>이 자소서에 반영할 프로젝트 선택 ({linkedProjectIds.length}개 선택됨)</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    * AI가 선택된 프로젝트의 기술 스택, 성과 수치, 트러블슈팅 스토리를 분석하여 문맥을 생성합니다.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {projects.map(proj => {
                    const isSelected = linkedProjectIds.includes(proj.id);
                    return (
                      <div
                        key={proj.id}
                        onClick={() => toggleProjectSelection(proj.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="space-y-0.5 truncate pr-2">
                          <div className="font-bold text-xs truncate">{proj.title}</div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {proj.category} • {proj.techStack.slice(0, 3).join(', ')}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: AI Generate Callout Banner & Trigger */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white space-y-3 shadow-md shadow-indigo-600/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm flex items-center space-x-1.5 text-white">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Gemini 3.7 Flash AI 자소서 & 면접 코칭 엔진</span>
                    </h4>
                    <p className="text-xs text-indigo-100">
                      선택한 프로젝트의 실제 문제-원인-해결(STAR) 데이터와 직무 키워드를 정밀 매칭합니다.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateWithAi}
                    disabled={isGenerating}
                    className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-amber-300 hover:text-slate-900 transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50 flex-shrink-0"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        <span>AI 분석 및 자소서 작성중...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>AI로 자소서 작성 및 면접 질문 추출</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Additional user note */}
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="추가 강조하고 싶은 점 (예: 데이터 정합성 100% 보장 수치와 JMeter 500 TPS 부하 테스트 경험을 집중 강조해줘)"
                  className="w-full px-3 py-2 rounded-lg bg-indigo-700/50 border border-indigo-400/40 text-white placeholder-indigo-200 text-xs focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>

              {/* Row 6: Cover Letter Content Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">
                    자기소개서 본문 <span className="text-rose-500">*</span>
                  </label>
                  <div className="text-xs font-semibold text-slate-500">
                    현재: <span className="text-indigo-600 font-bold">{charWithSpaces(content)}</span>자 (공백 제외 {charWithoutSpaces(content)}자) / 목표 {targetCharCount}자
                  </div>
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="AI 작성 버튼을 누르면 프로젝트를 기반으로 고품질 초안이 자동 작성되며, 직접 자유롭게 편집할 수 있습니다."
                  rows={9}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans text-xs sm:text-sm leading-relaxed"
                />
              </div>

              {/* Interview tips preview if present */}
              {interviewTips.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                  <span className="font-bold text-amber-900 text-xs flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                    <span>추출된 면접 예상 질문 ({interviewTips.length}개)</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                    {interviewTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Row 7: Personal Memo */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  개인 메모 / 면접 대비 노트
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="예: 2차 면접 시 비관적 락 vs 낙관적 락 트레이드오프 답변 준비하기"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20"
              >
                {editingItem ? '수정 사항 저장하기' : '자기소개서 저장하기'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
