import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

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
    const basePath = FileSystem.Paths.document.uri;
    const fileName = `audio-${Date.now()}.m4a`;
    const finalUri = `${basePath}${fileName}`;

    await FileSystem.copyAsync({
      from: tempUri,
      to: finalUri,
    });

    await FileSystem.deleteAsync(tempUri);

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
        Audio.RecordingOptionsPresets.HIGH_QUALITY
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

      if (!tempUri) return;

      const savedUri = await saveRecordingFile(tempUri);
      setAudioUri(savedUri);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  /* -------------------------------------------------- */
  /* UI                                                */
  /* -------------------------------------------------- */
  return (
    <View className="flex-1 items-center justify-center p-6 bg-background">
      <Text className="text-xl font-semibold mb-6">
        Audio Recorder
      </Text>

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

      {audioUri && (
        <Text className="text-xs mt-6 text-gray-500 text-center">
          Saved at:
          {"\n"}
          {audioUri}
        </Text>
      )}
    </View>
  );
}
