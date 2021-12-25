import { NavLink } from 'react-router-dom'
import {
  DocumentTextIcon,
  // CameraIcon,
  PhotographIcon,
} from '@heroicons/react/solid'

const applications = [
  {
    name: 'Text Editor',
    path: '/text-editor',
    Icon: DocumentTextIcon,
  },
  // not sure how this app would work in the context of the Photos app
  // {
  //   name: 'Camera',
  //   path: '/camera',
  //   Icon: CameraIcon,
  // },
  {
    name: 'Photos',
    path: '/photos',
    Icon: PhotographIcon,
  },
]

export default function Dock() {
  return (
    <div className="flex items-center justify-center gap-3 overflow-y-hidden">
      {applications.map(({ name, path, Icon }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `block py-4 px-3 drop-shadow-lg transition ${
              isActive
                ? 'text-pink-600 scale-125'
                : 'text-white hover:scale-125'
            }`
          }
        >
          <Icon className="h-16 w-16 " aria-label={name} />
        </NavLink>
      ))}
    </div>
  )
}
