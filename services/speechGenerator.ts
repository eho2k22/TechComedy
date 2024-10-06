import { writeFile } from 'fs/promises';

enum TTSConverter {
    Google = 'google',
    ElevenLabs = 'elevenLabs',
}

import ttsElevenLabs from './ttsElevenLabs'
import ttsGoogle from './ttsGoogle';

const sanitizeText = (text: string): string => (
    text.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
);

const formatText = (text: string): string => (
    // remove all emotions and expressions 
    // 10-4-2024 remove all text eclosed in in {], (), ** 
    text.replace(/\b(but|and|or)\b/gi, '<break time="200ms"/>$1')
    .replace(/!/g, '<emphasis level="strong">!</emphasis><break time="500ms"/>')
    .replace(/\?/g, '<prosody pitch="high">?</prosody><break time="500ms"/>')
    .replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '')
);
  
const prepareComedyText = (text: string): string => formatText(sanitizeText(text));

const saveFile = async (fileName: string, data: any) => {
    const audioFileName = `${fileName}_${Date.now()}.mp3`;
    await writeFile(`public/${audioFileName}`, data, 'binary');
    return { audioUrl: `/${audioFileName}` };
};


const convertTextToSpeech = async (text: string, converter: TTSConverter) => {
    switch(converter) {
        case TTSConverter.ElevenLabs: {
            const file = await ttsElevenLabs(text);
            return file;
        }
        case TTSConverter.Google: {
            const file = await ttsGoogle(text);
            return file;
        }
        default:
            throw new Error('Invalid converter type');
    }
}

const synthesizeSpeach = async (text: string, converter: TTSConverter) => {
    const preparedText = prepareComedyText(text);
    try {  
        const file = convertTextToSpeech(preparedText, converter);
        const result = saveFile(converter ,file)
        return result;
    } catch (error: any) {
        console.error(`Error synthesizing speech with ${converter}:`, error.response?.data || error.message);
        return { error: 'Failed to generate content' };
    }
    
};


export default synthesizeSpeach