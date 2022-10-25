import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  FieldPath,
  WhereFilterOp
} from 'firebase/firestore'
import { Document } from '@/types'

type DocsWithQueryArgs = {
  collectionPath: string
  key: string | FieldPath
  filterOption: WhereFilterOp
  value: string
}

export async function addDocument({ collectionPath = '', fields = {} }) {
  const reference = collection(getFirestore(), collectionPath)
  await addDoc(reference, fields)
}

export async function setDocument({
  collectionPath = '',
  documentId = '',
  fields = {}
}) {
  const reference = doc(getFirestore(), collectionPath, documentId)
  await setDoc(reference, fields)
}

export async function updateDocument({
  collectionPath = '',
  documentId = '',
  fields = {}
}) {
  const reference = doc(getFirestore(), collectionPath, documentId)
  await updateDoc(reference, fields)
}

export async function getDocument({ collectionPath = '', documentId = '' }) {
  const reference = doc(getFirestore(), collectionPath, documentId)
  const document = await getDoc(reference)
  return { ...document.data(), documentId: document.id }
}

export async function getDocuments({ collectionPath = '' }) {
  const reference = collection(getFirestore(), collectionPath)
  const snapshot = await getDocs(reference)
  const documents: Document[] = []
  snapshot.docs.forEach((doc) => {
    documents.push({ ...doc.data(), documentId: doc.id })
  })
  return documents
}

export async function getDocumentsWithQuery({
  collectionPath,
  key,
  filterOption,
  value
}: DocsWithQueryArgs) {
  const reference = query(
    collection(getFirestore(), collectionPath),
    where(key, filterOption, value)
  )
  const result: Document[] = []
  const snapshot = await getDocs(reference)
  snapshot.forEach((doc) => {
    result.push({ ...doc.data(), documentId: doc.id })
  })
  return result
}

export async function deleteDocument({ collectionPath = '', documentId = '' }) {
  const reference = doc(getFirestore(), collectionPath, documentId)
  await deleteDoc(reference)
}
