import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function RecordScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  /* -------------------------------------------------- */
  /* Permissions                                       */
  /* -------------------------------------------------- */
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setPermissionGranted(status === "granted");

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  /* -------------------------------------------------- */
  /* Save file using modern FileSystem API              */
  /* -------------------------------------------------- */
const saveRecordingFile = async (tempUri: string) => {
  // 🌐 WEB: do nothing — browser handles blob URLs
  if (Platform.OS === "web") {
    return tempUri;
  }

  // 📱 NATIVE (iOS / Android)
  const baseDir = FileSystem.cacheDirectory || FileSystem.documentDirectory;

  if (!baseDir) {
    // Extremely rare, but keeps TS + runtime safe
    return tempUri;
  }

  const audioDir = `${baseDir}audio/`;
  const fileName = `audio-${Date.now()}.m4a`;
  const finalUri = `${audioDir}${fileName}`;

  try {
    await FileSystem.makeDirectoryAsync(audioDir, { intermediates: true });
  } catch {
    // Directory may already exist — safe to ignore
  }

  // ✅ copyAsync is NOT deprecated (only moveAsync is)
  await FileSystem.copyAsync({
    from: tempUri,
    to: finalUri,
  });

  return finalUri;
};

  /* -------------------------------------------------- */
  /* Start recording                                   */
  /* -------------------------------------------------- */
  const startRecording = async () => {
    try {
      if (!permissionGranted) return;

      const rec = new Audio.Recording();

      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  /* -------------------------------------------------- */
  /* Stop recording                                    */
  /* -------------------------------------------------- */
  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const tempUri = recording.getURI();
      setRecording(null);
      console.log("Recording stopped and stored at", tempUri);
      if (!tempUri) return;

      const savedUri = await saveRecordingFile(tempUri);
      setAudioUri(savedUri);
      console.log("Recording saved at", savedUri);

      // await STT(savedUri);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  /* -------------------------------------------------- */
  /* UI                                                */
  /* -------------------------------------------------- */
  return (
    <View className="flex-1 items-center justify-center p-6 bg-background">
      <Text className="text-xl font-semibold mb-6">Audio Recorder</Text>

      <Pressable
        onPress={recording ? stopRecording : startRecording}
        className="items-center justify-center"
      >
        {/* Outer soft ring */}
        <View
          className={`
      w-32 h-32 rounded-full items-center justify-center
      ${recording ? "bg-neutral-800" : "bg-neutral-200"}
    `}
        >
          {/* Inner mic button */}
          <View
            className={`
        w-20 h-20 rounded-full items-center justify-center
        ${recording ? "bg-red-600" : "bg-neutral-900"}
      `}
          >
            <Text className="text-white text-2xl">
              {recording ? "■" : "🎙️"}
            </Text>
          </View>
        </View>

        {/* Label */}
        <Text className="mt-6 text-sm text-neutral-500">
          {recording ? "Tap to stop recording" : "Tap to start recording"}
        </Text>
      </Pressable>

      {/* {audioUri && (
        <Text className="text-xs mt-6 text-gray-500 text-center">
          Saved at:
          {"\n"}
          {audioUri}
        </Text>
      )} */}
    </View>
  );
}
