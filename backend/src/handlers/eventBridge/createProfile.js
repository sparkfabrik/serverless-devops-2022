import { SimpleFactory } from '../../lib/SimpleFactory';
import { FromEnvironment } from '../../lib/Configuration';

const cloudwatchClient = SimpleFactory.CloudWatchClient();

exports.handler = async () => {
  const params = {
    Namespace: 'ProfileApp',
    MetricData: [
      {
        MetricName: 'CreatedProfiles',
        Dimensions: [
          {
            Name: 'Stage',
            Value: FromEnvironment('STAGE'),
          },
        ],
        Timestamp: new Date(),
        Unit: 'Count',
        Value: 1,
      },
    ],
  };
  try {
    await cloudwatchClient.putMetricData(params).promise();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
