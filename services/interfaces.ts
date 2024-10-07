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
