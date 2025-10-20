import type { HTMLAttributes } from 'react'

type Props = {
  message: string
} & HTMLAttributes<HTMLDivElement>

export function Message({ message, ...props }: Props) {
  return (
    <div className={'flex gap-3 flex-row-reverse'} {...props}>
      <div className={'flex flex-col gap-1 items-end'}>
        <div className="rounded-lg px-3 py-2 max-w-[250px] text-primary-foreground bg-primary">
          <p className="text-base">{message}</p>
        </div>
      </div>
    </div>
  )
}
