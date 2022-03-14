import * as AWS from 'aws-sdk';

export class SimpleFactory {
  static DynamoClient() {
    return new AWS.DynamoDB.DocumentClient();
  }

  static S3Client() {
    return new AWS.S3();
  }

  static EventBridgeClient() {
    return new AWS.EventBridge();
  }

  static CloudWatchClient() {
    return new AWS.CloudWatch();
  }
}
