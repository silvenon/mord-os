import { useState, useEffect, useRef } from 'react'
import {
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { PlusCircleIcon } from '@heroicons/react/outline'

import Window from './Window'
import Button from './Button'
import {
  textFiles,
  createTextFile,
  editTextFile,
  TextFile,
} from '../stores/text-files'

export default function TextEditor() {
  const list = useStore(textFiles)
  const [newFilePath, setNewFilePath] = useState('')
  const newFilePathRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/text-editor/new') {
      newFilePathRef.current?.focus()
    }
  }, [location.pathname])

  return (
    <Window title="Text Editor">
      <div className="grid grid-cols-[160px_1fr] divide-x">
        <div className="py-[2px] pr-[2px] h-full grid grid-rows-[1fr_auto]">
          {list.length ? (
            <ul>
              <Routes>
                <Route
                  path="new"
                  element={
                    <li className="p-1">
                      <input
                        ref={newFilePathRef}
                        type="text"
                        className="block w-full h-7"
                        placeholder="File name"
                        value={newFilePath}
                        onChange={(event) => setNewFilePath(event.target.value)}
                      />
                    </li>
                  }
                />
              </Routes>
              {list.map((file) => (
                <li key={file.path}>
                  <NavLink
                    to={`/text-editor/edit/${file.path}`}
                    className={({ isActive }) =>
                      `block px-2 py-1 hover:text-pink-700 hover:bg-pink-100 ${
                        isActive ? 'text-pink-700 font-medium' : 'text-gray-500'
                      }`
                    }
                  >
                    {file.path.split('/').slice(-1)[0]}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
          <Routes>
            <Route path="new" element={null} />
            <Route
              path="*"
              element={
                <div className="p-1.5">
                  <Button
                    as={Link}
                    variant="primary"
                    to="/text-editor/new"
                    className="flex gap-1 justify-center"
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>New</span>
                  </Button>
                </div>
              }
            />
          </Routes>
        </div>
        <Routes>
          <Route path="/" element={<div className="bg-slate-100" />} />
          <Route
            path="new"
            element={
              <TextEditorForm
                onSave={(content) => {
                  if (newFilePath) {
                    createTextFile({ content, path: newFilePath })
                    setNewFilePath('')
                    navigate(`/text-editor/edit/${newFilePath}`)
                  } else {
                    newFilePathRef.current?.focus()
                  }
                }}
              />
            }
          />
          <Route
            path="edit/:filePath"
            element={
              <TextEditorEdit
                onSave={(file) => {
                  editTextFile(file)
                }}
              />
            }
          />
        </Routes>
      </div>
    </Window>
  )
}

function TextEditorEdit({ onSave }: { onSave: (file: TextFile) => void }) {
  const { filePath } = useParams()
  const list = useStore(textFiles)
  const file = list.find((file) => file.path === filePath)
  if (!file || !filePath) {
    return <Navigate to="/text-editor" />
  }
  return (
    <TextEditorForm
      initialValue={file.content}
      onSave={(content) => onSave({ path: filePath, content })}
    />
  )
}

function TextEditorForm({
  initialValue = '',
  onSave,
}: {
  initialValue?: string
  onSave: (content: string) => void
}) {
  const [fileContent, setFileContent] = useState('')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setFileContent(initialValue)
  }, [initialValue])

  useEffect(() => {
    setTouched(false)
  }, [initialValue])

  return (
    <form
      className="grid grid-rows-[1fr_auto]"
      onSubmit={(event) => {
        event.preventDefault()
        onSave(fileContent)
      }}
    >
      <textarea
        className="block w-[calc(100%-1px)] max-h-[calc(100%-1px)] resize-none border-0"
        placeholder="Text content"
        value={fileContent}
        onChange={(event) => {
          setTouched(true)
          setFileContent(event.target.value)
        }}
      />
      {touched ? (
        <div className="flex items-center justify-between p-2">
          <Button as={Link} variant="secondary" to="/text-editor">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      ) : null}
    </form>
  )
}
