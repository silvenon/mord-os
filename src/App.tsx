import { Routes, Route } from 'react-router-dom'
import Wallpaper from './components/Wallpaper'
import Welcome from './components/Welcome'
import TextEditor from './components/TextEditor'
import NotFound from './components/NotFound'
import Dock from './components/Dock'

export default function App() {
  return (
    <>
      <Wallpaper />
      <div className="h-full relative grid grid-rows-[1fr_auto]">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="text-editor/*" element={<TextEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Dock />
      </div>
    </>
  )
}
