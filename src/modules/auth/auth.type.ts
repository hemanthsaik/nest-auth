export type UserLogs = {
  id: number
  name: string
  emailId: string
  lastSignedIn: Date
  expiresAt: Date
  createdAt: Date
  serviceId: number
  token: string
  service: Service
}

export type Service = {
  id: number
  serviceName: string
  callbackUrl: string
  createdAt: Date
}
