import { SimpleFactory } from '../../lib/SimpleFactory';
import { ProfileRepository } from '../../lib/ProfileRepository';
import { FromEnvironment } from '../../lib/Configuration';
import { getCORSHeaders } from '../../lib/Utilities';
import { Profile } from '../../lib/models/Profile';
import { EventBridgeService } from '../../lib/EventBridgeService';

const dynamoCLient = SimpleFactory.DynamoClient();
const eventBridgeClient = SimpleFactory.EventBridgeClient();

exports.handler = async (event, context, callback) => {
  try {
    const repository = new ProfileRepository(
      dynamoCLient,
      FromEnvironment('DYNAMODB_PROFILES_TABLE'),
    );
    const eventBridgeService = new EventBridgeService(eventBridgeClient);
    const profile = new Profile(JSON.parse(event.body));
    const newProfile = await repository.Create(profile);
    await eventBridgeService.SendEvent('profile', 'created');
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
