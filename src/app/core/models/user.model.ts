//Base
export class User {
	name: string;
	avatarUrl: string;

	constructor(name: string, avatarUrl: string) {
		this.name = name;
		this.avatarUrl = avatarUrl;
	}
}

//Child
export class UserCurrent extends User {
	roles: string[];

	constructor(name: string, avatarUrl: string, roles: string[]) {
		super(name, avatarUrl);
		this.roles = roles;
	}
}
