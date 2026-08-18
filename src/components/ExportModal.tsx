import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Copy, 
  X, 
  AlertTriangle
} from 'lucide-react';
import { UserProfile, ProjectItem, TechSkill, DevLog, CoverLetterItem } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  projects: ProjectItem[];
  skills: TechSkill[];
  devLogs: DevLog[];
  coverLetters: CoverLetterItem[];
  onImportData: (data: any) => void;
  onResetData: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  skills,
  devLogs,
  coverLetters = [],
  onImportData,
  onResetData
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'json' | 'import'>('markdown');
  const [copied, setCopied] = useState(false);
  const [jsonText, setJsonText] = useState('');

  if (!isOpen) return null;

  const generateMarkdown = () => {
    return `# 👨‍💻 ${profile.name} (${profile.englishName}) - Software Portfolio & Job Prep Archive
> **${profile.targetRole}** | ${profile.university} ${profile.department} ${profile.currentSemester && `(${profile.currentSemester})`} ${profile.gpa && `GPA: ${profile.gpa}`}

## 📌 About Me
${profile.bio}

- 📧 **Email**: ${profile.email}
- 🐙 **GitHub**: ${profile.githubUrl}
- ✍️ **Blog**: ${profile.blogUrl}
- 🔥 **Solved.ac**: ${profile.solvedAcTier} (${profile.solvedCount} Solved)

---

## 🛠️ Tech Stack & Core Competencies
${skills.map(s => `- **${s.name}** (${s.category} / ${s.level}): ${s.experience}`).join('\n')}

---

## 🚀 Projects Archive
${projects.map(p => `### ${p.title} (${p.period})
- **분야**: ${p.category} | **역할**: ${p.role} (${p.teamType})
- **기술 스택**: ${p.techStack.join(', ')}
- **소개**: ${p.summary}
${p.githubUrl ? `- **GitHub**: ${p.githubUrl}` : ''}
${p.demoUrl ? `- **Live Demo**: ${p.demoUrl}` : ''}

${p.starBullets && p.starBullets.length > 0 ? `**STAR 이력서 성과 요약:**\n${p.starBullets.map(b => `  - ${b}`).join('\n')}` : ''}
${p.keyFeatures && p.keyFeatures.length > 0 ? `**주요 기능:**\n${p.keyFeatures.map(f => `  - ${f}`).join('\n')}` : ''}
`).join('\n\n')}

---

## ✍️ 인턴 & 채용 대비 자기소개서 (Cover Letters)
${coverLetters.map(c => `### [${c.companyName}] ${c.targetRole} - ${c.questionCategory}
**문항**: ${c.question}

${c.content}

${c.interviewTips && c.interviewTips.length > 0 ? `**면접 대비 예상 질문:**\n${c.interviewTips.map(t => `- ${t}`).join('\n')}` : ''}
`).join('\n\n')}

---

## 📝 Engineering & Dev Logs
${devLogs.map(l => `### [${l.category}] ${l.title} (${l.date})
- 태그: ${l.tags.map(t => `#${t}`).join(' ')}

${l.content}
`).join('\n\n')}
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
      skills,
      devLogs,
      coverLetters,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JMJ_Archive_Backup_${new Date().toISOString().split('T')[0]}.json`;
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
          alert('올바른 JMJ_Archive 백업 JSON 형식이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 파싱 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl text-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">포트폴리오 내보내기 & 데이터 관리</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'markdown'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Markdown (GitHub / Notion용)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            JSON 데이터 백업
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
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
                <p className="text-slate-600">
                  GitHub Profile README 또는 Notion 포트폴리오로 바로 복사하여 붙여넣을 수 있는 마크다운 텍스트입니다.
                </p>
                <div className="flex space-x-2 flex-shrink-0">
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1 font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사 완료!' : '클립보드 복사'}</span>
                  </button>
                  <button
                    onClick={handleDownloadMarkdown}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-1 font-semibold transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.md 파일 다운로드</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={generateMarkdown()}
                rows={13}
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs focus:outline-none"
              />
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-slate-700 space-y-2">
                <h4 className="font-bold text-slate-900">전체 아카이브 데이터 JSON 백업</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  프로필, 등록된 모든 프로젝트, 보유 기술 스택 매트릭스, AI 자기소개서, 트러블슈팅 일지를 단일 JSON 파일로 안전하게 백업합니다.
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleDownloadJson}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center space-x-2 shadow-sm transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>전체 데이터 백업 파일 다운로드 (.json)</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>백업 파일 업로드로 복원</span>
                </h4>
                <p className="text-xs text-slate-500">
                  이전에 저장해 둔 JMJ_Archive JSON 백업 파일(.json)을 선택하여 데이터를 복원합니다.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
              </div>

              {/* Direct Paste JSON Text */}
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                  <Copy className="w-4 h-4 text-indigo-600" />
                  <span>JSON 텍스트 직접 붙여넣기로 복원</span>
                </h4>
                <p className="text-xs text-slate-600">
                  다른 창이나 백업 파일에서 복사한 JSON 텍스트를 아래에 바로 붙여넣어 즉시 적용할 수 있습니다.
                </p>
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  placeholder='{"profile": {...}, "projects": [...]}'
                  rows={4}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (!jsonText.trim()) {
                      alert('붙여넣을 JSON 텍스트를 입력해주세요.');
                      return;
                    }
                    try {
                      const parsed = JSON.parse(jsonText);
                      if (parsed.profile || parsed.projects) {
                        onImportData(parsed);
                        alert('데이터가 성공적으로 적용되었습니다!');
                        onClose();
                      } else {
                        alert('올바른 JMJ_Archive 백업 JSON 형식이 아닙니다.');
                      }
                    } catch (e) {
                      alert('JSON 형식이 올바르지 않습니다. 복사한 텍스트를 다시 확인해주세요.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>JSON 데이터 즉시 적용하기</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
                <div className="flex items-center space-x-2 text-rose-700 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>초기 데이터로 되돌리기</span>
                </div>
                <p className="text-xs text-slate-500">
                  기본 템플릿 데이터로 전체 포트폴리오 아카이브를 초기화합니다.
                </p>
                <button
                  onClick={() => {
                    if (confirm('정말로 모든 데이터를 초기 샘플 데이터로 리셋하시겠습니까?')) {
                      onResetData();
                      alert('데이터가 초기화되었습니다.');
                      onClose();
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>초기 데이터로 리셋</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
