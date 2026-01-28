export const translations = {
  en: {
    welcome: "Welcome",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    progress: "Your Progress",
    xp: "XP",
    keepGoing: "Keep it up!",
    calm: "Calm",
    stressed: "Stressed",
    tired: "Tired",
    sad: "Sad",
    focused: "Focused",
    language: "Language",
  },
  am: {
    welcome: "እንኳን ደህና መጡ",
    startRecording: "መቅዳት ጀምር",
    stopRecording: "መቅዳት አቁም",
    progress: "እድገትዎ",
    xp: "ነጥብ",
    keepGoing: "ቀጥሉ!",
    calm: "ረጋ",
    stressed: "ውጥረት",
    tired: "ደካማ",
    sad: "አዘን",
    focused: "ተኮር",
    language: "ቋንቋ",
  },
} as const;

export type Language = keyof typeof translations;
