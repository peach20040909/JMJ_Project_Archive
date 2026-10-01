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
  assert.ok(!html.includes('AI 포트폴리오 코치'));
});

test('the management URL still opens the editing dashboard', () => {
  Object.assign(globalThis, { window: { location: new URL('https://jmj-archive-portfolio.ai.studio/?view=manage') } });
  const html = renderToStaticMarkup(<App />);
  assert.ok(html.includes('AI 포트폴리오 코치'));
  assert.ok(!html.includes('Recruiter Mode'));
});
