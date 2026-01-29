import { Meditation, Mood,  } from './types';

export const meditations: Meditation[] = [
  {
    id: 1,
    title: '60 Seconds of Mindfulness',
    duration: 1,
    type: 'audio',
    pro: false,
  },
  {
    id: 2,
    title: '5 Minute Breathing Exercise',
    duration: 5,
    type: 'audio',
    pro: true,
  },
  {
    id: 3,
    title: 'Body Scan Meditation',
    duration: 10,
    type: 'audio',
    pro: true,
  },
  {
    id: 4,
    title: 'Loving-Kindness Practice',
    duration: 15,
    type: 'audio',
    pro: true,
  },
  {
    id: 5,
    title: 'Stress Relief Meditation',
    duration: 8,
    type: 'audio',
    pro: true,
  },
  {
    id: 6,
    title: 'Morning Energy Boost',
    duration: 3,
    type: 'audio',
    pro: true,
  },
  {
    id: 7,
    title: 'Sleep Preparation',
    duration: 12,
    type: 'audio',
    pro: true,
  },
  {
    id: 8,
    title: 'Focus Enhancement',
    duration: 7,
    type: 'audio',
    pro: true,
  },
  {
    id: 9,
    title: 'Gratitude Reflection',
    duration: 4,
    type: 'audio',
    pro: false,
  },
  {
    id: 10,
    title: 'Anxiety Reduction',
    duration: 6,
    type: 'audio',
    pro: true,  
  },
  {
    id: 11,
    title: 'Mindful Walking',
    duration: 10,
    type: 'audio',
    pro: true,
  },
  {
    id: 12,
    title: 'Evening Relaxation',
    duration: 5,
    type: 'audio',
    pro: false,
  }
  
];
export const MOODS: { id: string; key: Mood; labelKey: Mood; emoji: string }[] = [
  { id: "1", key: "calm", labelKey: "calm", emoji: "😌" },
  { id: "2", key: "stressed", labelKey: "stressed", emoji: "😣" },
  { id: "3", key: "tired", labelKey: "tired", emoji: "😴" },
  { id: "4", key: "sad", labelKey: "sad", emoji: "😔" },
  { id: "5", key: "focused", labelKey: "focused", emoji: "🎯" },
  { id: "6", key: "anxious", labelKey: "anxious", emoji: "😰" },
  { id: "7", key: "unmotivated", labelKey: "unmotivated", emoji: "😕" },
  { id: "8", key: "overwhelmed", labelKey: "overwhelmed", emoji: "😵‍💫" },
  { id: "9", key: "energetic", labelKey: "energetic", emoji: "⚡" },
  { id: "10", key: "lonely", labelKey: "lonely", emoji: "🫂" },
  { id: "11", key: "happy", labelKey: "happy", emoji: "😊" },
];
export const ACTIVITIES: Record<Mood, string[]> = {
  calm: ["Gratitude reflection", "Gentle breathing", "Body scan"],
  stressed: ["Breathing reset", "Letting go", "Tension release"],
  tired: ["Wake-up breathing", "Mindful stretch", "Energy reset"],
  sad: ["Self-compassion", "Emotional check-in", "Kind thoughts"],
  focused: ["Focus timer", "Clarity breathing", "Goal setting"],
  anxious: [
    "4-7-8 breathing",
    "Grounding exercise (5-4-3-2-1)",
    "Reassurance notes",
  ],
  unmotivated: ["2-minute rule", "Tiny task list", "Motivation boost audio"],
  overwhelmed: ["Task dump", "Priority sorting", "Guided calm-down"],
  energetic: [
    "Quick workout",
    "Creative brainstorm",
    "Fast-paced focus sprint",
  ],
  lonely: ["Reach-out reminder", "Connection reflection", "Guided reassurance"],
  happy: ["Positive journaling", "Share gratitude", "Celebrate wins"],
};