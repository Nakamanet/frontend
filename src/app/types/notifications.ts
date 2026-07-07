export interface NotificationSender {
    id: number,
    username: string,
    avatar_url: string | null
}

export interface Notification {
    id: number,
    recipient_id: number,
    sender_id: number,
    type: 'friend_request' | 'new_chapter' | 'mention' | 'message' | 'comment'
    is_read: boolean,
    payload: Record<string, unknown>
    sender: NotificationSender,
    created_at: string,
    updated_at: string
}

export interface NotificationList {
    current_page: number,
    data: Notification[],
    per_page: number,
    total: number
}