const ttsElevenLabs = async (text: string) => {
    const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'; // This is the ID for the "George" voice. Replace with your preferred voice ID.
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
    const method = 'POST';
    const headers = {
        'Accept': 'audio/mpeg',
        'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        'Content-Type': 'application/json'
    };
    const data = {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
        },
    };
    const body = JSON.stringify(data);
    const input = {
        method,
        headers,
        body,
    };

    const response = await fetch(url, input);
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const result = await response.arrayBuffer();
    return result;
};

export default ttsElevenLabs;