export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export type AuthState = {
    user: User | null;
    token: string | null;
};