import React, { useState } from 'react';
import { 
  Github, 
  Globe, 
  Mail, 
  Edit3, 
  Award, 
  FolderGit2, 
  Cpu, 
  Check, 
  X,
  ExternalLink,
  MessageSquareCode,
  Sparkles,
  FileEdit
} from 'lucide-react';
import { UserProfile, ProjectItem, TechSkill, DevLog } from '../types';

interface ProfileHeroProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  projects: ProjectItem[];
  skills: TechSkill[];
  devLogs: DevLog[];
  coverLettersCount?: number;
  onOpenAiCoach: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  profile,
  onUpdateProfile,
  projects,
  skills,
  devLogs,
  coverLettersCount = 0,
  onOpenAiCoach,
  onNavigateTab
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);

  const featuredProjectsCount = projects.filter(p => p.featured).length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-b border-zinc-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Profile Info Row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* Left: User Identity */}
          <div className="space-y-3.5 max-w-3xl">
            {/* Academic Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium">
                {profile.university} {profile.department}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium">
                {profile.currentSemester}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 text-white text-xs font-mono font-bold">
                GPA {profile.gpa}
              </span>
              {profile.solvedAcTier && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-mono font-bold">
                  {profile.solvedAcTier} ({profile.solvedCount} Solved)
                </span>
              )}
            </div>

            {/* Name & Edit Button */}
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                {profile.name} <span className="text-base font-normal text-zinc-400">({profile.englishName})</span>
              </h1>
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(true);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                title="프로필 정보 수정"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Role */}
            <p className="text-sm font-bold text-zinc-900 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{profile.targetRole}</span>
            </p>

            {/* Bio */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 font-medium transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {profile.blogUrl && (
                <a
                  href={profile.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 font-medium transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Tech Blog</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{profile.email}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Clean Quick Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 min-w-[240px]">
            
            <div 
              onClick={() => onNavigateTab('projects')}
              className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-medium text-zinc-500">프로젝트</span>
                <FolderGit2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-lg font-bold text-zinc-900">{projects.length}</span>
                <span className="text-[11px] text-zinc-400">개</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('coverletter')}
              className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-medium text-zinc-500">자기소개서</span>
                <FileEdit className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-lg font-bold text-zinc-900">{coverLettersCount}</span>
                <span className="text-[11px] text-zinc-400">건</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('skills')}
              className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-medium text-zinc-500">기술 스택</span>
                <Cpu className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-lg font-bold text-zinc-900">{skills.length}</span>
                <span className="text-[11px] text-zinc-400">개</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('logs')}
              className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-[11px] font-medium text-zinc-500">트러블슈팅</span>
                <MessageSquareCode className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-lg font-bold text-zinc-900">{devLogs.length}</span>
                <span className="text-[11px] text-zinc-400">편</span>
              </div>
            </div>

          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl text-slate-900 shadow-2xl p-6 space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900">프로필 정보 수정</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">이름</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">영문 이름</label>
                    <input
                      type="text"
                      value={formData.englishName}
                      onChange={e => setFormData({ ...formData, englishName: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">대학교</label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={e => setFormData({ ...formData, university: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">학과/전공</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">구분 / 학년</label>
                    <input
                      type="text"
                      value={formData.currentSemester}
                      onChange={e => setFormData({ ...formData, currentSemester: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                      placeholder="예: 2학년 / 3학년 / 4학년 취준생"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">목표 직무</label>
                    <input
                      type="text"
                      value={formData.targetRole}
                      onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">누적 학점 (GPA)</label>
                    <input
                      type="text"
                      value={formData.gpa}
                      onChange={e => setFormData({ ...formData, gpa: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700">이메일</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">GitHub 주소</label>
                    <input
                      type="text"
                      value={formData.githubUrl}
                      onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700">블로그 주소</label>
                    <input
                      type="text"
                      value={formData.blogUrl}
                      onChange={e => setFormData({ ...formData, blogUrl: e.target.value })}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700">자기소개 / 포부</label>
                  <textarea
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-300 bg-white text-slate-900 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center space-x-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>저장하기</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
