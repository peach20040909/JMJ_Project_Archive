import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

// Server rendering verifies the first screen without running persistence effects.
const storage = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
  },
});

test('the submitted portfolio URL opens the recruiter view', () => {
  Object.assign(globalThis, { window: { location: new URL('https://jmj-archive-portfolio.ai.studio/') } });
  const html = renderToStaticMarkup(<App />);
  assert.ok(html.includes('Recruiter Mode'), 'visitors must see the public portfolio immediately');
  assert.ok(html.includes('Mobility Field Lab'));
  assert.ok(html.includes('AI 서비스 개발 · 문제 정의 · 결과 검증'));
  assert.ok(html.includes('실제 문제를 찾아 AI로 해결하고, 그 결과가 사용자에게 도움이 되는지 검증하는 개발자 장민준입니다.'));
  assert.ok(!html.includes('일하던 학원에서는') && !html.includes('한만큼에서는 AI가 협업 기록을'));
  assert.ok(!html.includes('제이영어학원'));
  assert.ok(html.includes('공모전·대외활동'));
  assert.ok(html.includes('학생설계전공 공모전'));
  assert.ok(!html.includes('AI 포트폴리오 코치'));
  assert.ok(!html.includes('아카이브 관리 모드로 돌아가기'));
  const hanmankeum = html.split('</article>').find(article => article.includes('>한만큼 —'));
  assert.ok(hanmankeum?.includes('완료'));
  assert.ok(!hanmankeum.includes('진행 중') && !hanmankeum.includes('발표·종료 예정'));
});

test('the management URL gates the editing dashboard', () => {
  Object.assign(globalThis, { window: { location: new URL('https://jmj-archive-portfolio.ai.studio/?view=manage') } });
  const html = renderToStaticMarkup(<App />);
  assert.ok(html.includes('JMJ 관리자 로그인'));
  assert.ok(!html.includes('AI 포트폴리오 코치'));
  assert.ok(!html.includes('Recruiter Mode'));
});
