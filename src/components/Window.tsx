import { Link } from 'react-router-dom'
import { XCircleIcon } from '@heroicons/react/solid'
import Center from './Center'

interface Props {
  title: string
  children: React.ReactNode
}

export default function Window({ title, children }: Props) {
  return (
    <Center>
      <div className="w-[clamp(0px,100vw-2rem,640px)] h-[clamp(0px,100%-2rem,480px)] grid grid-rows-[min-content_1fr] bg-white border-2 border-white overflow-hidden shadow-lg rounded-md">
        <div className="flex items-center bg-gray-200 py-1 px-2">
          <div className="flex-1"></div>
          <div>{title}</div>
          <div className="flex-1 flex justify-end">
            <Link
              to="/"
              className="block rounded-full bg-white text-red-500 hover:text-red-700"
            >
              <XCircleIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </Center>
  )
}
