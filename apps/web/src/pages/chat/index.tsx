import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Response } from '@/components/shadcn-io/ai/response'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const initialMessages = [
  {
    id: 1,
    message: 'Hello!',
    isMe: true,
  },
  {
    id: 2,
    message: '**Hi there.** I am an AI model designed to help you.',
    isMe: false,
  },
  {
    id: 3,
    message: 'Can you show me some JavaScript code?',
    isMe: true,
  },
  {
    id: 4,
    message: `Here's some code:
  
\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`
`,
    isMe: false,
  },
  {
    id: 5,
    message: 'Give me some markdown',
    isMe: true,
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
    isMe: false,
  },
  {
    id: 7,
    message: 'What more can you do?',
    isMe: true,
  },
]
export function Chat() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: input,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMe: true,
      }
      setMessages([...messages, newMessage])
      setInput('')
    }
  }
  return (
    <>
      <ScrollArea className="flex-1 overflow-auto" ref={scrollRef}>
        <div className="px-4 mx-auto max-w-[64rem] py-4 space-y-4">
          {messages.map(msg =>
            msg.isMe ? (
              <div key={msg.id} className={'flex gap-3 flex-row-reverse'}>
                <div className={'flex flex-col gap-1 items-end'}>
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[250px] ${
                      msg.isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-base">{msg.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Response key={msg.id}>{msg.message}</Response>
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
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  )
}
