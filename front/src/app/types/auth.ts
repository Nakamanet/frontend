export interface User {
    id: number;
    username: string;
    email: string;
    birthdate: string;
    role: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}