export enum TTSConverter {
  Google = 'google',
  ElevenLabs = 'elevenLabs',
}

export enum ContentType {
  Poem = 'poem',
  Monologue = 'monologue',
}

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ITextGeneratorInput {
  topic: string
  contentType: ContentType
}

export interface ISpeechGeneratorInput {
  text: string
  converter: TTSConverter
}

export interface ISpeechGeneratorOutput {
  audioUrl?: string
  error?: string
}
