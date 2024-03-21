class UserEntity  {
	id: number;
	lastname : string;
	firstname : string;
	profilePicture : string;

	email: number;
	password : string;
	role : string;

	isActive : boolean;
	acceptedCGU: boolean;
	acceptedGDPR :boolean;
	created_at : Date;
	updated_at : Date;

	isAdmin : boolean;
	isUser : boolean;
	isSuperAdmin : boolean;
	isModerator : boolean;


	constructor(user: any) {
		this.id = user.id
		this.lastname = user.lastname
		this.firstname = user.firstname
		this.profilePicture = user.profilePicture
		this.email = user.email
		this.password = user.password
		this.role = user.role
		this.isActive = user.isActive
		this.acceptedCGU = user.acceptedCGU
		this.acceptedGDPR = user.acceptedGDPR
		this.created_at = user.created_at
		this.updated_at = user.updated_at

		this.isSuperAdmin = this.role === "S" ? true : false
		this.isAdmin = this.role === "A" || this.isSuperAdmin ? true : false
		this.isModerator = this.role === "M" || this.isAdmin ? true : false
		this.isUser = this.role === "U" || this.isModerator ? true : false
	  }
}

export default UserEntity;