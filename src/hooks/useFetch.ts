import { useState, useEffect } from 'react'

// https://developers.google.com/web/updates/2017/09/abortable-fetch

export default function useFetch<Data>(url: string) {
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed' | 'aborted'
  >('idle')
  const [error, setError] = useState<null | Error>(null)
  const [data, setData] = useState<null | Data>(null)

  useEffect(() => {
    setAbortController(new AbortController())
    setStatus('loading')
    setError(null)
    setData(null)

    return () => {
      abortController?.abort()
    }
  }, [url])

  useEffect(() => {
    if (status === 'loading') {
      ;(async () => {
        try {
          const response = await fetch(url, { signal: abortController?.signal })
          if (!response.ok) throw new Error(response.statusText)
          const data = await response.json()
          setStatus('succeeded')
          setData(data)
        } catch (err) {
          if (err instanceof DOMException && err.name === 'AbortError') {
            setStatus('aborted')
          } else if (err instanceof Error) {
            setStatus('failed')
            setError(err)
          } else {
            // unexpected error type
            throw err
          }
        }
      })()
    }
  }, [status, url])

  return {
    status,
    error,
    data,
  }
}
