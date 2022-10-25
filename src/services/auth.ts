import store from '@/store'
import { setDocument, deleteDocument } from '@/services/firestore'
import { createMonogram } from '@/services/avatar'
import { deleteFiles } from '@/services/storage'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser
} from 'firebase/auth'

export async function signup({
  firstname = '',
  lastname = '',
  email = '',
  password = ''
}) {
  await createUserWithEmailAndPassword(getAuth(), email, password)
  const user = getAuth().currentUser
  if (user == null) throw new Error('Current user is null')
  const avatar = await createMonogram({ firstname, lastname })
  await setDocument({
    collectionPath: 'users',
    documentId: user.uid,
    fields: { firstname, lastname, email, avatar }
  })
  await updateProfile(user, {
    displayName: firstname + ' ' + lastname,
    photoURL: avatar
  })
  await store.dispatch('updateUserData', {
    firstname,
    lastname,
    email,
    avatar
  })
}

export async function logIn({ email = '', password = '' }) {
  await signInWithEmailAndPassword(getAuth(), email, password)
}

export async function logOut() {
  await signOut(getAuth())
  store.commit('clearUserData')
}

export async function reauthorize(password = '') {
  const user = getAuth().currentUser
  if (user == null) throw new Error('Current user is null')
  if (!user.email) throw new Error('No email')
  const credential = EmailAuthProvider.credential(user.email, password)
  await reauthenticateWithCredential(user, credential)
}

export async function changePassword(password = '') {
  const user = getAuth().currentUser
  if (!user) throw new Error('Current user is null')
  await updatePassword(user, password)
}

export async function resetPassword() {
  const auth = getAuth()
  if (!auth.currentUser || !auth.currentUser.email)
    throw new Error('Something goes wrong')
  await sendPasswordResetEmail(auth, auth.currentUser.email)
}

export async function verifyEmail() {
  const user = getAuth().currentUser
  if (!user) throw new Error('Current user is null')
  await sendEmailVerification(user)
}

export async function changeEmail(email = '') {
  const user = getAuth().currentUser
  if (!user) throw new Error('Current user is null')
  await updateEmail(user, email)
  store.commit('setUserData')
}

export async function deleteAccount() {
  const user = getAuth().currentUser
  if (!user) throw new Error('Current user is null')
  await deleteDocument({
    collectionPath: 'users',
    documentId: user.uid
  })
  await deleteFiles('users/' + user.uid)
  await deleteUser(user)
  store.commit('clearUserData')
}
