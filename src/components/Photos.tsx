import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import Window from './Window'

interface Album {
  userId: number
  id: number
  title: string
  cover?: string
  thumbnailUrl?: string
}

interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export default function Camera() {
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((res) => res.json())
      .then((fetchedAlbums: Album[]) => {
        setAlbums(fetchedAlbums)
        fetchedAlbums.forEach((album) => {
          fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`,
          )
            .then((res) => res.json())
            .then((fetchedPhotos: Photo[]) =>
              setAlbums((prev) =>
                prev.map((a) =>
                  a.id === album.id
                    ? { ...a, thumbnailUrl: fetchedPhotos[0].thumbnailUrl }
                    : a,
                ),
              ),
            )
        })
      })
  }, [])

  return (
    <Window title="Photos">
      <div className="h-full overflow-y-auto p-2 ">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid gap-2 grid-cols-4">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    to={`/photos/album/${album.id}`}
                    className="aspect-square bg-cover rounded-md opacity-90 grayscale-[25%] transition hover:opacity-100 hover:grayscale-[0%] hover:ring-2 hover:ring-offset-2 hover:ring-pink-500"
                    style={{ backgroundImage: `url(${album.thumbnailUrl})` }}
                    aria-label={album.title}
                  />
                ))}
              </div>
            }
          />
          <Route path="album/:albumId" element={<Album />} />
          <Route path="photo/:photoId" element={<Photo />} />
        </Routes>
      </div>
    </Window>
  )
}

function Album() {
  const { albumId } = useParams()
  const [photos, setPhotos] = useState<Photo[]>([])

  if (!albumId) {
    return (
      <div className="h-full grid place-content-center">Album not found</div>
    )
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((res) => res.json())
      .then((fetchedPhotos: Photo[]) => setPhotos(fetchedPhotos))
  }, [albumId])

  return (
    <div className="grid grid-cols-6 gap-2">
      {photos.map((photo) => (
        <Link
          key={photo.id}
          to={`/photos/photo/${photo.id}`}
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
  const [photo, setPhoto] = useState<Photo>()

  if (!photoId) {
    return (
      <div className="h-full grid place-content-center">Photo not found</div>
    )
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((res) => res.json())
      .then((fetchedPhoto: Photo) => setPhoto(fetchedPhoto))
  }, [photoId])

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
