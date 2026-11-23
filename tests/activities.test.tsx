import test from 'node:test';
import { initialProjects, upgradeHanmankeumProject } from '../src/data/initialData';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ActivitiesSection, filterActivities } from '../src/components/ActivitiesSection';
import { activities, academyExperience, upgradeActivities, ACTIVITIES_VERSION } from '../src/data/activities';

test('activities preserve selection stages and awards without prize amounts', () => {
  assert.equal(activities.length, 7);
  const html = renderToStaticMarkup(<ActivitiesSection />);
  for (const label of ['공모전·대외활동', '본선 진출 후 탈락', '최종 합격', '우수상', '은상', '한국도로공사 AI 활용 공모전', '1차 심사 탈락']) {
    assert.ok(html.includes(label), label);
  }
  assert.ok(!/상금|만원/.test(html));
  assert.equal(activities.find(item => item.id === 'ai-literacy')?.outcome, '결선 진출');
  assert.equal(activities.find(item => item.id === 'expressway-ai')?.outcome, '1차 심사 탈락');
});

test('dashboard summary shows awards only and supports an empty award list', () => {
  const html = renderToStaticMarkup(<ActivitiesSection items={activities} awardsOnly />);
  assert.ok(html.includes('수상 이력'));
  assert.ok(html.includes('우수상') && html.includes('은상'));
  assert.ok(!html.includes('창업경진대회') && !html.includes('해외탐방'));
  assert.ok(!html.includes('제이영어학원'));
  assert.ok(renderToStaticMarkup(<ActivitiesSection items={[]} awardsOnly />).includes('아직 등록된 수상 이력이 없습니다.'));
});

test('academy experience distinguishes future end date and military leave without publishing private logs', () => {
  const html = renderToStaticMarkup(<ActivitiesSection items={[academyExperience]} />);
  for (const label of ['제이영어학원', '2027.02 종료 예정', '2024.03 ~ 2025.09', 'GPT', 'Codex', '36문제', '워크스페이스']) assert.ok(html.includes(label), label);
  assert.ok(!html.includes('drive.google.com'));
  assert.ok(!/\d+%|시간 단축/.test(html));
});

test('search and classification combine and find role, keywords and details', () => {
  assert.deepEqual(filterActivities(activities, '실무', 'codex').map(item => item.id), ['j-english-ax']);
  assert.equal(filterActivities(activities, '수상', '').length, 2);
  assert.equal(filterActivities(activities, '수상', 'Codex').length, 0);
  assert.equal(filterActivities(activities, '전체', '존재하지않는활동').length, 0);
  assert.equal(filterActivities(activities, '전체', '  워크스페이스  ').length, 1);
});

test('archive upgrade preserves existing edits, adds academy once and respects later deletions', () => {
  const edited = [{ ...activities[1], title: '사용자가 수정한 이름' }];
  const upgraded = upgradeActivities(edited);
  assert.equal(upgraded[0].title, '사용자가 수정한 이름');
  assert.equal(upgraded.filter(item => item.id === academyExperience.id).length, 1);
  assert.equal(upgradeActivities(upgraded).length, upgraded.length);
  assert.deepEqual(upgradeActivities([], ACTIVITIES_VERSION), []);
});

test('source-backed activity cards have a substantive summary and preserve proposal status', () => {
  assert.ok(activities.every(item => item.summary && item.summary.length > 45));
  assert.equal(activities.find(item => item.id === 'student-major')?.subtitle, 'AX 시스템공학전공');
  assert.equal(activities.find(item => item.id === 'startup')?.subtitle, '한만큼 · 사업 아이디어');
  const proposal = activities.find(item => item.id === 'expressway-ai')!;
  assert.equal(proposal.subtitle, 'AI 세이프콜(Safe-Call)');
  assert.equal(proposal.outcome, '1차 심사 탈락');
  assert.ok(proposal.note?.includes('제안 목표'));
  assert.ok(!proposal.note?.includes('010-2701') && !proposal.note?.includes('@naver.com'));
  assert.equal(upgradeActivities([], 2).length, 0, 'a deleted academy record must stay deleted during a later content upgrade');
});


test('competition revision separates planning from implementation and keeps status editable after migration', () => {
  const startup = activities.find(item => item.id === 'startup')!;
  const ai = activities.find(item => item.id === 'ai-literacy')!;
  assert.ok(startup.summary?.includes('목업') && startup.role?.includes('사업 모델'));
  assert.ok(!startup.role?.includes('백엔드'));
  assert.ok(ai.role?.includes('사이트 구현 총괄') && ai.note?.includes('성적을 산출하지 않습니다'));
  assert.ok(!ai.summary?.includes('11.26'));
  assert.ok(ai.status?.includes('11.26'));
  assert.equal(upgradeActivities([{ ...ai, summary: '이전 요약', outcome: '1차 서류 합격' }], 3)[0].outcome, '결선 진출');
  const edited = { ...ai, status: '발표 완료' };
  assert.deepEqual(upgradeActivities([edited], ACTIVITIES_VERSION), [edited]);
  assert.deepEqual(upgradeActivities([], 3), []);
});


test('old browser project data upgrades once without restoring deleted projects or discarding later edits', () => {
  const latest = initialProjects.find(p => p.id === 'proj-hmk-2026')!;
  const legacy = { ...latest, title: '내 한만큼', techStack: ['SQLite', 'Render'], role: '이전 역할' };
  const other = { ...latest, id: 'custom-project' };
  const upgraded = upgradeHanmankeumProject([legacy, other], 3);
  assert.equal(upgraded[0].title, '내 한만큼');
  assert.ok(upgraded[0].techStack.includes('Turso (libSQL)'));
  assert.equal(upgraded[0].role, latest.role);
  assert.equal(upgraded[1], other);
  assert.deepEqual(upgradeHanmankeumProject([], 3), []);
  assert.deepEqual(upgradeHanmankeumProject([legacy], 4), [legacy]);
});
