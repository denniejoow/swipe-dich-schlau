export interface Challenge { question: string; options: string[]; correctAnswer: string; }
export interface Card { id: string; concept: string; explanation: string; example?: string; challengeQuestion?: Challenge; }
export interface ScriptJSON { id: string; title: string; category: 'programming'|'nature'|'history'|'default'; cards: Card[]; boss: { name: string; finalQuestions: Challenge[]; }; }
export type Phase = 1 | 2 | 3;
export interface BestiaryEntry { scriptId: string; creatureTheme: string; level: number; completedAt: string; }
