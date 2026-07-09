import api from "./axios";
import type { Friendship } from "../types/friends";

export async function getFriends(id: number): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>(`/users/${id}/friends`)
    return data
}

export async function getPendingFriends(): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>('/friends/pending')
    return data
}

export async function getBlockFriends(): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>('/friends/blocked')
    return data
}

export async function sendFriendRequest(addressee_id: number): Promise<Friendship> {
    const { data } = await api.post<Friendship>('/friends/send', { addressee_id })
    return data
}

export async function acceptFriend(id: number) {
    const { data } = await api.patch(`/friends/${id}/accept`)
    return data
}

export async function declineFriend(id: number) {
    const { data } = await api.delete(`/friends/${id}/decline`)
    return data
}

export async function blockFriend(user_id: number) {
    const { data } = await api.post(`/friends/block`, { user_id })
    return data
}

export async function unblockFriend(id: number) {
    const { data } = await api.delete(`/friends/${id}/unblock`)
    return data
}

export async function removeFriend(id: number) {
    const { data } = await api.delete(`/friends/${id}/remove`)
    return data
}

export async function getSentFriends(): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>('/friends/sent')
    return data
}