import axios from "axios";

export default async function STT(audioData: any) {

    const baseUrl = "https://api.assemblyai.com";

    const headers = {
        authorization: "token_goes_here",
    };

    const uploadResponse = await axios.post(`${baseUrl}/v2/upload`, audioData, {
        headers,
    });
    // const audioUrl = uploadResponse.data.upload_url;

    const audioUrl = "https://assembly.ai/wildfires.mp3";

    const data = {
        audio_url: audioUrl,
        speech_models: ["universal"],
    };

    const url = `${baseUrl}/v2/transcript`;
    const response = await axios.post(url, data, { headers: headers });

    const transcriptId = response.data.id;
    const pollingEndpoint = `${baseUrl}/v2/transcript/${transcriptId}`;

    while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, {
            headers: headers,
        });
        const transcriptionResult = pollingResponse.data;

        if (transcriptionResult.status === "completed") {
            console.log(transcriptionResult.text);
            break;
        } else if (transcriptionResult.status === "error") {
            throw new Error(`Transcription failed: ${transcriptionResult.error}`);
        } else {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

}