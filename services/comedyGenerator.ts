interface IMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface IPrompt {
    model: string;
    messages: IMessage[];
}

enum ContentType {
    Poem = 'poem',
    Monologue = 'monologue',
}

const generateSystemContent = (): string => ('You are a creative, humorous, sarcastic comedian poet, expert in composing witty monologues or poems with precise prosody, using common tech terms that reflect the common stereotypes and poke fun at common scenarios in the current tech world.');

const generatePoemContent = (topic: string): string => (`Create a funny, humorous and witty poem with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${topic}, in 80 to 100  words`);

const generateMonologueContent = (topic: string): string => (`Create a funny, humorous and witty monologue using nerdy technology terms and jargons, for a topic titled ${topic}, in 90 to 110 words. Include some comedic pauses and emphasize key punchlines.`);

const generateUserContent = (topic: string, contentType: ContentType): string => {
    switch (contentType) {
        case ContentType.Poem:
            return generatePoemContent(topic);
        case ContentType.Monologue:
            return generateMonologueContent(topic);
        default:
            throw new Error('Invalid content type');
    }
};

const generatePrompt = (systemContent: string, userContent: string): IPrompt => (
    {
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: systemContent,
            },
            {
                role: "user",
                content: userContent,
            },
        ],
    }
);

const sendRequest = async (prompt: IPrompt) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const method = 'POST';
    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify(prompt);
    const input = {
        method,
        headers,
        body,
    };

    try {
        const response = await fetch(url, input);

        if (!response.ok) throw new Error(`OpenAI API request failed with status ${response.status}`);

        const result = await response.json();
        console.log('OpenAI response:', result);

        if (result.choices && result.choices.length > 0 && result.choices[0].message) {
            return { poem: result.choices[0].message.content };
        } else {
            throw new Error("Invalid response structure from OpenAI");
        }
    } catch (error: any) {
        console.error('Error details:', error.response ? error.response.data : error.message);
        return { error: 'Failed to generate content' };
    }
};

const generateComedy = async (topic: string, contentType: ContentType) => {
    const systemContent = generateSystemContent();
    const userContent = generateUserContent(topic, contentType);
    const prompt = generatePrompt(systemContent, userContent);
    const result = await sendRequest(prompt);
    return result;
}

export default generateComedy;
