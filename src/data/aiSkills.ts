import { TechSkill } from '../types';
export const AI_SKILLS_VERSION = 2;
export const aiSkills: TechSkill[] = [
  { id: 'ai-gemini-studio', name: 'Google AI Studio · Gemini API', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: 'Google AI Studio에서 Gemini API 키를 연결하고, Gemini 모델을 애플리케이션에서 활용한 경험이 있습니다.' },
  { id: 'ai-codex', name: 'Codex', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: 'AI 코딩 도구를 활용한 프로젝트 구현과 반복 업무 자동화. 학원 업무에서 GPT와 함께 유형별 변형문제 생성기 제작에 활용했습니다.' },
  { id: 'ai-claude', name: 'Claude', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: '프로젝트 작업과 문제 해결 과정에서 Claude를 활용한 경험이 있습니다.' },
  { id: 'ai-qwen3', name: 'Qwen3 · 멀티모달 LLM', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: 'Qwen3 계열의 멀티모달 LLM을 사용한 경험이 있습니다.' },
  { id: 'ai-gpt4o-mini', name: 'GPT-4o-mini · LLM 연동', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: '애플리케이션에서 GPT-4o-mini LLM을 연결해 활용한 경험이 있습니다.' },
  { id: 'ai-haiku', name: 'Claude Haiku · LLM 연동', category: 'AI & Automation', level: 'Competent (과제/프로젝트 구현)', featured: true, experience: '애플리케이션에서 Claude Haiku LLM을 연결해 활용한 경험이 있습니다.' },
];
export function upgradeAiSkills(items: TechSkill[], version = 0): TechSkill[] {
  if (version >= AI_SKILLS_VERSION) return items;
  const names = new Set(items.map(item => item.name.trim().toLowerCase()));
  return [...items, ...aiSkills.filter(item => !items.some(existing => existing.id === item.id) && !names.has(item.name.trim().toLowerCase()))];
}
