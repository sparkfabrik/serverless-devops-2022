import { SimpleFactory } from '../../lib/SimpleFactory';
import { ProfileRepository } from '../../lib/ProfileRepository';
import { S3Service } from '../../lib/S3Service';
import { FromEnvironment } from '../../lib/Configuration';
import { Profile } from '../../lib/models/Profile';

const dynamoClient = SimpleFactory.DynamoClient();
const s3Client = SimpleFactory.S3Client();

exports.handler = async (event) => {
  try {
    const s3Service = new S3Service(s3Client);
    const repository = new ProfileRepository(
      dynamoClient,
      FromEnvironment('DYNAMODB_PROFILES_TABLE'),
    );
    const record = event.Records[0];
    const data = await s3Service.GetCsvContent(record.s3.bucket.name, record.s3.object.key);
    for (const item of data) {
      const profile = new Profile(item);
      if (!profile.firstName || !profile.lastName) {
        continue;
      }
      await repository.Create(profile);
    }
    return;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
