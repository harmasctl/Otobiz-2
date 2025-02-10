export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "dealer" | "admin";
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}
