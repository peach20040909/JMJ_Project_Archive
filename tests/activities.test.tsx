import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ActivitiesSection, filterActivities } from '../src/components/ActivitiesSection';
import { activities, academyExperience, upgradeActivities, ACTIVITIES_VERSION } from '../src/data/activities';

test('activities preserve selection stages and awards without prize amounts', () => {
  assert.equal(activities.length, 7);
  const html = renderToStaticMarkup(<ActivitiesSection />);
  for (const label of ['공모전·대외활동', '본선 진출 후 탈락', '최종 합격', '우수상', '은상', '한국도로공사 AI 활용 공모전', '결과 미기재']) {
    assert.ok(html.includes(label), label);
  }
  assert.ok(!/상금|만원/.test(html));
  assert.equal(activities.find(item => item.id === 'ai-literacy')?.outcome, '1차 서류 합격');
  assert.equal(activities.find(item => item.id === 'expressway-ai')?.outcome, '참여');
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
