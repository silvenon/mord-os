import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Wallpaper from './components/Wallpaper'
import Login from './components/Login'
import TextEditor from './components/TextEditor'
import Photos from './components/Photos'
import Reader from './components/Reader'
import NotFound from './components/NotFound'
import Dock from './components/Dock'

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(
    Boolean(sessionStorage.getItem('authenticated')),
  )
  return (
    <>
      <Wallpaper />
      <div className="h-full relative grid grid-rows-[1fr_auto]">
        {authenticated ? (
          <>
            <Routes>
              <Route path="/" element={<div />} />
              <Route path="text-editor/*" element={<TextEditor />} />
              <Route path="photos/*" element={<Photos />} />
              <Route path="reader/*" element={<Reader />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Dock />
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  onSubmit={({ rememberMe }) => {
                    setAuthenticated(true)
                    if (rememberMe) {
                      sessionStorage.setItem('authenticated', 'true')
                    }
                  }}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
    </>
  )
}
