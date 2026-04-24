import api from "./axios";
import type { Friendship } from "../types/friends";

export async function getFriends(): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>('/friends')
    return data
}

export async function getPendingFriends(): Promise<Friendship[]> {
    const { data } = await api.get<Friendship[]>('/friends/pending')
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

export async function blockFriend(id: number) {
    const { data } = await api.patch(`/friends/${id}/block`)
    return data
}

export async function removeFriend(id: number) {
    const { data } = await api.delete(`/friends/${id}/remove`)
    return data
}