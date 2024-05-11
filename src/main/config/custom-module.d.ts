declare module Express {
  interface Request {
    user?: {
      id: string
      email: string
      name: string
      cpf: string
    }
  }
}
