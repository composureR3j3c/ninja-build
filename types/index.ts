export type Meditation = {
  id: number;
  title: string;
  duration: number;
  type: 'audio' | 'video';
  pro: boolean;
};

export type Mood =
  | "calm"
  | "stressed"
  | "tired"
  | "sad"
  | "focused"
  | "anxious"
  | "unmotivated"
  | "overwhelmed"
  | "energetic"
  | "lonely"
  | "happy";

  