import api from "./axios";
import type { NotificationList } from "../types/notifications";

export async function getNotifications(): Promise<NotificationList> {
    const { data } = await api.get<NotificationList>('/notifications')
    return data
}

export async function getUnreadCount(): Promise<number> {
    const { data } = await api.get <{ count: number }>('/notifications/unread-count')
    return data.count
}

export async function markAsRead(id: number) {
    const { data } = await api.patch(`/notifications/${id}/read`)
    return data
}

export async function markAllAsRead() {
    const { data } = await api.patch('/notifications/read-all')
    return data
}