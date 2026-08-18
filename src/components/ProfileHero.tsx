import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Github, 
  Globe, 
  Award, 
  Flame, 
  Calendar, 
  Code2, 
  Edit3, 
  Check, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  BookMarked
} from 'lucide-react';
import { UserProfile, ProjectItem, CourseworkSubject, TechSkill, SemesterGoal } from '../types';

interface ProfileHeroProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  projects: ProjectItem[];
  courseworks: CourseworkSubject[];
  skills: TechSkill[];
  goals: SemesterGoal[];
  onOpenAiCoach: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  profile,
  onUpdateProfile,
  projects,
  courseworks,
  skills,
  goals,
  onOpenAiCoach,
  onNavigateTab
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>({ ...profile });

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  // Calculations
  const completedGoals = goals.filter(g => g.progress === 100 || g.isCompleted).length;
  const overallGoalProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0;

  const completedCourses = courseworks.filter(c => c.semester !== '2학년 2학기 (수강예정)').length;
  const upcomingCourses = courseworks.filter(c => c.semester === '2학년 2학기 (수강예정)').length;
  const featuredProjects = projects.filter(p => p.featured).length;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-100 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Profile Info & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Student Bio & Identity (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profile.university} {profile.department}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{profile.currentSemester}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>GPA {profile.gpa}</span>
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-indigo-300 transition-colors ml-auto"
                title="프로필 기본정보 수정"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>프로필 편집</span>
              </button>
            </div>

            {/* Name and Target Role */}
            <div>
              <div className="flex items-baseline space-x-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="text-lg text-slate-400 font-medium">{profile.englishName}</span>
              </div>
              <p className="mt-1.5 text-base sm:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                {profile.targetRole}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Tags / Interests */}
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.interests.map((interest, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs border border-slate-700/60 flex items-center space-x-1"
                >
                  <span className="text-indigo-400">#</span>
                  <span>{interest}</span>
                </span>
              ))}
            </div>

            {/* Contact & Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{profile.email}</span>
              </a>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.blogUrl && (
                <a
                  href={profile.blogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Tech Blog</span>
                </a>
              )}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Solved.ac: <strong>{profile.solvedAcTier}</strong> ({profile.solvedCount}제)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats & 2-2 Semester Focus Box (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 2nd Semester Strategic Focus Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">2학년 2학기 핵심 목표 현황</h3>
                    <p className="text-xs text-indigo-300">CS 전공 심화 & 주력 포트폴리오 완성기</p>
                  </div>
                </div>
                <span className="text-base font-extrabold text-indigo-400">{overallGoalProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-4 border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${overallGoalProgress}%` }}
                ></div>
              </div>

              {/* Quick Checklist snapshot */}
              <div className="space-y-2 mb-4">
                {goals.slice(0, 3).map((g) => (
                  <div key={g.id} className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${g.isCompleted || g.progress === 100 ? 'bg-emerald-400' : 'bg-indigo-400'}`}></span>
                      <span className="text-slate-200 truncate">{g.title}</span>
                    </div>
                    <span className="text-slate-400 font-mono flex-shrink-0">{g.progress}%</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onNavigateTab('roadmap')}
                  className="text-xs text-indigo-300 hover:text-indigo-200 font-medium inline-flex items-center space-x-1"
                >
                  <span>로드맵 전체보기 ({goals.length}개 목표)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onOpenAiCoach}
                  className="text-xs bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-500/40 inline-flex items-center space-x-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>AI 맞춤 조언</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => onNavigateTab('projects')}
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-indigo-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>프로젝트</span>
                  <Code2 className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xl font-bold text-white">{projects.length}</span>
                  <span className="text-xs text-indigo-400">({featuredProjects} 대표)</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigateTab('coursework')}
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>전공 교과목</span>
                  <BookMarked className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xl font-bold text-white">{completedCourses}</span>
                  <span className="text-xs text-emerald-400">+{upcomingCourses}예정</span>
                </div>
              </div>

              <div 
                onClick={() => onNavigateTab('skills')}
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 hover:border-sky-500/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>보유 기술</span>
                  <Cpu className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xl font-bold text-white">{skills.length}</span>
                  <span className="text-xs text-sky-400">스택</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Semester Timeline Step Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>소프트웨어학과 학업 & 커리어 타임라인</span>
            </span>
            <span className="text-xs text-emerald-400 font-medium">
              👉 현재 시점: 2학년 2학기 진학
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">1학년 (기초 다지기)</span>
                <span className="text-[10px] text-emerald-400 font-mono">완료 (4.20)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">C언어, OOP(C++/Java), Git 협업, 이산수학</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">2학년 1학기 (CS 코어)</span>
                <span className="text-[10px] text-emerald-400 font-mono">완료 (4.15)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">자료구조(RB-Tree), 컴퓨터구조, Spring Boot</p>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/70 border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/10 relative">
              <div className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[9px] font-bold tracking-wider uppercase">
                Now
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-indigo-200">2학년 2학기 (도약기)</span>
                <span className="text-[10px] text-amber-300 font-mono">목표 4.3+</span>
              </div>
              <p className="text-indigo-300 text-[11px] leading-relaxed">알고리즘, 운영체제, DB, 실시간 주력 프로젝트</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 opacity-75">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-400">3학년 (심화 & 인턴)</span>
                <span className="text-[10px] text-slate-500 font-mono">로드맵</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">네트워크, 분산 시스템, 인턴십 지원, 캡스톤</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 text-slate-100 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-indigo-400" />
                <span>프로필 정보 수정</span>
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                닫기
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">이름</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">영문 이름</label>
                <input
                  type="text"
                  value={editForm.englishName}
                  onChange={e => setEditForm({ ...editForm, englishName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">대학교</label>
                <input
                  type="text"
                  value={editForm.university}
                  onChange={e => setEditForm({ ...editForm, university: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">학과/전공</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={e => setEditForm({ ...editForm, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">현재 학기</label>
                <input
                  type="text"
                  value={editForm.currentSemester}
                  onChange={e => setEditForm({ ...editForm, currentSemester: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">누적 학점 (GPA)</label>
                <input
                  type="text"
                  value={editForm.gpa}
                  onChange={e => setEditForm({ ...editForm, gpa: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1 font-medium">목표 직무 / 포지션</label>
                <input
                  type="text"
                  value={editForm.targetRole}
                  onChange={e => setEditForm({ ...editForm, targetRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-400 mb-1 font-medium">자기소개 / 개발자 소개글</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">이메일</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">GitHub URL</label>
                <input
                  type="text"
                  value={editForm.githubUrl}
                  onChange={e => setEditForm({ ...editForm, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">기술 블로그 URL</label>
                <input
                  type="text"
                  value={editForm.blogUrl}
                  onChange={e => setEditForm({ ...editForm, blogUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Solved.ac 티어 & 문제 수</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={editForm.solvedAcTier}
                    onChange={e => setEditForm({ ...editForm, solvedAcTier: e.target.value })}
                    placeholder="Gold IV"
                    className="w-1/2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    value={editForm.solvedCount}
                    onChange={e => setEditForm({ ...editForm, solvedCount: parseInt(e.target.value) || 0 })}
                    placeholder="280"
                    className="w-1/2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>저장 완료</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
