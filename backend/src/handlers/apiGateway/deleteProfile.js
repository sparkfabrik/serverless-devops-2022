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
    await repository.Delete(profileId);
    const response = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: '',
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
