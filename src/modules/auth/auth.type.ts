export type UserLogs = {
  id: number
  name: string
  emailId: string
  lastSignedIn: Date
  expires_at: Date
  createdAt: Date
  token: string
}

export type service = {
  id: number
  serviceName: string
  callbackUrl: string
  createdAt: Date
}
