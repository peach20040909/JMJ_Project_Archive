import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ActivitiesSection } from '../src/components/ActivitiesSection';
import { activities } from '../src/data/activities';

test('six activities preserve selection stages and awards without prize amounts', () => {
  assert.equal(activities.length, 6);
  const html = renderToStaticMarkup(<ActivitiesSection />);
  for (const label of ['공모전·대외활동', '본선 진출 후 탈락', '최종 합격', '우수상', '은상', '한국도로공사 AI 활용 공모전', '결과 미기재']) {
    assert.ok(html.includes(label), label);
  }
  assert.ok(!/상금|만원/.test(html));
  assert.equal(activities.find(item => item.id === 'ai-literacy')?.outcome, '1차 서류 합격');
  assert.equal(activities.find(item => item.id === 'expressway-ai')?.outcome, '참여');
});
