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
import { PlusCircleIcon } from '@heroicons/react/outline'

import Window from './Window'
import Button from './Button'

interface TextFile {
  path: string
  content: string
}

export default function TextEditor() {
  const [files, setFiles] = useState<TextFile[]>([
    {
      path: 'one',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis erat at mi euismod, vel auctor augue dapibus. Fusce euismod neque a massa imperdiet varius. Morbi sed leo dictum velit congue dignissim ultrices id elit. Integer accumsan nunc sit amet nunc feugiat sollicitudin. Etiam a porta turpis. Cras porttitor aliquam lectus, vel varius purus ullamcorper et. Aliquam eu ullamcorper lacus. Sed porttitor erat quis neque pulvinar ultrices. Quisque vitae iaculis velit. Ut blandit mi a magna porttitor, at vehicula dui scelerisque. Nullam sed fringilla eros. Vestibulum sed aliquam urna.',
    },
    {
      path: 'two',
      content:
        'Sed accumsan eros turpis, ac consequat arcu mattis ut. Donec molestie bibendum diam nec eleifend. Etiam eu ex justo. Nullam rutrum placerat ipsum vitae ultrices. Aenean condimentum venenatis egestas. Quisque vestibulum ultricies arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec quis nunc semper, consequat orci id, eleifend erat. Morbi bibendum, tortor ut blandit dictum, ligula odio viverra lorem, at faucibus purus leo non enim. Donec condimentum orci vehicula, fermentum lacus eu, imperdiet purus. Nulla id ligula cursus, bibendum turpis ac, ultricies libero. In eros nisl, sodales ac pulvinar et, consequat sed odio. Maecenas sed sodales dolor, sed consectetur nisi. Nulla et risus aliquam, molestie turpis finibus, posuere nisi.',
    },
    {
      path: 'three',
      content:
        'Maecenas lorem ligula, congue non scelerisque id, vulputate vitae ante. Proin risus dui, egestas sed gravida a, accumsan et ante. Curabitur non risus ultricies, mollis ipsum in, eleifend arcu. Donec varius turpis augue, quis convallis justo mattis in. Aliquam et efficitur neque, at eleifend orci. Nulla non aliquet dui, et semper libero. Vivamus in efficitur nisl. Etiam in urna dignissim, interdum lectus et, faucibus metus.',
    },
  ])
  // const list = useStore(textFiles)
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
          {files.length ? (
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
              {files.map((file) => (
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
                    setFiles((prev) => [
                      { path: newFilePath, content },
                      ...prev,
                    ])
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
                files={files}
                onSave={(file) => {
                  setFiles((prev) =>
                    prev.map((f) => (f.path === file.path ? file : f)),
                  )
                }}
              />
            }
          />
        </Routes>
      </div>
    </Window>
  )
}

function TextEditorEdit({
  files,
  onSave,
}: {
  files: TextFile[]
  onSave: (file: TextFile) => void
}) {
  const { filePath } = useParams()
  const file = files.find((file) => file.path === filePath)
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
