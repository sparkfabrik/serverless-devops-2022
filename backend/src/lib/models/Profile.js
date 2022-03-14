export class Profile {
  constructor(source) {
    if (source) {
      this.id = source.id;
      this.firstName = source.firstName;
      this.lastName = source.lastName;
      this.email = source.email;
      this.bio = source.bio;
      this.createdOn = source.createdOn;
    }
  }
}
