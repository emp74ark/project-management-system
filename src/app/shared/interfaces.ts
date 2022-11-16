export interface User {
  id?: string,
  name?: string,
  login: string,
  password: string
}

export interface HttpHeaders {
  url: string,
  headers: {
      normalizedNames: Record<string, string>,
      headers: Record<string, string>
  },
  urlWithParams: string,
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

export interface Dictionary { [index: string]: string }

export interface Modal {
  show: boolean,
  type: 'info' | 'alert' | 'prompt' | null,
  message: string | null,
  callback?: (id: string) => void,
  parameter?: string
};