export interface User {
  id?: string,
  name?: string,
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

export interface List {
  id?: string,
  order?: number,
  title: string,
}

export interface Task {
  id?: string,
  order?: number,
  title: string,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string,
}

export interface Dictionary {[index: string]: string}