export interface FriendUser {
    id: number,
    username: string,
    avatar_url: string | null
}

export interface Friendship {
    id: number,
    requester_id: number,
    addressee_id: number,
    status: "pending" | "accepted" | "blocked",
    requester: FriendUser,
    addressee: FriendUser,
    created_at: string,
    updated_at: string,
}
