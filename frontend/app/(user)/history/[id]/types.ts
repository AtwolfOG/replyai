
export type ReplyState = {
  tone: "casual" | "friendly" | "professional" | "educational" | "humorous" | "persuasive";
  length: "short" | "medium" | "long";
  audience: "general" | "student" | "developer" | "professional" | "academic" | "social media";
  language: "English" | "Spanish" | "French";
  transcript: string;
  reply: string;
}