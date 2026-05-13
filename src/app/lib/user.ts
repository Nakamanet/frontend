import { User } from "../types/auth";
import { PaginatedPosts } from "../types/post";
import { PaginatedForums } from "../types/forum";
import api from "./axios";

export async function updateProfil(body: Partial<User>) {
    const { data } = await api.patch('/users/profile', body)
    return data
}

export async function disableAccount(id: number) {
    const { data } = await api.put(`/users/disable/${id}`)
    return data
}

export async function getUserPosts(id: number): Promise<PaginatedPosts> {
    const { data } = await api.get<PaginatedPosts>(`/users/${id}/posts`)
    return data
}

export async function getUserForum(id: number): Promise<PaginatedForums> {
    const { data } = await api.get<PaginatedForums>(`/users/${id}/forum-topics`)
    return data
}