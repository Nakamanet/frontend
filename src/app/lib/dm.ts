import { chatApi } from './channels'

export function getDmRoom(userIdA: number | string, userIdB: number | string): string {
  return 'dm:' + [String(userIdA), String(userIdB)].sort().join(':')
}

export function getOtherUserId(room: string, myId: number | string): string {
  const parts = room.replace(/^dm:/, '').split(':')
  return parts.find((id) => id !== String(myId)) ?? parts[0]
}

export interface DmConversation {
  _id: string // room id, e.g. "dm:12:45"
  lastMessage: {
    _id: string
    room: string
    user_id: string
    username: string
    avatar_url: string | null
    content: string
    created_at: string
  }
}

export async function getMyDms(): Promise<DmConversation[]> {
  const { data } = await chatApi.get('/dms')
  return data
}
