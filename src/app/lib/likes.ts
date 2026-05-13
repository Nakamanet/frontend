import api from "./axios";
import { LikeResponse } from "../types/likes";

export async function toggleLikePost(post_id: number): Promise<LikeResponse> {
    const { data } = await api.post<LikeResponse>(`/likes/toggle`, { post_id, comment_id: null})
    return data
}

export async function toggleLikeComment(comment_id: number): Promise<LikeResponse> {
    const { data } = await api.post<LikeResponse>(`/likes/toggle`, { post_id: null, comment_id})
    return data
}