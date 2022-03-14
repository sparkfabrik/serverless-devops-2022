import { Profile } from './models/Profile';
import * as uuid from 'uuid';

export class ProfileRepository {
  constructor(client, table) {
    this.client = client;
    this.table = table;
  }

  async Get(queryId) {
    const params = {
      TableName: this.table,
      Key: {
        id: queryId,
      },
    };
    const data = await this.client.get(params).promise();
    if (!data.Item) {
      return null;
    }
    return new Profile(data.Item);
  }

  async List() {
    const params = {
      TableName: this.table,
    };
    const data = await this.client.scan(params).promise();
    return data.Items ? data.Items.map((item) => new Profile(item)) : [];
  }

  async Create(item) {
    item.id = uuid.v4();
    item.createdOn = Date.now();
    const params = {
      TableName: this.table,
      Item: item,
    };
    await this.client.put(params).promise();
    return item;
  }

  async Update(itemId, delta) {
    const params = {
      TableName: this.table,
      Key: { id: itemId },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET ',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };
    Object.getOwnPropertyNames(delta).forEach((property) => {
      params.UpdateExpression += `#${property}=:${property}, `;
      if (params.ExpressionAttributeNames) {
        params.ExpressionAttributeNames[`#${property}`] = property;
      }
      if (params.ExpressionAttributeValues) {
        params.ExpressionAttributeValues[`:${property}`] = delta[property];
      }
    });

    if (params.UpdateExpression) {
      params.UpdateExpression = params.UpdateExpression.replace(/\s*,\s*$/, '');
    }
    const data = await this.client.update(params).promise();
    const profile = new Profile(data.Attributes);
    return profile;
  }

  async Delete(id) {
    const params = {
      TableName: this.table,
      Key: { id: id },
    };
    await this.client.delete(params).promise();
  }
}
