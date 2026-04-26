export interface LikePayload {
    post_id: number | null
    comment_id: number | null
}

export interface LikeResponse {
    message: string
    liked: boolean
}