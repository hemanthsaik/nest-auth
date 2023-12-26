export interface ProxyResult {
  userId: number
  emailId: string
  role: Role
  rolePermission: RolePermission
}

export interface UserRequest extends Request {
  user: {
    provider: string
    email: string
    name: string
    picture: string
  }
  authToken: string
}

export interface InputItem {
  userId: number
  emailId: string
  password: string
  status: boolean | 1 | 0
  fullName: string
  mobileNumber: string
  isBlock: string
  resetPasswordToken: string
  resetPasswordExpires: string
  roleId: number
  roleName: string
  rolePermissionId: number
  apiMethodId: number
  methodName: string
  apiId: number
  apiName: string
}

export interface Role {
  id: number
  name: string
}

export interface RolePermission {
  [apiName: string]: string[]
}

export interface Result {
  userId: number
  emailId: string
  password: string
  fullName: string
  mobileNumber: string
  isBlock: string
  resetPasswordToken: string
  resetPasswordExpires: string
  status: boolean
  role: Role
  rolePermission: RolePermission
}
