import api from './axios';
import type { Forum, ForumReply, PaginatedForums } from '../types/forum';

export async function getForums(page = 1, category?: Forum['category']): Promise<PaginatedForums> {
    const { data } = await api.get<PaginatedForums>('/forum/topics', {
        params: { page, ...(category && { category }) },
    });
    return data;
}

export async function getForumById(id: number): Promise<Forum> {
    const { data } = await api.get<Forum>(`/forum/topics/${id}`);
    return data;
}

export async function createForum(forum: Pick<Forum, 'title' | 'content' | 'category' | 'related_anime_id' | 'related_manga_id'>): Promise<Forum> {
    const { data } = await api.post<Forum>('/forum/topics', forum);
    return data;
}

export async function deleteForum(id: number): Promise<void> {
    await api.delete(`/forum/topics/${id}`);
}

export async function replyToForum(id: number, content: string, parent_id?: number): Promise<ForumReply> {
    const { data } = await api.post<ForumReply>(`/forum/topics/${id}/reply`, {
        content,
        ...(parent_id !== undefined && { parent_id }),
    });
    return data;
}
