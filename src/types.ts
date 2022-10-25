import { SnapshotOptions } from 'firebase/firestore'

export type User = {
  id: string
  firstname: string
  lastname: string
  fullName: string
  avatar: string | null
  email: string | null
  emailVerified: boolean
}

export type CommunityMember = {
  id: string
  firstname: string
  lastname: string
  avatar: string
  role: string
  subject: string
  memberSince: number
}

export type Action = {
  title: string
  value: string
  type: ActionType
}

export enum ActionType {
  Default = 'default',
  Primary = 'primary',
  Destructive = 'destructive'
}

export interface Document extends SnapshotOptions {
  documentId: string
}

export enum NotificationScope {
  Default = 'default',
  Community = 'community'
}

export enum NotificationType {
  Default = 'default',
  CommunityInvite = 'community-invite'
}

export type Notification = {
  scope: NotificationScope
  type: NotificationType
  image: {
    src: string
    size: number
  }
  title?: string
  text: string
  createdAt: number
  actions?: {
    title: string
    value: string
    type: ActionType
  }[]
}

export interface CommunityInvite extends Notification {
  communityId: string
}
