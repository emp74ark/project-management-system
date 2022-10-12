export interface User {
  name?: string
  login: string,
  password: string
}

export interface AuthResponse {
  token: string,
}

export interface Board {
  id?: string,
  title: string,
  description: string
}