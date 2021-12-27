import { Routes, Route, Link, useParams } from 'react-router-dom'
import Window from './Window'
import useFetch from '../hooks/useFetch'

interface Album {
  userId: number
  id: number
  title: string
}

interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export default function Camera() {
  const { data: albums } = useFetch<Album[]>(
    'https://jsonplaceholder.typicode.com/albums',
  )
  const { data: photos } = useFetch<Photo[]>(
    'https://jsonplaceholder.typicode.com/photos',
  )

  return (
    <Window title="Photos" rootPathname="/photos">
      <div className="h-full overflow-y-auto p-2 ">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid gap-2 grid-cols-4">
                {albums?.map((album) => (
                  <Link
                    key={album.id}
                    to={`/photos/albums/${album.id}`}
                    className="aspect-square bg-cover rounded-md opacity-90 grayscale-[25%] transition hover:opacity-100 hover:grayscale-[0%] hover:ring-2 hover:ring-offset-2 hover:ring-pink-500"
                    style={{
                      backgroundImage: `url(${
                        photos?.find((photo) => {
                          return photo.albumId === album.id
                        })?.thumbnailUrl
                      })`,
                    }}
                    aria-label={album.title}
                  />
                ))}
              </div>
            }
          />
          <Route path="albums/:albumId" element={<Album />} />
          <Route path=":photoId" element={<Photo />} />
        </Routes>
      </div>
    </Window>
  )
}

function Album() {
  const { albumId } = useParams()
  const { data: photos } = useFetch<Photo[]>(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
  )

  if (!albumId) {
    return (
      <div className="h-full grid place-content-center">Album not found</div>
    )
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {photos?.map((photo) => (
        <Link
          key={photo.id}
          to={`/photos/${photo.id}`}
          className="aspect-square bg-cover rounded-md opacity-90 grayscale-[25%] transition hover:opacity-100 hover:grayscale-[0%] hover:ring-2 hover:ring-offset-2 hover:ring-pink-500"
          style={{ backgroundImage: `url(${photo.thumbnailUrl})` }}
          aria-label={photo.title}
        />
      ))}
    </div>
  )
}

function Photo() {
  const { photoId } = useParams()
  const { data: photo } = useFetch<Photo>(
    `https://jsonplaceholder.typicode.com/photos/${photoId}`,
  )

  if (!photoId) {
    return (
      <div className="h-full grid place-content-center">Photo not found</div>
    )
  }

  return photo ? (
    <img
      src={photo.url}
      alt={photo.title}
      className="w-full bg-cover"
      style={{ backgroundImage: `url(${photo.thumbnailUrl})` }}
      aria-label={photo.title}
    />
  ) : null
}
