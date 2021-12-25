import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="m-auto prose text-center prose-invert drop-shadow-sm">
      <div className="p-4 bg-black/25 rounded-lg">
        <h1 className="mb-2">Page not found</h1>
        <Link to="/">← Go home</Link>
      </div>
    </div>
  )
}
