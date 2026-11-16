import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { academicTerms, academicSummary, majorSummary, allCourses, summarizeCourses, formatGpa } from '../src/data/academics';
import { GradesSection } from '../src/components/GradesSection';
import { aiSkills, upgradeAiSkills, AI_SKILLS_VERSION } from '../src/data/aiSkills';

test('transcribed course totals reconcile to the issued transcript including seasonal and pass credits', () => {
  assert.equal(allCourses.length, 24);
  assert.equal(academicTerms.length, 5);
  assert.equal(academicSummary.credits, 58);
  assert.equal(academicSummary.gradedCredits, 55);
  assert.equal(academicSummary.totalPoints, 235);
  assert.equal(formatGpa(academicSummary.gpa), '4.27');
  assert.equal(formatGpa(majorSummary.gpa), '4.30');
  assert.equal(majorSummary.credits, 15);
  assert.deepEqual(academicTerms.map(term => formatGpa(summarizeCourses(term.courses).gpa)), ['4.21', '4.06', '4.50', '4.50', '4.50']);
});

test('pass-only and failed courses do not inflate GPA or earned credits', () => {
  assert.deepEqual(summarizeCourses([{ name: 'Pass', credits: 2, grade: 'P', category: '교양' }]), { gpa: null, gradedCredits: 0, totalPoints: 0, credits: 2 });
  const failed = summarizeCourses([{ name: 'Fail', credits: 3, grade: 'F', category: '전공' }]);
  assert.equal(failed.credits, 0);
  assert.equal(failed.gpa, 0);
});

test('grades screen publishes academic results without private transcript identifiers', () => {
  const html = renderToStaticMarkup(<GradesSection />);
  for (const label of ['전체 평점', '전공 평점', '취득 학점', '4.27', '4.30', '58', '2026.09.22', '자료구조', '계절학기']) assert.ok(html.includes(label), label);
  assert.ok(!/60231223|2004년|문서확인번호|XD0A/.test(html));
});

test('AI additions are idempotent and preserve intentional deletions after migration', () => {
  assert.equal(upgradeAiSkills([]).length, 6);
  assert.equal(upgradeAiSkills(aiSkills).length, 6);
  assert.deepEqual(upgradeAiSkills([], AI_SKILLS_VERSION), []);
  assert.ok(aiSkills.every(skill => skill.score === undefined && skill.category === 'AI & Automation'));
});
