import { getDocumentsWithQuery, updateDocument } from '@/services/firestore'
import { arrayUnion, arrayRemove } from 'firebase/firestore'
import { getUser } from '@/services/user'
import store from '@/store'
import { getDate } from '@/services/date'
import { CommunityMember, NotificationType } from '@/types'

export async function getCommunity() {
  let community = store.getters.community
  if (!community.init) {
    const user = getUser()
    if (!user) throw new Error('User does not exists')
    const response = await getDocumentsWithQuery({
      collectionPath: 'communities',
      key: 'memberIDs',
      filterOption: 'array-contains',
      value: user.uid
    })
    community = response[0]
    store.commit('setCommunity', community)
  }
  return community
}

export async function getInvites() {
  const user = getUser()
  if (!user) throw new Error('User does not exists')
  return await getDocumentsWithQuery({
    collectionPath: 'users/' + user.uid + '/notifications',
    key: 'type',
    filterOption: '==',
    value: NotificationType.CommunityInvite
  })
}

export async function addMember(communityID = '') {
  const user = store.getters.user
  await updateDocument({
    collectionPath: 'communities',
    documentId: communityID,
    fields: {
      memberIDs: arrayUnion(user.id),
      membersData: arrayUnion({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email,
        role: 'member',
        subject: 'tutorsSubjectMath',
        memberSince: getDate().toMillis()
      })
    }
  })
}

export async function deleteMember(uid = '') {
  const communityId = store.getters.community.documentId
  const user = store.getters.community.membersData.find(
    (user: CommunityMember) => user.id === uid
  )
  await updateDocument({
    collectionPath: 'communities',
    documentId: communityId,
    fields: {
      memberIDs: arrayRemove(uid),
      membersData: arrayRemove(user)
    }
  })
}
