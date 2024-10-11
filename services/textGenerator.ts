'use server'
import OpenAI from 'openai'
import { ContentType, IMessage } from './interfaces'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const generatePoemContent = (topic: string): string =>
  `Create a funny, humorous and witty poem with catchy punchlines using nerdy technology terms and jargons that rhyme, for a topic titled ${topic}, in 80 to 100  words`

const generateMonologueContent = (topic: string): string =>
  `Create a funny, humorous and witty monologue using nerdy technology terms and jargons, for a topic titled ${topic}, in 90 to 110 words. Include some comedic pauses and emphasize key punchlines.`

const generateUserContent = (
  topic: string,
  contentType: ContentType,
): string => {
  switch (contentType) {
    case ContentType.Poem:
      return generatePoemContent(topic)
    case ContentType.Monologue:
      return generateMonologueContent(topic)
    default:
      throw new Error('Invalid content type')
  }
}

const generateMessage = (userContent: string): IMessage => ({
  role: 'user',
  content: userContent,
})

const getLastAssistantTextMessage = async (threadId: string) => {
  const messages = await openai.beta.threads.messages.list(threadId)
  const assistantMessages = messages.data.filter(
    (message) => message.role === 'assistant',
  )
  const lastAssistantMessage = assistantMessages.pop()
  if (lastAssistantMessage?.content[0].type !== 'text') {
    throw new Error(
      `Last message is not text. Message type: ${lastAssistantMessage?.content[0].type}`,
    )
  }
  return lastAssistantMessage.content[0].text.value
}

const sendRequest = async (message: IMessage): Promise<string> => {
  if (!process.env.ASSISTANT_ID) {
    throw new Error('Missing Assistant ID')
  }

  const assistant = { assistant_id: process.env.ASSISTANT_ID }
  const thread = await openai.beta.threads.create({ messages: [message] })
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, assistant)

  if (run.status !== 'completed') {
    throw new Error(`Run status is not completed. Status: ${run.status}`)
  }

  const content = await getLastAssistantTextMessage(thread.id)
  return content
}

const generateText = async (
  topic: string,
  contentType: ContentType,
): Promise<string> => {
  const userContent = generateUserContent(topic, contentType)
  const message = generateMessage(userContent)
  const result = await sendRequest(message)
  return result
}

export default generateText
