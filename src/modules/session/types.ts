import { type SelectMenuItemType } from '@common/types';

export enum SessionTimeEnum {
  '5 Seconds' = '5 Seconds',
  '10 Seconds' = '10 Seconds',
  '15 Seconds' = '15 Seconds',
  '20 Seconds' = '20 Seconds',
}

export enum NoteEnum {
  Important = 'Important',
  Question = 'Question',
  Info = 'Info',
  Location = 'Location',
  Link = 'Link',
  Idea = 'Idea',
}

export enum SessionOrderEnum {
  Sort = 'Sort',
  Random = 'Random',
}

interface NoteIconType {
  name: string;
  value: string | null;
  iconColor: string;
  bgColor: string;
}

export interface NoteDataType {
  id: string;
  text: string;
  icon: NoteIconType;
}

export interface SettingsVoiceType {
  voice: SelectMenuItemType;
  pitch: number;
  rate: number;
  volume: number;
}

export interface SettingsType {
  isTimed: boolean;
  shouldHaveOrder: boolean;
  shouldReadOutLoud: boolean;
  time: SelectMenuItemType;
  order: SelectMenuItemType;
  voice: SettingsVoiceType;
}

export interface SessionQuestionType {
  id: string;
  question: string;
  answer?: string;
  time?: SelectMenuItemType;
}

export interface SessionDataType {
  id: string;
  userId: string;
  questions: SessionQuestionType[];
  settings: SettingsType;
  notes?: NoteDataType[];
}
