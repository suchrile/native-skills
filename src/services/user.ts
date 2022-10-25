import {
  getDocument,
  getDocumentsWithQuery,
  updateDocument
} from '@/services/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import store from '@/store'

export function getUser() {
  return getAuth().currentUser
}

export async function getUserByEmail(email: string) {
  const user = await getDocumentsWithQuery({
    collectionPath: 'users',
    key: 'email',
    filterOption: '==',
    value: email
  })
  return user[0]
}

export async function getUserById(id: string) {
  return await getDocument({
    collectionPath: 'users',
    documentId: id
  })
}

export async function updateProfileData(fields = {}) {
  const user = getUser()
  if (!user) throw new Error('User does not exists')
  await updateProfile(user, fields)
}

export async function setName({ firstname = '', lastname = '' }) {
  const user = getUser()
  if (!user) throw new Error('User does not exists')
  const fullName = `${firstname} ${lastname}`
  await updateDocument({
    collectionPath: 'users',
    documentId: user.uid,
    fields: { firstname, lastname }
  })
  await updateProfileData({ displayName: fullName })
  store.commit('setUserData', { firstname, lastname })
}
