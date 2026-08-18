import React from 'react';
import { 
  Github, 
  Globe, 
  Mail, 
  ExternalLink, 
  Layers, 
  Printer, 
  FolderGit2,
  Code2
} from 'lucide-react';
import { UserProfile, ProjectItem, TechSkill } from '../types';

interface PublicPortfolioViewProps {
  profile: UserProfile;
  projects: ProjectItem[];
  skills: TechSkill[];
  onBackToArchive: () => void;
}

export const PublicPortfolioView: React.FC<PublicPortfolioViewProps> = ({
  profile,
  projects,
  skills,
  onBackToArchive
}) => {
  const featuredProjects = projects.filter(p => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects;
  const featuredSkills = skills.filter(s => s.featured);
  const displaySkills = featuredSkills.length > 0 ? featuredSkills : skills;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation & Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <button
            onClick={onBackToArchive}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>← 아카이브 관리 모드로 돌아가기</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              공개 포트폴리오 뷰 (Recruiter Mode)
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / 인쇄 출력</span>
            </button>
          </div>
        </div>

        {/* 1. Header / Intro Profile */}
        <header className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono text-xs font-bold mb-2 border border-indigo-200">
                {profile.university} {profile.department} {profile.currentSemester && `• ${profile.currentSemester}`} {profile.gpa && `(GPA: ${profile.gpa})`}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {profile.name} <span className="text-lg font-normal text-slate-500">({profile.englishName})</span>
              </h1>
              <p className="text-lg text-indigo-600 font-bold mt-1">
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
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center space-x-1.5 text-slate-800 font-medium transition-colors"
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
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center space-x-1.5 text-slate-800 font-medium transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tech Blog</span>
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center space-x-1.5 text-slate-800 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{profile.email}</span>
                </a>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {profile.bio}
          </div>
        </header>

        {/* 2. Core Tech Skills & Competencies */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>기술 스택 & 핵심 역량</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displaySkills.map(skill => (
              <div
                key={skill.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{skill.name}</span>
                  <span className="text-xs text-indigo-600 font-mono font-bold">{skill.level}</span>
                </div>
                {skill.experience && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {skill.experience}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Projects Archive (STAR Format) */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-indigo-600" />
            <span>프로젝트 아카이브</span>
          </h2>

          <div className="space-y-6">
            {displayProjects.map(project => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{project.period}</span>
                      <span className="text-xs text-slate-500">• {project.role} ({project.teamType})</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {project.summary}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-mono font-medium border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* STAR Bullets */}
                {project.starBullets && project.starBullets.length > 0 && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2 text-xs">
                    <span className="font-bold text-amber-900 block mb-1">STAR 이력서 성과 요약:</span>
                    {project.starBullets.map((bullet, idx) => (
                      <div key={idx} className="text-slate-800 leading-relaxed">
                        • {bullet}
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Features */}
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className="space-y-1 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block">핵심 구현 기능:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {project.keyFeatures.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 pt-8 border-t border-slate-200">
          <p>© {new Date().getFullYear()} {profile.name} • Software Engineering Portfolio</p>
        </footer>

      </div>
    </div>
  );
};
