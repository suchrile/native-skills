import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  uploadString,
  getDownloadURL
} from 'firebase/storage'

export async function uploadFile({ path, file, format }) {
  try {
    const reference = ref(getStorage(), path)
    await uploadString(reference, file, format)
    return await getDownloadURL(reference)
  } catch (e) {
    throw e
  }
}

export async function deleteFile(path) {
  const reference = ref(getStorage(), path)
  try {
    await deleteObject(reference)
  } catch (e) {
    throw e
  }
}

export async function deleteFiles(path) {
  try {
    const reference = ref(getStorage(), path)
    const filesList = await listAll(reference)
    for (const folderRef of filesList.prefixes) {
      await deleteFile(folderRef)
    }
    for (const itemRef of filesList.items) {
      await deleteFile(itemRef)
    }
  } catch (e) {
    throw e
  }
}
