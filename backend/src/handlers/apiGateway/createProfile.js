import { SimpleFactory } from '../../lib/SimpleFactory';
import { ProfileRepository } from '../../lib/ProfileRepository';
import { FromEnvironment } from '../../lib/Configuration';
import { getCORSHeaders } from '../../lib/Utilities';
import { Profile } from '../../lib/models/Profile';

const dynamoCLient = SimpleFactory.DynamoClient();

exports.handler = async (event, context, callback) => {
  try {
    const repository = new ProfileRepository(
      dynamoCLient,
      FromEnvironment('DYNAMODB_PROFILES_TABLE'),
    );
    const profile = new Profile(JSON.parse(event.body));
    const newProfile = await repository.Create(profile);
    const response = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(newProfile),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
