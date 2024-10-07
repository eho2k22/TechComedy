const express = require('express');
const cors = require('cors');
const path = require('path');
//require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 10-1-2024 Google TTS 
const textToSpeech = require('@google-cloud/text-to-speech');
const { writeFile } = require('fs').promises;

const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));


// 10-1-2024 Google TTS client 
const ttsClient = new textToSpeech.TextToSpeechClient();

// 10-3 SynthesizeWithReTry
async function synthesizeSpeechWithRetry(ssmlText, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const request = {
        //input: { text: text },
        input: { ssml: ssmlText },
        voice: { 
          languageCode: 'en-US', 
          name: 'en-US-Casual-K', // A male voice that sounds more natural
          ssmlGender: 'MALE'
        },
        audioConfig: { 
          audioEncoding: 'MP3',
          pitch: 0.7, // Slightly lower pitch for a more mature sound
          speakingRate: 1.2 // Slightly faster for comedic timing
        },
      };
      const [response] = await ttsClient.synthesizeSpeech(request);
      return response;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
}


app.use(cors({
    origin: '*', // Adjust as necessary
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type']
  }));


  

// A simple route to check server status
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Serve environment variables to the client
app.get('/config', (req, res) => {
  res.json({
    /* */
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_KEY  // It should be the public 'anon' key, not the secret key
  });
});


app.post('/generate-poem-original', async (req, res) => {
  const { name } = req.body;
  try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4o",
          messages: [
              {
                  role: "system",
                  content: "You are a creative, humorous, sarcastic comedian poet, expert in composing witty monologues using common tech terms that reflect the common stereotypes and poke fun at common scenarios in the current tech world, in 80 words or less."
              },
              {
                  role: "user",
                  content: `Create a funny, humorous and witty poem with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${name}. `
              }
          ]
      }, {
          headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
          }
      });
      console.log('Inside OpenAI Post:  About to dissect API response !')
      if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
          console.log('Inside OpenAI Post:  Response Object received! !');
          console.log(response.data.choices[0]);
          console.log(response.data.choices[0].message.content);
          res.json({ poem: response.data.choices[0].message.content });
      } else {
          throw new Error("Invalid response structure from OpenAI");
      }
  } catch (error) {
   
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to generate poem');

        //console.error('Oops! Some Error while generating poem from OpenAI:', error);
        //res.status(500).send('Failed to generate poem');
  }
});



// 10-3-2024 Synthesize-Speech with Google TTS with topic and contentType 

app.post('/generate-poem', async (req, res) => {
  const { name, contentType } = req.body;
  try {
      let prompt;
      if (contentType === 'poem') {
          prompt = `Create a funny, humorous and witty poem with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${name}, in 80 to 100  words`;
      } else if (contentType === 'monologue') {
          prompt = `Create a funny, humorous and witty monologue using nerdy technology terms and jargons, for a topic titled ${name}, in 90 to 110 words. Include some comedic pauses and emphasize key punchlines.`;
      } else {
          throw new Error("Invalid content type");
      }

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-4",
          messages: [
              {
                  role: "system",
                  content: "You are a creative, humorous, sarcastic comedian poet, expert in composing witty monologues or poems with precise prosody, using common tech terms that reflect the common stereotypes and poke fun at common scenarios in the current tech world."
              },
              {
                  role: "user",
                  content: prompt
              }
          ]
      }, {
          headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
          }
      });

      console.log('Inside OpenAI Post: About to dissect API response!');
      if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
          console.log('Inside OpenAI Post: Response Object received!');
          console.log(response.data.choices[0]);
          console.log(response.data.choices[0].message.content);
          res.json({ poem: response.data.choices[0].message.content });
      } else {
          throw new Error("Invalid response structure from OpenAI");
      }
  } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to generate content' });
  }
});




// 10-2-2024 Synthesize-Speech with Google TTS 

function sanitizeText(text) {
  return text.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&apos;');
}


function prepareComedyText(text) {
  const sanitized = sanitizeText(text);
  return sanitized.replace(/\b(but|and|or)\b/gi, '<break time="200ms"/>$1')
                  .replace(/!/g, '<emphasis level="strong">!</emphasis><break time="500ms"/>')
                  .replace(/\?/g, '<prosody pitch="high">?</prosody><break time="500ms"/>')
                  // remove all emotions and expressions 
                  // 10-4-2024 remove all text eclosed in in {], (), ** 
                  .replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '');

}

function prepareComedyScript(text) {
  // Remove all text enclosed within (), [], and **
  return text.replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '');
}



app.post('/synthesize-speech', async (req, res) => {
  const { text } = req.body;
  // Use this function before passing text to SSML
  const preparedText = prepareComedyText(text);
  const simpleSsmlText = `<speak>
      <prosody rate="1.1" pitch="+2st">
      ${preparedText}
      </prosody>
      </speak>`;
  
  try {
    const complexSsmlText = `<speak>
      <prosody rate="1.1" pitch="+2st">
        ${preparedText.split('.').map(sentence => 
          `<prosody pitch="medium">${sentence.trim()}.</prosody>
          <break time="500ms"/>`
        ).join('')}
      </prosody>
    </speak>`;

    console.log('Prepared SSML:', complexSsmlText);


      //const [response] = await ttsClient.synthesizeSpeech(request);

      // 10-3-2024 try synthesizeWithRetry
      let response = null;
      try {
        console.log("Trying complex SSML");
        response = await synthesizeSpeechWithRetry(complexSsmlText);
      }
      catch{
        console.log("Complex SSML failed, falling back to simple SSML");
        console.warn("Complex SSML failed, falling back to simple SSML");
        // 10-3-2024 fall back to simple SSML
        response = await synthesizeSpeechWithRetry(simpleSsmlText);
      }
      const audioFileName = `speech_${Date.now()}.mp3`;
      await writeFile(`public/${audioFileName}`, response.audioContent, 'binary');
      res.json({ audioUrl: `/${audioFileName}` });
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Failed to synthesize speech');
  }
});


// 10-4 Build Voice with 11labs API


app.post('/synthesize-speech-11labs', async (req, res) => {
  const { text } = req.body;
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY; // Make sure to set this in your environment variables
  const VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'; // This is the ID for the "George" voice. Replace with your preferred voice ID.

  // Use this function before passing text to ElevenLabs API
  const preparedText = prepareComedyScript(text);


  try {
    const response = await axios({
      method: 'post',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      data: {
        text: preparedText,
        model_id: 'eleven_multilingual_v2',
        vvoice_settings: {
          stability: 0.4, // Slightly reduced for more variability
          similarity_boost: 0.7, // Increased for more expressiveness
          style: 1.2, // Add style parameter for more energy (values > 1 increase energy)
          use_speaker_boost: true // This can help with clarity and energy
        }
      },
      responseType: 'arraybuffer'
    });

    //const audioFileName = `speech_11labs_${Date.now()}.mp3`;
    //const audioFilePath = path.join('public', audioFileName);
    //await fs.writeFile(audioFilePath, response.data);
    //res.json({ audioUrl: `/${audioFileName}` });
    
    const audioFileName = `speech_11labs_${Date.now()}.mp3`;
    await writeFile(`public/${audioFileName}`, response.data, 'binary');
    res.json({ audioUrl: `/${audioFileName}` });

  } catch (error) {
    console.error('Error synthesizing speech with ElevenLabs:', error.response?.data || error.message);
    res.status(500).send('Failed to synthesize speech with ElevenLabs');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

