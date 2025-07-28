import { supabase } from "./Supabase"
import { decode } from 'base64-arraybuffer';
import * as Crypto from 'expo-crypto';

export default async function AddToBucket(uri, fileName) {

  console.log(fileName)

  const mimeType = getMimeType(fileName);

  await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    fileName)
  
  // let hashedFileName = await hashString(fileName) + '.' + mimeType.slice(6);

  let hashedFileName = '';
  try {
    const hash = await hashString(fileName);
    hashedFileName = hash + mimeType.slice(6);
  } catch (error) {
    console.log(error);
  }

  // const base64file = getImageArrayBuffer(uri)

  const base64 = uri.split('base64,')[1];

  const { data, error } = await supabase
    .storage
    .from('golfer-post-images')
    .upload(hashedFileName, decode(base64), 
    { contentType: mimeType,
      upsert: true
    },
  )

  if ( error ) {
    console.log( error );
  }

  return (hashedFileName)
}


function getMimeType(uri) {
  if (uri.endsWith('.jpg') || uri.endsWith('.jpeg')) return 'image/jpeg';
  if (uri.endsWith('.png')) return 'image/png';
  if (uri.endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream'; // fallback
}


async function hashString(input) {
  return (
    await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    input)
  )
}