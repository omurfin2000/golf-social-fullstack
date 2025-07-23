import { supabase } from './Supabase'


export async function getImageUrl(path, isPublic = true) {

  if (isPublic) {
    const { data, error } = supabase.storage.from('golfer-post-images'/* bucket name */ ).getPublicUrl(path)
    if (error) {
      console.error('Error getting public URL:', error)
      return null
    }
    return data.publicUrl
  } else {
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .createSignedUrl(path, 60)  // URL expires in 60 seconds
    if (error) {
      console.error('Error getting signed URL:', error)
      return null
    }
    return data.signedUrl
  }
}

