import React from 'react';
import { 
  Github, 
  Globe, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Award, 
  BookOpen, 
  Layers, 
  Printer, 
  FolderGit2, 
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { UserProfile, ProjectItem, CourseworkSubject, TechSkill } from '../types';

interface PublicPortfolioViewProps {
  profile: UserProfile;
  projects: ProjectItem[];
  courseworks: CourseworkSubject[];
  skills: TechSkill[];
  onBackToArchive: () => void;
}

export const PublicPortfolioView: React.FC<PublicPortfolioViewProps> = ({
  profile,
  projects,
  courseworks,
  skills,
  onBackToArchive
}) => {
  const featuredProjects = projects.filter(p => p.featured);
  const featuredSkills = skills.filter(s => s.featured);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation & Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <button
            onClick={onBackToArchive}
            className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white flex items-center space-x-1"
          >
            <span>← 아카이브 관리 모드로 돌아가기</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
              공개 포트폴리오 뷰 (Recruiter Mode)
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / 인쇄 출력</span>
            </button>
          </div>
        </div>

        {/* 1. Header / Intro Profile */}
        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-mono text-xs mb-2 border border-indigo-500/20">
                {profile.university} {profile.department} • {profile.currentSemester} (GPA: {profile.gpa})
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
                {profile.name} <span className="text-lg font-normal text-slate-400">({profile.englishName})</span>
              </h1>
              <p className="text-lg text-indigo-400 font-semibold mt-1">
                {profile.targetRole}
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap gap-2 text-xs">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {profile.blogUrl && (
                <a
                  href={profile.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Blog</span>
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{profile.email}</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-sm text-slate-300 leading-relaxed print:bg-slate-50 print:text-slate-800">
            {profile.bio}
          </div>
        </header>

        {/* 2. Core CS Skills & Competencies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center space-x-2 print:text-black">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>기술 스택 & 핵심 역량</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredSkills.map(skill => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-1 print:bg-slate-50 print:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm print:text-black">{skill.name}</span>
                  <span className="text-xs text-indigo-400 font-mono font-semibold">{skill.level}</span>
                </div>
                {skill.experience && (
                  <p className="text-xs text-slate-400 leading-relaxed print:text-slate-600">
                    {skill.experience}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Projects (STAR Format) */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center space-x-2 print:text-black">
            <FolderGit2 className="w-5 h-5 text-indigo-400" />
            <span>주요 프로젝트 아카이브</span>
          </h2>

          <div className="space-y-6">
            {featuredProjects.map(project => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 print:bg-white print:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{project.period}</span>
                      <span className="text-xs text-slate-400">• {project.role} ({project.teamType})</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1 print:text-black">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {project.summary}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700/60 print:bg-slate-100 print:text-black"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* STAR Bullets */}
                {project.starBullets && project.starBullets.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs print:bg-slate-50">
                    <span className="font-bold text-amber-400 block mb-1">STAR 이력서 총평:</span>
                    {project.starBullets.map((bullet, idx) => (
                      <div key={idx} className="text-slate-300 leading-relaxed">
                        • {bullet}
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features */}
                <div className="space-y-1 text-xs text-slate-300">
                  <span className="font-bold text-slate-400 block">핵심 구현 기능:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {project.keyFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. CS Coursework Highlights */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2 flex items-center space-x-2 print:text-black">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>컴퓨터공학 전공 교과목 이수 현황</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {courseworks.map(course => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 print:bg-slate-50 print:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs sm:text-sm print:text-black truncate">
                    {course.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                    {course.grade}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {course.semester} ({course.credits}학점)
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {course.keyConcepts.slice(0, 3).map((c, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 pt-8 border-t border-slate-800 print:text-slate-600">
          <p>© {new Date().getFullYear()} {profile.name} • Software Engineering Archive</p>
        </footer>

      </div>
    </div>
  );
};
