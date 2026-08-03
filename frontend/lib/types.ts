type Tone = "casual" | "friendly" | "professional" | "educational" | "humorous" | "persuasive";
type Length = "short" | "medium" | "long";
type Audience = "general" | "student" | "developer" | "professional" | "academic" | "social media";

export type User = {
  id: string;
  email: string;
  name: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export type Settings = {
  default_tone: Tone;
  default_length: Length;
  default_audience: Audience;
  // default_language: string;
  auto_copy: boolean;
}

export type UpdateSettingsRequest = {
  default_tone: Tone;
  default_length: Length;
  default_audience: Audience;
  auto_copy: boolean;
}

export type Reply = {
  id: string;
  transcript: string;
  tone: Tone;
  length: Length;
  audience: Audience;
  generated_reply: string;
  created_at: string;
  updated_at: string;
}

export type GenerateReplyRequest = {
  user_message: string;
  tone: Tone;
  length: Length;
  audience: Audience;
}

export type GenerateReplyResponse = {
  id: string;
  generated_reply: string;
}

export type CallbackResponse = {
  access_token: string;
}

export type ActionType = {
  tone: "SET_TONE";
  length: "SET_LENGTH";
  audience: "SET_AUDIENCE";
  settings: "SET_SETTINGS";
  transcript: "SET_TRANSCRIPT" | "ADD_TRANSCRIPT";
  cleartranscript: "CLEAR_TRANSCRIPT";
  reply: "SET_REPLY";
}

export type SettingsState = {
  tone: Tone;
  length: Length;
  audience: Audience;
}

export type SettingsStateAction = {
    type: ActionType["tone"];
    payload: Tone;
  }
| {
    type: ActionType["length"];
    payload: Length;
  }
| {
    type: ActionType["audience"];
    payload: Audience;
  }

export type GeneralSettingsState = SettingsState & {
  auto_copy: boolean;
}

export type GeneralSettingsStateAction = {
  type: ActionType["settings"]
  payload: Partial<GeneralSettingsState>;
}

export type ReplyState = SettingsState & {
  transcript: string;
  reply: string;
}

export type ReplyStateAction =
  | SettingsStateAction
  | {
      type: ActionType["transcript"] | ActionType["reply"];
      payload: string;
    }
  | {
      type: ActionType["cleartranscript"];
    }
  | {
      type: ActionType["settings"];
      payload: Partial<ReplyState>;
    };

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}