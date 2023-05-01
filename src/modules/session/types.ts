import { type HeroIconType } from '@common/types';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';

export enum SessionTimeEnum {
  '5 Seconds' = '5 Seconds',
  '10 Seconds' = '10 Seconds',
  '15 Seconds' = '15 Seconds',
  '20 Seconds' = '20 Seconds',
}

export enum SessionOrderEnum {
  Sort = 'Sort',
  Random = 'Random',
}

interface NoteIconType {
  name: string;
  value: string | null;
  icon: HeroIconType;
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
  time?: SelectMenuItemType;
  order?: SelectMenuItemType;
  voice?: SettingsVoiceType;
}

export interface SessionQuestionType {
  id: string;
  question: string;
  answer?: string | null;
  time?: SelectMenuItemType;
}

export interface SessionDataType {
  questions: SessionQuestionType[];
  notes?: NoteDataType[];
  settings: SettingsType;
}
