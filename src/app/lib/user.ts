import { User } from "../types/auth";
import api from "./axios";

export async function updateProfil(body: Partial<User>) {
    const { data } = await api.patch('/users/profile', body)
    return data
}

export async function disableAccount(id: number) {
    const { data } = await api.put(`/users/disable/${id}`)
    return data
}