export interface Speaker {
  id: string;
  name: string;
  affiliation: string;
  bio?: string;
  tags: string[];
  photo: string;
  photoModal?: string;
}

export interface SessionSlot {
  time: string;
  title: string;
  location: string;
  kind: "service" | "plenary" | "keynote" | "sessions" | "break" | "panel" | "networking" | "tour";
  track?: string;
  description?: string;
  speaker?: string;
}

export interface ProgramDay {
  day: string;
  slots: SessionSlot[];
}

export interface FeeWindow {
  label: string;
  value: number;
}

export interface FeeCategory {
  category: string;
  windows: FeeWindow[];
}

export interface Meta {
  title: string;
  date: string;
  venue: string;
  languages: string[];
  emailSubmission: string;
  submissionDeadline: string;
}

export interface CallFormat {
  type: string;
  words: number;
  mustInclude: string[];
}

export interface CallInfo {
  email: string;
  deadlineISO: string;
  languages: string[];
  formats: CallFormat[];
  tracks: string[];
}

export interface Committees {
  organizing: string[];
  executive: string[];
  doctoral: string[];
  scientific: string[];
}
