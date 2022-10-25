import { getStorage, ref, listAll, deleteObject } from 'firebase/storage'

export async function deleteFile(path: string) {
  const reference = ref(getStorage(), path)
  await deleteObject(reference)
}

export async function deleteFiles(path: string) {
  const reference = ref(getStorage(), path)
  const filesList = await listAll(reference)
  for (const folderRef of filesList.prefixes) {
    await deleteFile(folderRef.toString())
  }
  for (const itemRef of filesList.items) {
    await deleteFile(itemRef.toString())
  }
}
