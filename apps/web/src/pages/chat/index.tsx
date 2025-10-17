import { MessageSquare } from 'lucide-react'
import { nanoid } from 'nanoid'
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'

export function Chat() {
  const messages: {
    key: string
    value: string
    name: string
  }[] = [
    {
      key: nanoid(),
      value: 'Hello, how are you?',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: "I'm good, thank you! How can I assist you today?",
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: "I'm looking for information about your services.",
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value:
        'Sure! We offer a variety of AI solutions. What are you interested in?',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: "I'm interested in natural language processing tools.",
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'Great choice! We have several NLP APIs. Would you like a demo?',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'Yes, a demo would be helpful.',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'Alright, I can show you a sentiment analysis example. Ready?',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'Yes, please proceed.',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: "Here is a sample: 'I love this product!' → Positive sentiment.",
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'Impressive! Can it handle multiple languages?',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'Absolutely, our models support over 20 languages.',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'How do I get started with the API?',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'You can sign up on our website and get an API key instantly.',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'Is there a free trial available?',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'Yes, we offer a 14-day free trial with full access.',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'What kind of support do you provide?',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: 'We provide 24/7 chat and email support for all users.',
      name: 'AI Assistant',
    },
    {
      key: nanoid(),
      value: 'Thank you for the information!',
      name: 'Alex Johnson',
    },
    {
      key: nanoid(),
      value: "You're welcome! Let me know if you have any more questions.",
      name: 'AI Assistant',
    },
  ]

  return (
    <Conversation
      className="relative w-full h-full"
      style={{ height: '500px' }}
    >
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquare className="size-12" />}
            title="No messages yet"
            description="Start a conversation to see messages here"
          />
        ) : (
          messages.map((message, index) => (
            <Message
              from={index % 2 === 0 ? 'user' : 'assistant'}
              key={message.key}
            >
              <MessageContent>{message.value}</MessageContent>
            </Message>
          ))
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
