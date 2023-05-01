import { type SessionQuestionType } from '@modules/session/types';

export interface SessionQuestionWithAnswerType extends SessionQuestionType {
  quizAnswer: string;
}
