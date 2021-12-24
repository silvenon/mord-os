import { Link } from 'react-router-dom'
import Center from '../components/Center'

export default function Welcome() {
  return (
    <Center>
      <div className="prose text-center">
        <h1>
          Welcome to <span className="text-purple-500">Mord OS</span>
        </h1>
        <p className="lead -mt-3">The one OS to rule them all</p>
        <Link to="/login">Login</Link>
      </div>
    </Center>
  )
}
