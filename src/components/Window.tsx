import { Link, useNavigate, useLocation } from 'react-router-dom'
import { XCircleIcon, ChevronLeftIcon } from '@heroicons/react/solid'

interface Props {
  title: string
  rootPathname?: string
  children: React.ReactNode
}

export default function Window({ title, rootPathname, children }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="m-auto w-[clamp(0px,100vw-2rem,640px)] h-[clamp(0px,100%-2rem,480px)] grid grid-rows-[min-content_1fr] bg-white border-2 border-white overflow-hidden shadow-lg rounded-md">
      <div className="flex items-center bg-gray-200 border-b-2 border-white py-1 px-2">
        <div className="flex-1 flex items-center">
          {rootPathname && location.pathname !== rootPathname ? (
            <button
              type="button"
              className="text-slate-500 hover:text-slate-900"
              onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          ) : null}
        </div>
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
  )
}
