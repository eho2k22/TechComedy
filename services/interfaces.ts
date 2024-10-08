export enum TTSConverter {
  Google = 'google',
  ElevenLabs = 'elevenLabs',
}

export enum ContentType {
  Poem = 'poem',
  Monologue = 'monologue',
}

export interface IMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface IPrompt {
  model: string
  messages: IMessage[]
}

export interface ITextGeneratorInput {
  topic: string
  contentType: ContentType
}

export interface ITextGeneratorOutput {
  content?: string
  error?: string
}

export interface ISpeechGeneratorInput {
  text: string
  converter: TTSConverter
}

export interface ISpeechGeneratorOutput {
  audioUrl?: string
  error?: string
}
