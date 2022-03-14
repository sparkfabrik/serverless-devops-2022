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
    const profiles = await repository.List();
    const response = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify({
        data: profiles,
      }),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
