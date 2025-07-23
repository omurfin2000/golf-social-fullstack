import { useEffect, useState } from 'react'
import { getImageUrl } from './getImageUrl'  // Your existing utility

export function getImage(path, isPublic = true) {
  const [url, setUrl] = useState(null)

  console.log('got here at least')

  useEffect(() => {
    console.log('useEffect triggered for path:', path)

    const fetchUrl = async () => {
        console.log('Calling getImageUrl...')
        const result = await getImageUrl(path, isPublic)
        console.log('Fetched URL:', result)
        setUrl(result)
    }

    if (path) {
      fetchUrl()
    }
  }, [path, isPublic])



  return url
}

