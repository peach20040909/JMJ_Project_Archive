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
  Sparkles
} from 'lucide-react';
import { UserProfile, ProjectItem, TechSkill, DevLog } from '../types';

interface ProfileHeroProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  projects: ProjectItem[];
  skills: TechSkill[];
  devLogs: DevLog[];
  onOpenAiCoach: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  profile,
  onUpdateProfile,
  projects,
  skills,
  devLogs,
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
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Profile Info Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: User Identity */}
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold font-mono">
                {profile.university} {profile.department}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                {profile.currentSemester}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                GPA {profile.gpa}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile.name} <span className="text-lg font-normal text-slate-500">({profile.englishName})</span>
              </h1>
              <button
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="프로필 정보 수정"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm sm:text-base font-semibold text-indigo-600">
              {profile.targetRole}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {profile.bio}
            </p>

            {/* Social & Contact Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-medium shadow-sm transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
              {profile.blogUrl && (
                <a
                  href={profile.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-medium shadow-sm transition-all"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tech Blog</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-medium shadow-sm transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{profile.email}</span>
                </a>
              )}
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 font-medium text-xs">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Solved.ac {profile.solvedAcTier} ({profile.solvedCount}제)</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 min-w-[280px]">
            
            <div 
              onClick={() => onNavigateTab('projects')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold">전체 프로젝트</span>
                <FolderGit2 className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-xl font-black text-slate-900">{projects.length}</span>
                <span className="text-xs text-slate-500">개 아카이빙</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('projects')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold">대표 프로젝트</span>
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-xl font-black text-slate-900">{featuredProjectsCount}</span>
                <span className="text-xs text-slate-500">개 선정</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('skills')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold">기술 스택</span>
                <Cpu className="w-4 h-4 text-violet-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-xl font-black text-slate-900">{skills.length}</span>
                <span className="text-xs text-slate-500">개 보유</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigateTab('logs')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold">트러블슈팅 일지</span>
                <MessageSquareCode className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="mt-1 flex items-baseline space-x-1">
                <span className="text-xl font-black text-slate-900">{devLogs.length}</span>
                <span className="text-xs text-slate-500">편 작성</span>
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
