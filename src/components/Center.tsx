interface Props {
  className?: string
  children: React.ReactNode
}

export default function Center({ className = '', children }: Props) {
  return (
    <div
      className={`h-full flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  )
}
