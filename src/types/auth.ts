export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: "admin" | "dealer" | "user";
  status: "active" | "suspended" | "pending";
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
}
