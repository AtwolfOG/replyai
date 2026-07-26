export type User = {
  id: string;
  email: string;
  name: string;
  profile_picture: string;
  createdAt: string;
  updatedAt: string;
}

export type Settings = {
  default_tone: string;
  default_length: string;
  default_audience: string;
  // default_language: string;
}

export type Reply = {
  id: string;
  transcript: string;
  tone: string;
  length: string;
  audience: string;
  generated_reply: string;
  createdAt: string;
  updatedAt: string;
}

export type GenerateReplyRequest = {
  user_message: string;
  tone: string;
  length: string;
  audience: string;
}

export type GenerateReplyResponse = {
  id: string;
  reply: string;
}
