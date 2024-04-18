class UserEntity {
  id: number
  lastname: string
  firstname: string
  profilePicture: string

  email: number
  role: string
  relationNumber: number

  isActive: boolean
  acceptedCGU: boolean
  acceptedGDPR: boolean
  created_at: Date
  updated_at: Date

  isAdmin: boolean
  isUser: boolean
  isSuperAdmin: boolean
  isModerator: boolean

  constructor(user: any) {
    this.id = user.id
    this.lastname = user.lastname
    this.firstname = user.firstname
    this.profilePicture = user.profilePicture
    this.email = user.email
    this.role = user.role
    this.isActive = user.isActive
    this.acceptedCGU = user.acceptedCGU
    this.acceptedGDPR = user.acceptedGDPR
    this.created_at = user.created_at
    this.updated_at = user.updated_at

    this.relationNumber = user.subscribed_to_count //TODO change this to the correct field

    this.isSuperAdmin = this.role === 'S'
    this.isAdmin = this.role === 'A' || this.isSuperAdmin
    this.isModerator = this.role === 'M' || this.isAdmin
    this.isUser = this.role === 'U' || this.isModerator
  }
}

export default UserEntity
