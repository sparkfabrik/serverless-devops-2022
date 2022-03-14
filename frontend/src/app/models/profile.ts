export class Profile {
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  createdOn: number;
  bio?: string;

  constructor(
    id: string,
    status: string,
    firstName: string,
    lastName: string,
    email: string,
    createdOn: number,
    bio?: string,
  ) {
    this.id = id;
    this.status = status;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdOn = createdOn;
    this.bio = bio;
  }
}
