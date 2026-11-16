export type Grade = 'A+' | 'A0' | 'B+' | 'B0' | 'C+' | 'C0' | 'D+' | 'D0' | 'F' | 'P';
export interface AcademicCourse { name: string; credits: number; grade: Grade; category: string; }
export interface AcademicTerm { id: string; label: string; year: number; term: string; courses: AcademicCourse[]; }
export const transcriptDate = '2026.09.22';
const course = (name: string, credits: number, grade: Grade, category: string): AcademicCourse => ({ name, credits, grade, category });
// Transcribed from the owner's 2026-09-22 transcript. No student number, birth date or verification code is published.
export const academicTerms: AcademicTerm[] = [
  { id: '2023-1', label: '1학년 1학기', year: 2023, term: '1학기', courses: [
    course('성서와인간이해', 2, 'A0', '공통교양'), course('채플', 0.5, 'P', '공통교양'),
    course('영어3', 2, 'A+', '공통교양'), course('영어회화3', 1, 'B+', '공통교양'),
    course('영화와철학', 3, 'A+', '일반교양'), course('컴퓨터논리의이해', 3, 'B+', '학문기초'),
    course('인공지능의세계', 3, 'A+', '핵심교양'), course('기초프로그래밍', 3, 'A+', '전공기초'),
  ] },
  { id: '2023-2', label: '1학년 2학기', year: 2023, term: '2학기', courses: [
    course('영어회화4', 1, 'A+', '공통교양'), course('영어4', 2, 'A+', '공통교양'),
    course('발표와토의', 3, 'A+', '공통교양'), course('교양볼링', 2, 'A+', '일반교양'),
    course('문화리터러시와창의적스토리텔링', 3, 'B+', '핵심교양'), course('디지털문화의이해', 3, 'A0', '핵심교양'),
    course('기초프로그래밍2', 3, 'B+', '전공기초'),
  ] },
  { id: '2024-winter', label: '2024 동계 계절학기', year: 2024, term: '2계절', courses: [
    course('영화제작에대해알고싶은모든것(KCU)', 3, 'A+', '일반교양'),
  ] },
  { id: '2025-summer', label: '2025 하계 계절학기', year: 2025, term: '1계절', courses: [
    course('문학속의자연여행(KCU)', 3, 'A+', '일반교양'),
  ] },
  { id: '2026-1', label: '2학년 1학기', year: 2026, term: '1학기', courses: [
    course('4차산업혁명과미래사회진로선택', 2, 'P', '공통교양'), course('채플', 0.5, 'P', '공통교양'),
    course('디지털콘텐츠로만나는한국의문화유산', 3, 'A+', '핵심교양'), course('민주주의와현대사회', 3, 'A+', '핵심교양'),
    course('데이터사이언스개론', 3, 'A+', '전공기초'), course('자료구조', 3, 'A+', '전공기초'), course('기초웹프로그래밍', 3, 'A+', '전공기초'),
  ] },
];
const points: Record<Exclude<Grade, 'P'>, number> = { 'A+': 4.5, A0: 4, 'B+': 3.5, B0: 3, 'C+': 2.5, C0: 2, 'D+': 1.5, D0: 1, F: 0 };
export function summarizeCourses(courses: AcademicCourse[]) {
  const graded = courses.filter(item => item.grade !== 'P');
  const gradedCredits = graded.reduce((sum, item) => sum + item.credits, 0);
  const totalPoints = graded.reduce((sum, item) => sum + item.credits * points[item.grade as Exclude<Grade, 'P'>], 0);
  return { gpa: gradedCredits ? totalPoints / gradedCredits : null, gradedCredits, totalPoints, credits: courses.filter(item => item.grade !== 'F').reduce((sum, item) => sum + item.credits, 0) };
}
export const isMajor = (course: AcademicCourse) => course.category.startsWith('전공');
export const allCourses = academicTerms.flatMap(term => term.courses);
export const academicSummary = summarizeCourses(allCourses);
export const majorSummary = summarizeCourses(allCourses.filter(isMajor));
export const formatGpa = (gpa: number | null) => gpa === null ? '—' : gpa.toFixed(2);
