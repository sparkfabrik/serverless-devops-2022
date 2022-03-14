export class ProfileRepository {
  constructor(client, table) {
    this.client = client;
    this.table = table;
  }
}
