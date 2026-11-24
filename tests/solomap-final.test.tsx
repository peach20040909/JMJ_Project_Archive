import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { initialProfile, initialProjects, upgradeSoloMapProject } from '../src/data/initialData';
import { ProjectArchive } from '../src/components/ProjectArchive';
import { PublicPortfolioView } from '../src/components/PublicPortfolioView';

const solo = initialProjects.find(project => project.id === 'proj-mju-solomap')!;

test('completed SoloMap displays as complete in both archive and recruiter view', () => {
  const archive = renderToStaticMarkup(<ProjectArchive projects={[solo]} onAddProject={() => {}} onUpdateProject={() => {}} onDeleteProject={() => {}} />);
  const publicView = renderToStaticMarkup(<PublicPortfolioView profile={initialProfile} projects={[solo]} skills={[]} activities={[]} onBackToArchive={() => {}} />);
  for (const html of [archive, publicView]) {
    assert.ok(html.includes('완료'));
    assert.ok(!html.includes('진행 중'));
    assert.ok(html.includes('2026.12.08'));
    assert.ok(html.includes('TypeScript'));
    assert.ok(html.includes('mju-solomap.vercel.app'));
  }
  assert.ok(solo.techStack.includes('NAVER Maps API'));
  assert.equal(solo.period, '2026.09.09 - 2026.12.08');
  assert.ok(!solo.resultDescription?.includes('발표 예정'));
  const hmk = initialProjects.find(project => project.id === 'proj-hmk-2026')!;
  const html = renderToStaticMarkup(<ProjectArchive projects={[hmk]} onAddProject={() => {}} onUpdateProject={() => {}} onDeleteProject={() => {}} />);
  assert.ok(html.includes('진행 중'), 'other ongoing project statuses must stay unchanged');
});

test('SoloMap revision replaces stale data once without restoring deletions or discarding later edits', () => {
  const old = { ...solo, techStack: ['Leaflet', 'Render'], updatedAt: '2026-09-17' };
  const other = { ...old, id: 'other-project' };
  const upgraded = upgradeSoloMapProject([old, other]);
  assert.equal(upgraded.length, 2);
  assert.ok(upgraded[0].techStack.includes('Prisma 7'));
  assert.ok(!upgraded[0].techStack.includes('Render'));
  assert.equal(upgraded[1], other);
  const previous = { ...solo, summary: '수정한 요약 유지', period: '2026.09.09 - 2026.12.08 (12.08 최종 발표 예정)' };
  const refreshed = upgradeSoloMapProject([previous])[0];
  assert.equal(refreshed.period, solo.period);
  assert.equal(refreshed.summary, previous.summary);
  assert.deepEqual(upgradeSoloMapProject([]), []);
  const edited = { ...solo, summary: '추후 수정한 요약', updatedAt: '2026-11-25' };
  assert.equal(upgradeSoloMapProject([edited])[0], edited);
});
