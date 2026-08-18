import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  FileText, 
  Check, 
  Copy, 
  X, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { UserProfile, ProjectItem, CourseworkSubject, TechSkill, SemesterGoal, DevLog } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  projects: ProjectItem[];
  courseworks: CourseworkSubject[];
  skills: TechSkill[];
  goals: SemesterGoal[];
  devLogs: DevLog[];
  onImportData: (data: any) => void;
  onResetData: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  courseworks,
  skills,
  goals,
  devLogs,
  onImportData,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'json' | 'import'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate clean Markdown for GitHub Profile or Notion
  const generateMarkdown = () => {
    return `# 👨‍💻 ${profile.name} (${profile.englishName}) - Portfolio Archive
> ${profile.targetRole} | ${profile.department} ${profile.currentSemester} (GPA: ${profile.gpa})

## 📌 Introduction
${profile.bio}

- 📧 **Email**: ${profile.email}
- 🐙 **GitHub**: ${profile.githubUrl}
- ✍️ **Blog**: ${profile.blogUrl}
- 🔥 **Solved.ac**: ${profile.solvedAcTier} (${profile.solvedCount} Solved)

---

## 🛠️ Tech Stack & Skills
${skills.map(s => `- **${s.name}** (${s.category} / ${s.level}): ${s.experience}`).join('\n')}

---

## 🚀 Featured Projects
${projects.map(p => `### ${p.title} (${p.period})
- **Category**: ${p.category} | **Role**: ${p.role} (${p.teamType})
- **Tech Stack**: ${p.techStack.join(', ')}
- **Summary**: ${p.summary}
${p.githubUrl ? `- **GitHub**: ${p.githubUrl}` : ''}
${p.demoUrl ? `- **Live Demo**: ${p.demoUrl}` : ''}

${p.starBullets && p.starBullets.length > 0 ? `**STAR Highlights:**\n${p.starBullets.map(b => `  - ${b}`).join('\n')}` : ''}
`).join('\n\n')}

---

## 🎓 CS Coursework & Academics
${courseworks.map(c => `- **${c.name}** [${c.semester}, ${c.credits}학점, 성적: ${c.grade}]
  - 핵심 개념: ${c.keyConcepts.join(', ')}
  ${c.review ? `  - 수강 소감: "${c.review}"` : ''}
`).join('\n')}

---

## 🎯 2학년 2학기 핵심 목표
${goals.map(g => `- [${g.progress === 100 ? 'x' : ' '}] **${g.title}** (${g.category}, 진행률: ${g.progress}%)
${g.milestones.map(m => `  - [${m.done ? 'x' : ' '}] ${m.text}`).join('\n')}
`).join('\n')}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Portfolio_${profile.name}_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const data = {
      profile,
      projects,
      courseworks,
      skills,
      goals,
      devLogs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DevArchive_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.projects) {
          onImportData(parsed);
          alert('데이터가 성공적으로 복원되었습니다.');
          onClose();
        } else {
          alert('올바른 DevArchive 백업 JSON 형식이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 파싱 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl text-slate-100 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">포트폴리오 내보내기 & 데이터 관리</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/60">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'markdown'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Markdown (GitHub / Notion용)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            JSON 데이터 백업
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            복원 & 초기화
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'markdown' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-slate-400">
                  GitHub Profile README 또는 Notion 포트폴리오로 바로 복사하여 붙여넣을 수 있는 마크다운 텍스트입니다.
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1 font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사 완료!' : '클립보드 복사'}</span>
                  </button>
                  <button
                    onClick={handleDownloadMarkdown}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1 font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.md 파일 다운로드</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={generateMarkdown()}
                rows={14}
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs focus:outline-none"
              />
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-slate-300 space-y-2">
                <h4 className="font-bold text-white">전체 아카이브 데이터 JSON 백업</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  프로필, 등록된 모든 프로젝트, 전공 교과목 및 학점, 보유 기술 스택, 2학기 목표 마일스톤, 트러블슈팅 일지를 단일 JSON 파일로 안전하게 백업합니다.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleDownloadJson}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>전체 데이터 백업 파일 다운로드 (.json)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-6">
              {/* Import File */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
                <h4 className="font-bold text-white flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>백업 파일 복원 (Restore)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  이전에 저장해 둔 DevArchive JSON 백업 파일을 선택하여 데이터를 복원합니다.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
              </div>

              {/* Reset to Seed Data */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>초기 데모 데이터로 되돌리기</span>
                </div>
                <p className="text-xs text-slate-400">
                  소프트웨어학과 2학년 2학기 기본 템플릿 데이터로 전체 아카이브를 초기화합니다.
                </p>
                <button
                  onClick={() => {
                    if (confirm('정말로 모든 데이터를 초기 샘플 데이터로 리셋하시겠습니까?')) {
                      onResetData();
                      alert('데이터가 초기화되었습니다.');
                      onClose();
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기 데이터로 리셋</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
