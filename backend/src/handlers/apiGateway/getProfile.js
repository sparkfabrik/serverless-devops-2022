import { SimpleFactory } from '../../lib/SimpleFactory';
import { ProfileRepository } from '../../lib/ProfileRepository';
import { FromEnvironment } from '../../lib/Configuration';
import { getCORSHeaders } from '../../lib/Utilities';

const dynamoCLient = SimpleFactory.DynamoClient();

exports.handler = async (event, context, callback) => {
  try {
    const repository = new ProfileRepository(
      dynamoCLient,
      FromEnvironment('DYNAMODB_PROFILES_TABLE'),
    );
    const profileId = event.pathParameters.id;
    const profile = await repository.Get(profileId);
    const response = {
      statusCode: !profile ? 404 : 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(profile),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
