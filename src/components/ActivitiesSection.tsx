import React from 'react';
import { Award, Trophy, BadgeCheck, ArrowUpRight, ChevronRight } from 'lucide-react';
import { activities } from '../data/activities';

const outcomeStyles = {
  수상: 'bg-amber-50 text-amber-900 border-amber-200',
  선발: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  진출: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  참여: 'bg-zinc-100 text-zinc-700 border-zinc-200',
};

export function ActivitiesSection() {
  return (
    <section aria-labelledby="activities-heading" className="space-y-5 scroll-mt-28" id="activities">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200 pb-4">
        <div className="space-y-2">
          <h2 id="activities-heading" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900">
            <Award aria-hidden="true" className="h-5 w-5 text-indigo-600" />
            공모전·대외활동
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">개발 프로젝트 밖에서도 아이디어를 제안하고, 도전하며 쌓은 경험입니다.</p>
        </div>
        <span className="shrink-0 text-sm font-medium text-zinc-600">활동 {activities.length}건 · 수상 {activities.filter(item => item.kind === '수상').length}건</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-2">
        {activities.map(activity => {
          const Icon = activity.kind === '수상' ? Trophy : activity.kind === '선발' ? BadgeCheck : ArrowUpRight;
          return (
            <article key={activity.id} className="min-w-0 break-inside-avoid rounded-xl border border-zinc-200 bg-white p-5 shadow-xs print:shadow-none">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${outcomeStyles[activity.kind]}`}>
                  <Icon aria-hidden="true" className="h-3.5 w-3.5" />{activity.outcome}
                </span>
              </div>
              <h3 className="text-base font-bold leading-relaxed text-zinc-900">{activity.title}</h3>
              {activity.subtitle && <p className="mt-1 text-sm text-zinc-600">{activity.subtitle}</p>}
              <ol aria-label={`${activity.title} 참여 과정`} className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-700">
                {activity.stages.map((stage, index) => (
                  <li key={stage} className="inline-flex items-center gap-1.5">
                    {index > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-zinc-400" />}
                    {stage}
                  </li>
                ))}
              </ol>
              {activity.note && <p className="mt-3 text-sm leading-relaxed text-zinc-500">{activity.note}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
