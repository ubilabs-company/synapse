import { Send, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Message } from '@/components/ai/message'
import { Response } from '@/components/ai/response'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const initialMessages: {
  id: number
  message: string
  role: 'assistant' | 'user'
}[] = [
  {
    id: 1,
    message: 'Hello!',
    role: 'user',
  },
  {
    id: 2,
    message: '**Hi there.** I am an AI model designed to help you.',
    role: 'assistant',
  },
  {
    id: 3,
    message: 'Can you show me some JavaScript code?',
    role: 'user',
  },
  {
    id: 4,
    message: `Here's some code:
  
\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`
`,
    role: 'assistant',
  },
  {
    id: 5,
    message: 'Give me some markdown',
    role: 'user',
  },
  {
    id: 6,
    message: ` Here are examples of **Markdown** formatting for a table, bullet points, and numbered lists.
| Header 1 | Header 2 | Header 3 |
| :--- | :---: | ---: |
| Left-aligned text | Centered text | Right-aligned text |
| Short item | A bit longer content | Last column data |

### Bullet Points (Unordered List)

* Apples 🍎
    * Fuji
    * Gala
* Bananas 🍌
* Oranges 🍊

### Numbered List (Ordered List)

1.  First step: Prepare the ingredients.
2.  Second step: Mix them thoroughly.
3.  Third step: Bake for 30 minutes.`,
    role: 'assistant',
  },
  {
    id: 7,
    message: 'What more can you do?',
    role: 'user',
  },
]
export function Chat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { thread } = useParams<{ thread: string }>()

  function scrollToBottom(smooth = true) {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
        inline: 'nearest',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function sendMessage() {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        role: 'user' as 'user' | 'assistant',
        message: input,
      }
      setMessages([...messages, newMessage])
      setInput('')
    }
  }

  return (
    <>
      <ScrollArea className="flex-1 overflow-auto">
        <div
          className="px-4 mx-auto max-w-[64rem] py-4 space-y-4"
          ref={scrollRef}
        >
          {messages.map(msg =>
            msg.role === 'user' ? (
              <Message key={msg.id} message={msg.message}></Message>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4" key={msg.id}>
                <Sparkles />
                <Response key={msg.id}>{msg.message}</Response>
              </div>
            ),
          )}
        </div>
      </ScrollArea>
      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage()
        }}
        className="px-4 pb-4 mx-auto max-w-[64rem] w-full flex gap-2"
      >
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua pergunta aqui..."
          className="!text-base p-4.75 flex-1"
        />
        <Button type="submit" size="icon-lg">
          <Send className="size-5" />
        </Button>
      </form>
    </>
  )
}
