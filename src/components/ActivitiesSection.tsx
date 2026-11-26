import React, { useEffect, useId, useRef, useState } from 'react';
import { Award, Trophy, BadgeCheck, ArrowUpRight, ChevronRight, BriefcaseBusiness, Search, X, Github, ExternalLink } from 'lucide-react';
import { activities as initialActivities, PortfolioActivity } from '../data/activities';

const outcomeStyles = {
  수상: 'bg-amber-50 text-amber-900 border-amber-200',
  선발: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  진출: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  참여: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  실무: 'bg-sky-50 text-sky-900 border-sky-200',
};
const kinds = ['전체', '실무', '수상', '선발', '진출', '참여'] as const;
const activityOrder = new Map([
  ['hackathon', 0],
  ['ai-literacy', 1],
  ['student-major', 2],
  ['overseas', 3],
]);

export function filterActivities(items: PortfolioActivity[], kind: typeof kinds[number], search: string) {
  const query = search.trim().toLocaleLowerCase();
  return items.filter(item => (kind === '전체' || item.kind === kind) &&
    [item.title, item.subtitle, item.summary, item.outcome, item.note, item.role, item.period, item.status, ...(item.tags ?? []), ...item.stages]
      .filter(Boolean).join(' ').toLocaleLowerCase().includes(query));
}

interface ActivitiesSectionProps {
  items?: PortfolioActivity[];
  awardsOnly?: boolean;
  actions?: (activity: PortfolioActivity) => React.ReactNode;
  headerAction?: React.ReactNode;
}

export function ActivitiesSection({ items = initialActivities, awardsOnly = false, actions, headerAction }: ActivitiesSectionProps) {
  const headingId = useId();
  const [kind, setKind] = useState<typeof kinds[number]>('전체');
  const [search, setSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<PortfolioActivity | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!selectedActivity) return;
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedActivity]);

  const available = awardsOnly ? items.filter(item => item.kind === '수상') : items;
  const visible = [...(awardsOnly ? available : filterActivities(available, kind, search))]
    .sort((first, second) => (activityOrder.get(first.id) ?? activityOrder.size) -
      (activityOrder.get(second.id) ?? activityOrder.size));
  return (
    <section aria-labelledby={headingId} className="space-y-5 scroll-mt-28" id="activities">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h2 id={headingId} className="flex flex-wrap items-center gap-2 text-xl font-bold tracking-tight text-zinc-900">
            <Award aria-hidden="true" className="h-5 w-5 shrink-0 text-indigo-600" />
            {awardsOnly ? '수상 이력' : '공모전·대외활동'}
            <span className="text-sm font-normal text-zinc-500">({available.length})</span>
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">{awardsOnly ? '공모전과 대회에서 인정받은 결과입니다.' : '실무에서의 개선과 공모전·대외활동에서 쌓은 경험을 기록합니다.'}</p>
        </div>
        {headerAction && <div className="shrink-0 print:hidden">{headerAction}</div>}
      </div>
      {!awardsOnly && <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div role="group" aria-label="활동 분류" className="flex flex-wrap gap-1">
          {kinds.map(value => <button key={value} type="button" aria-pressed={kind === value} onClick={() => setKind(value)} className={`min-h-11 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${kind === value ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}>{value}</button>)}
        </div>
        <label className="relative block min-w-0 sm:w-64 sm:shrink-0">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
          <span className="sr-only">활동 검색</span>
          <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="활동명, 역할, 키워드 검색..." className="min-h-11 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </label>
      </div>}
      {!awardsOnly && <p role="status" className="text-xs text-zinc-500 print:hidden">전체 {items.length}건 · 수상 {items.filter(item => item.kind === '수상').length}건 · 표시 {visible.length}건</p>}
      {visible.length === 0 && <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">{awardsOnly ? '아직 등록된 수상 이력이 없습니다.' : items.length === 0 ? '등록된 활동이 없습니다. 새 활동을 추가해 주세요.' : '검색 조건에 맞는 활동이 없습니다.'}</p>}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2">
        {visible.map(activity => {
          const Icon = activity.kind === '수상' ? Trophy : activity.kind === '선발' ? BadgeCheck : activity.kind === '실무' ? BriefcaseBusiness : ArrowUpRight;
          return (
            <article key={activity.id} className="flex h-80 min-w-0 break-inside-avoid flex-col rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 print:h-auto print:shadow-none">
              <div className="mb-2 flex h-11 shrink-0 items-center justify-between gap-2">
                <span className={`inline-flex max-w-full items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${outcomeStyles[activity.kind]}`}>
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />{activity.outcome}
                </span>
                {actions && <div className="shrink-0 print:hidden">{actions(activity)}</div>}
              </div>
              <h3 title={activity.title} className="line-clamp-2 h-10 shrink-0 text-base font-bold leading-5 text-zinc-900">{activity.title}</h3>
              <p title={activity.subtitle} aria-hidden={!activity.subtitle} className="mt-1 h-5 shrink-0 truncate text-sm leading-5 text-zinc-600">{activity.subtitle || '\u00a0'}</p>
              <p className="mt-2 line-clamp-3 h-15 shrink-0 text-sm leading-5 text-zinc-600">{activity.summary || activity.note?.split('\n')[0] || `${activity.outcome} · ${activity.stages.join(' → ')}`}</p>
              <p className="mt-2 shrink-0 truncate border-t border-zinc-100 pt-2 text-xs leading-4 text-zinc-600">{activity.status || activity.stages.join(' → ') || activity.outcome}</p>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={activity.title + ' 상세보기'}
                onClick={() => setSelectedActivity(activity)}
                className="mt-auto flex min-h-11 w-full items-center justify-between gap-2 rounded border-t border-zinc-100 text-xs font-semibold text-indigo-600 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 print:hidden"
              >
                <span>상세보기 · 역할과 과정</span>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
              </button>
              <div className="hidden pt-3 print:block">
                <ActivityDetails activity={activity} />
              </div>
            </article>
          );
        })}
      </div>
      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClose={() => setSelectedActivity(null)}
        onClick={event => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto w-[calc(100vw-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-slate-900/50 print:hidden"
      >
        {selectedActivity && (
          <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
            <header className="flex shrink-0 items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0 space-y-2">
                <span className={'inline-flex rounded-md border px-2 py-1 text-xs font-semibold ' + outcomeStyles[selectedActivity.kind]}>
                  {selectedActivity.outcome}
                </span>
                <h2 id={dialogTitleId} className="text-lg font-bold leading-snug break-words sm:text-xl">
                  {selectedActivity.title}
                </h2>
                {selectedActivity.subtitle && <p className="text-sm text-zinc-600">{selectedActivity.subtitle}</p>}
              </div>
              <button
                type="button"
                aria-label="상세보기 닫기"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </header>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">
              <ActivityDetails activity={selectedActivity} />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

function ActivityDetails({ activity }: { activity: PortfolioActivity }) {
  const links = [
    { href: activity.githubUrl, label: 'GitHub', Icon: Github },
    { href: activity.demoUrl, label: '라이브 데모', Icon: ExternalLink },
  ].filter(link => link.href && /^https?:\/\//i.test(link.href));
  return (
    <div className="space-y-4 break-words text-sm leading-relaxed text-zinc-700">
      {activity.summary && <p>{activity.summary}</p>}
      {links.length > 0 && (
        <div className="space-y-2">
          {activity.id === 'startup' && <p className="text-xs font-medium text-zinc-600">후속 구현 · 한만큼</p>}
          <div className="flex flex-wrap gap-2">
            {links.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-800 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
      {activity.status && <p><span className="font-semibold text-zinc-800">진행 상태</span><br />{activity.status}</p>}
      {activity.period && <p className="text-xs text-zinc-500">{activity.period}</p>}
      {activity.tags && activity.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{activity.tags.map(tag => <span key={tag} className="rounded border border-zinc-100 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600">{tag}</span>)}</div>}
      {activity.role && <p><span className="font-semibold text-zinc-800">담당 역할</span><br />{activity.role}</p>}
      {activity.stages.length > 0 && <ol aria-label={`${activity.title} 참여 과정`} className="space-y-1 text-xs">{activity.stages.map((stage,index) => <li key={`${stage}-${index}`} className="flex items-start gap-1"><ChevronRight aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-zinc-400" />{stage}</li>)}</ol>}
      {activity.note && <p className="whitespace-pre-line">{activity.note}</p>}
    </div>
  );
}
