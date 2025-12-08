export type ConvexUserRaw = {
    _creationTime: number
    id: string
    email: string
    emailVerificationTime: number
    image?: string
    name?: string
}

export type Profile = {
    id: string
    createdAtMs: number
    email: string
    emailVerifiedAtMs?: number
    image?: string
    name?: string
}

export const normalizeProfile = (
    raw: ConvexUserRaw | null
): Profile | null => {
    if (!raw) return null
    //Need to write more necessary functionalities (eg. username, name etc.)
}