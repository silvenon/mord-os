const wallpaperUrl = new URL('../images/wallpaper.jpg', import.meta.url).href

export default function Wallpaper() {
  return (
    <figure className="absolute inset-0">
      <img
        src={wallpaperUrl}
        alt="wallpaper"
        className="h-full w-full object-cover"
      />
      {/* ensure clickability with z-index */}
      <figcaption className="absolute z-10 top-[20%] right-2 -rotate-90 origin-bottom-right text-center text-pink-500 underline decoration-white">
        Photo by{' '}
        <a href="https://unsplash.com/@maxberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Maxim Berg
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </figcaption>
    </figure>
  )
}
