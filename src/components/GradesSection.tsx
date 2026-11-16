import React, { useId, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { academicTerms, academicSummary, majorSummary, allCourses, summarizeCourses, isMajor, formatGpa, transcriptDate } from '../data/academics';

export function GradesSection() {
  const [selectedId, setSelectedId] = useState(academicTerms[academicTerms.length - 1].id);
  const [majorOnly, setMajorOnly] = useState(false);
  const headingId = useId();
  const term = academicTerms.find(item => item.id === selectedId)!;
  const summary = summarizeCourses(term.courses);
  const major = summarizeCourses(term.courses.filter(isMajor));
  const courses = majorOnly ? term.courses.filter(isMajor) : term.courses;
  const distribution = ['A+', 'A0', 'B+', 'P'].map(grade => ({ grade, count: allCourses.filter(item => item.grade === grade).length }));
  const x = (index: number) => 48 + index * 100;
  const y = (gpa: number) => 185 - gpa * 32;
  const overallLine = academicTerms.map((item, index) => `${x(index)},${y(summarizeCourses(item.courses).gpa!)}`).join(' ');
  const majorLine = academicTerms.flatMap((item, index) => { const gpa = summarizeCourses(item.courses.filter(isMajor)).gpa; return gpa === null ? [] : [`${x(index)},${y(gpa)}`]; }).join(' ');
  return <section id="grades" aria-labelledby={headingId} className="space-y-5 py-6 scroll-mt-28">
    <div className="space-y-2"><h2 id={headingId} className="flex items-center gap-2 text-xl font-bold text-zinc-900"><GraduationCap aria-hidden="true" className="h-5 w-5 text-indigo-600" />성적</h2><p className="text-sm leading-relaxed text-zinc-500">성적증명서 기준 · {transcriptDate} 발급 · 2026학년도 1학기까지 확정된 성적입니다.</p></div>
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <dl className="grid grid-cols-3 gap-3 border-b border-zinc-100 pb-6">
        {[{label:'전체 평점',value:formatGpa(academicSummary.gpa),unit:'/ 4.50'}, {label:'전공 평점',value:formatGpa(majorSummary.gpa),unit:'/ 4.50'}, {label:'취득 학점',value:academicSummary.credits,unit:'학점'}].map(item => <div key={item.label}><dt className="text-xs text-zinc-500 sm:text-sm">{item.label}</dt><dd className="mt-2 text-2xl font-bold tracking-tight text-indigo-600 sm:text-3xl">{item.value}<span className="ml-1 block text-xs font-normal text-zinc-500 sm:inline">{item.unit}</span></dd></div>)}
      </dl>
      <div className="grid gap-6 pt-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-2 text-xs"><h3 className="font-semibold text-zinc-700">학기별 평점 추이</h3><span className="flex gap-3"><span className="text-indigo-600">● 전체</span><span className="text-emerald-700">● 전공</span></span></div>
          <svg viewBox="0 0 500 230" role="img" aria-label="학기별 전체·전공 평점 추이. 아래 학기 선택에서 과목별 성적을 확인할 수 있습니다." className="mt-2 w-full overflow-visible">
            {[2,3,4,4.5].map(value => <g key={value}><line x1="38" x2="465" y1={y(value)} y2={y(value)} stroke="#e4e4e7" /><text x="4" y={y(value)+4} fontSize="11" fill="#71717a">{value.toFixed(1)}</text></g>)}
            <polyline points={majorLine} fill="none" stroke="#047857" strokeWidth="2" strokeDasharray="4 4" /><polyline points={overallLine} fill="none" stroke="#4f46e5" strokeWidth="2.5" />
            {academicTerms.map((item, index) => { const total = summarizeCourses(item.courses); const major = summarizeCourses(item.courses.filter(isMajor)); return <g key={item.id}>
              {major.gpa !== null && <circle cx={x(index)} cy={y(major.gpa)} r="3.5" fill="white" stroke="#047857" strokeWidth="2" />}
              <circle cx={x(index)} cy={y(total.gpa!)} r="4" fill="white" stroke="#4f46e5" strokeWidth="2" tabIndex={0}><title>{`${item.label}: 전체 ${formatGpa(total.gpa)}, 전공 ${formatGpa(major.gpa)}`}</title></circle>
              <text x={x(index)} y={y(total.gpa!)-12} textAnchor="middle" fontSize="11" fill="#4338ca">{formatGpa(total.gpa)}</text>
              <text x={x(index)} y="205" textAnchor="middle" fontSize="10" fill="#71717a">{item.year}</text><text x={x(index)} y="220" textAnchor="middle" fontSize="10" fill="#71717a">{item.term === '1계절' ? '하계 계절' : item.term === '2계절' ? '동계 계절' : item.term}</text>
            </g>; })}
          </svg>
        </div>
        <div className="min-w-0 space-y-4"><h3 className="text-xs font-semibold text-zinc-700">등급 분포 <span className="font-normal text-zinc-500">· 과목 수 기준</span></h3>{distribution.map((item,index) => <div key={item.grade} className="grid grid-cols-[2rem_1fr_4rem] items-center gap-3 text-xs"><span className="font-medium text-zinc-700">{item.grade}</span><div className="h-2 rounded-full bg-zinc-100"><div className={['bg-indigo-500','bg-cyan-500','bg-amber-500','bg-emerald-500'][index]+' h-2 rounded-full'} style={{width:`${item.count/allCourses.length*100}%`}} /></div><span className="text-right tabular-nums text-zinc-500">{item.count}개 · {Math.round(item.count/allCourses.length*100)}%</span></div>)}<p className="pt-2 text-xs leading-relaxed text-zinc-500">P 과목은 취득 학점에 포함하고 평점 계산에서는 제외합니다. 전공 평점은 증명서의 ‘전공기초’ 분류를 기준으로 산출했습니다.</p></div>
      </div>
    </div>
    <div role="group" aria-label="성적 학기 선택" className="flex gap-1 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-2 print:flex-wrap">{academicTerms.map(item => <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)} className={`min-h-11 shrink-0 rounded-lg px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${selectedId === item.id ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}>{item.label}</button>)}</div>
    <div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className="text-lg font-bold text-zinc-900">{term.label} <span className="text-xs font-normal text-zinc-500">{term.year}학년도 {term.term}</span></h3><p className="mt-1 text-xs text-zinc-600">평점 <strong>{formatGpa(summary.gpa)}</strong> · 전공 <strong>{formatGpa(major.gpa)}</strong> · 취득 <strong>{summary.credits}학점</strong></p></div><label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-zinc-600"><input type="checkbox" checked={majorOnly} onChange={event => setMajorOnly(event.target.checked)} className="h-4 w-4 accent-indigo-600" />전공만 보기</label></div>
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white"><table className="w-full table-fixed text-left text-sm"><caption className="sr-only">{term.label} 과목별 성적</caption><thead className="bg-zinc-50 text-xs text-zinc-500"><tr><th scope="col" className="p-3 font-medium">과목명</th><th scope="col" className="w-14 p-2 text-center font-medium">학점</th><th scope="col" className="w-14 p-2 text-center font-medium">성적</th><th scope="col" className="w-16 p-2 text-center font-medium">전공</th></tr></thead><tbody className="divide-y divide-zinc-100">{courses.map(item => <tr key={item.name} className="hover:bg-zinc-50"><th scope="row" className="break-words p-3 font-normal leading-relaxed text-zinc-800">{item.name}<span className="mt-1 block text-xs text-zinc-400">{item.category}</span></th><td className="p-2 text-center tabular-nums text-zinc-600">{item.credits}</td><td className="p-2 text-center font-semibold text-indigo-600">{item.grade}</td><td className="p-2 text-center text-xs text-zinc-500">{isMajor(item) ? '전공' : '—'}</td></tr>)}</tbody></table>{courses.length === 0 && <p className="p-6 text-sm text-zinc-500">이 학기에 이수한 전공 과목이 없습니다.</p>}</div>
    <p className="text-xs leading-relaxed text-zinc-500">계절학기를 포함한 누적 성적이며, 아직 확정되지 않은 2026학년도 2학기 성적은 포함하지 않았습니다.</p>
  </section>;
}
