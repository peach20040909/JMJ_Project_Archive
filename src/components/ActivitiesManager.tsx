import React, { useRef, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PortfolioActivity } from '../data/activities';
import { ActivitiesSection } from './ActivitiesSection';

interface Props {
  items: PortfolioActivity[];
  onChange: (items: PortfolioActivity[]) => void;
}
const empty: Omit<PortfolioActivity, 'id'> = { title: '', subtitle: '', kind: '참여', outcome: '', stages: [], note: '' };

export function ActivitiesManager({ items, onChange }: Props) {
  const [draft, setDraft] = useState<PortfolioActivity | null>(null);
  const [stages, setStages] = useState('');
  const [tags, setTags] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const titleInput = useRef<HTMLInputElement>(null);
  const openForm = (item?: PortfolioActivity) => {
    setDraft(item ? { ...item } : { ...empty, id: crypto.randomUUID() });
    setStages(item?.stages.join('\n') ?? '');
    setTags(item?.tags?.join(', ') ?? '');
    setPendingDelete(null);
    setMessage('');
    requestAnimationFrame(() => { titleInput.current?.focus(); titleInput.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
  };
  const inputClass = 'mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  return (
    <div className="space-y-5 py-8">
      {draft && (
        <form aria-label="활동 편집" onSubmit={event => {
          event.preventDefault();
          if (!draft.title.trim() || !draft.outcome.trim()) return;
          const saved = { ...draft, title: draft.title.trim(), outcome: draft.outcome.trim(), subtitle: draft.subtitle?.trim(), note: draft.note?.trim(), period: draft.period?.trim(), status: draft.status?.trim(), role: draft.role?.trim(), tags: [...new Set(tags.split(',').map(tag => tag.trim()).filter(Boolean))], stages: stages.split('\n').map(stage => stage.trim()).filter(Boolean) };
          onChange(items.some(item => item.id === saved.id) ? items.map(item => item.id === saved.id ? saved : item) : [...items, saved]);
          setDraft(null);
          setMessage('활동을 저장했습니다.');
        }} className="space-y-4 rounded-xl border border-indigo-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">{items.some(item => item.id === draft.id) ? '활동 수정' : '새 활동 추가'}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">공모전·활동명 <span className="text-zinc-500">(필수)</span><input ref={titleInput} required maxLength={150} value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className={inputClass} /></label>
            <label className="text-sm font-medium">작품명·부제<input value={draft.subtitle ?? ''} onChange={e => setDraft({ ...draft, subtitle: e.target.value })} className={inputClass} /></label>
            <label className="text-sm font-medium">결과 분류<select value={draft.kind} onChange={e => setDraft({ ...draft, kind: e.target.value as PortfolioActivity['kind'] })} className={inputClass}>{(['수상', '선발', '진출', '참여', '실무'] as const).map(kind => <option key={kind}>{kind}</option>)}</select></label>
            <label className="text-sm font-medium">결과·수상명 <span className="text-zinc-500">(필수)</span><input required maxLength={100} value={draft.outcome} onChange={e => setDraft({ ...draft, outcome: e.target.value })} className={inputClass} /></label>
            <label className="text-sm font-medium">기간<input value={draft.period ?? ''} onChange={e => setDraft({ ...draft, period: e.target.value })} className={inputClass} placeholder="예: 2026.03 ~ 현재" /></label>
            <label className="text-sm font-medium">담당 역할<input value={draft.role ?? ''} onChange={e => setDraft({ ...draft, role: e.target.value })} className={inputClass} /></label>
          </div>
          <label className="block text-sm font-medium">진행 상태<input value={draft.status ?? ''} onChange={e => setDraft({ ...draft, status: e.target.value })} className={inputClass} placeholder="예: 결선 발표 예정 · 결과 확정 후 이 항목만 수정" /></label>
          <p className="text-xs text-zinc-500">결과 분류가 ‘수상’인 활동은 대시보드의 수상 이력에도 표시됩니다.</p>
          <label className="block text-sm font-medium">카드 요약<textarea rows={3} value={draft.summary ?? ''} onChange={e => setDraft({ ...draft, summary: e.target.value })} className={inputClass} placeholder="활동의 주제, 역할, 핵심 결과를 2~3문장으로 정리해 주세요." /></label>
          <label className="block text-sm font-medium">키워드 <span className="font-normal text-zinc-500">— 쉼표로 구분</span><input value={tags} onChange={e => setTags(e.target.value)} className={inputClass} /></label>
          <label className="block text-sm font-medium">참여 과정 <span className="font-normal text-zinc-500">— 단계별로 한 줄씩 입력</span><textarea rows={3} value={stages} onChange={e => setStages(e.target.value)} className={inputClass} /></label>
          <label className="block text-sm font-medium">소개·본인 역할·배운 점<textarea rows={4} value={draft.note ?? ''} onChange={e => setDraft({ ...draft, note: e.target.value })} className={inputClass} /></label>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setDraft(null)} className="min-h-11 rounded-lg border border-zinc-300 px-4 text-sm">취소</button><button type="submit" className="min-h-11 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700">저장</button></div>
        </form>
      )}
      {message && <p role="status" className="text-sm text-emerald-700">{message}</p>}
      {pendingDelete && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4"><p className="text-sm text-zinc-700">‘{items.find(item => item.id === pendingDelete)?.title}’ 활동을 삭제할까요?</p><div className="flex gap-2"><button onClick={() => setPendingDelete(null)} className="min-h-11 rounded-lg border bg-white px-3 text-sm">취소</button><button onClick={() => { onChange(items.filter(activity => activity.id !== pendingDelete)); if (draft?.id === pendingDelete) setDraft(null); setPendingDelete(null); setMessage('활동을 삭제했습니다.'); }} className="min-h-11 rounded-lg bg-red-600 px-3 text-sm text-white">삭제 확인</button></div></div>}
      <ActivitiesSection items={items} headerAction={<button onClick={() => openForm()} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500"><Plus className="h-4 w-4" aria-hidden="true" />활동 추가</button>} actions={item => (
        <div className="-mr-2 -mt-2 flex"><button onClick={() => openForm(item)} aria-label={`${item.title} 수정`} title="수정" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500"><Pencil className="h-4 w-4" aria-hidden="true" /></button><button onClick={() => { setPendingDelete(item.id); document.getElementById('activities')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }} aria-label={`${item.title} 삭제`} title="삭제" className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-indigo-500"><Trash2 className="h-4 w-4" aria-hidden="true" /></button></div>
      )} />
    </div>
  );
}
