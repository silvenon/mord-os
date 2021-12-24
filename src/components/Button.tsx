// https://www.benmvp.com/blog/polymorphic-react-components-typescript/

type Variant = 'primary' | 'secondary'

interface BaseProps<C extends React.ElementType> {
  as?: C
  variant: Variant
  children: React.ReactNode
}

type Props<C extends React.ElementType> = BaseProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof BaseProps<C>>

export default function Button<C extends React.ElementType = 'button'>({
  as,
  variant,
  className,
  ...props
}: Props<C>) {
  const Component = as || 'button'
  return (
    <Component
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
        variant === 'primary'
          ? 'shadow-sm text-white bg-pink-600 hover:bg-pink-700'
          : ''
      } ${
        variant === 'secondary'
          ? 'text-pink-700 bg-pink-100 hover:bg-pink-200'
          : ''
      } ${className}`}
      {...props}
    />
  )
}
