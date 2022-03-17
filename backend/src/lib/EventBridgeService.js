import { FromEnvironment } from './Configuration';

export class EventBridgeService {
  constructor(eventBridgeClient) {
    this.eventBridgeClient = eventBridgeClient;
  }

  async SendEvent(entity, detail) {
    const params = {
      Entries: [
        {
          EventBusName: FromEnvironment('EVENT_BUS_NAME'),
          Source: `${entity}.${detail}`,
          DetailType: detail,
          Detail: JSON.stringify({}),
        },
      ],
    };
    await this.eventBridgeClient.putEvents(params).promise();
  }
}
