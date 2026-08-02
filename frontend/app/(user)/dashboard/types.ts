export type ReplyState = {
  tone: "casual" | "friendly" | "professional" | "educational" | "humorous" | "persuasive";
  length: "short" | "medium" | "long";
  audience: "general" | "student" | "developer" | "professional" | "academic" | "social media";
  language: "English" | "Spanish" | "French";
  transcript: string;
  reply: string;
}

export type ReplyStateAction = {
  type: "SET_SETTINGS" | "SET_TONE" | "SET_LENGTH" | "SET_AUDIENCE" | "SET_LANGUAGE" | "SET_TRANSCRIPT" | "SET_REPLY";
  payload: string | Partial<ReplyState>;
}