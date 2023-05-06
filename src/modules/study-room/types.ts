export interface SessionsTableDataType {
  id: string;
  userId: string;
  name: string;
  topic: string;
  questions: number;
  color: string;
  textColor: string;
  isPinned: boolean;
}

export interface SessionFormDetailsType {
  id: string;
  title: string;
  placeholder: string;
  showEmpty: boolean;
  getter: string;
  setter: (value: string) => void;
}

export interface PinnedSessionType {
  id: string;
  sessionId: string;
  total: number;
  text: string;
  className?: string;
}
