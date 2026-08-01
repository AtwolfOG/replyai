export type User = {
  id: string;
  email: string;
  name: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

export type Settings = {
  default_tone: string;
  default_length: string;
  default_audience: string;
  // default_language: string;
  auto_copy: boolean;
}

export type UpdateSettingsRequest = {
  default_tone: string;
  default_length: string;
  default_audience: string;
  auto_copy: boolean;
}

export type Reply = {
  id: string;
  transcript: string;
  tone: string;
  length: string;
  audience: string;
  generated_reply: string;
  created_at: string;
  updated_at: string;
}

export type GenerateReplyRequest = {
  user_message: string;
  tone: string;
  length: string;
  audience: string;
}

export type GenerateReplyResponse = {
  id: string;
  generated_reply: string;
}

export type CallbackResponse = {
  access_token: string;
}