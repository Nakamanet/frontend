import axios from 'axios'

const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LIB_API_URL || 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export interface Channel {
  _id: string
  room: string
  label: string
  group: string
  icon: string
  created_by: string
  created_at: string
}

export async function getChannels(): Promise<Channel[]> {
  const { data } = await chatApi.get<Channel[]>('/channels')
  return data
}

export async function createChannel(body: { room: string; label: string; group: string; icon?: string }): Promise<Channel> {
  const token = localStorage.getItem('token')
  const { data } = await chatApi.post<Channel>('/channels', body, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function updateChannel(id: string, body: Partial<Pick<Channel, 'label' | 'group' | 'icon'>>): Promise<Channel> {
  const token = localStorage.getItem('token')
  const { data } = await chatApi.patch<Channel>(`/channels/${id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export async function deleteChannel(id: string): Promise<void> {
  const token = localStorage.getItem('token')
  await chatApi.delete(`/channels/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
