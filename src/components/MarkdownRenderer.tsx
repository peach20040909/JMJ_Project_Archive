import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div className={`notion-markdown-body text-slate-800 leading-relaxed text-xs sm:text-sm ${className}`}>
      <Markdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2 pb-1.5 border-b border-slate-200">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-3.5 mb-1.5 pb-1 border-b border-slate-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-3 mb-1.5 flex items-center gap-1">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mt-2.5 mb-1 text-indigo-950">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-1.5 text-slate-700 leading-relaxed whitespace-pre-wrap">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1 text-slate-700 marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1 text-slate-700 marker:text-slate-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-indigo-400 bg-indigo-50/50 pl-3.5 pr-3 py-2 rounded-r-lg my-2.5 text-slate-700 italic">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 bg-amber-50/60 px-0.5 rounded">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-slate-800 font-medium not-italic bg-slate-100 px-1 py-0.5 rounded text-[11px] sm:text-xs text-indigo-700">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-[11px] font-mono border border-slate-200/70">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-slate-900 text-slate-100 p-3.5 rounded-xl my-2.5 overflow-x-auto text-xs font-mono leading-normal">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-3 border-slate-200" />,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
