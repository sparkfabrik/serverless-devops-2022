import { SimpleFactory } from '../../lib/SimpleFactory';
import { S3Service } from '../../lib/S3Service';
import { FromEnvironment } from '../../lib/Configuration';
import { getCORSHeaders } from '../../lib/Utilities';

const s3Client = SimpleFactory.S3Client();

exports.handler = async (event, context, callback) => {
  const s3Service = new S3Service(s3Client);
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.key) {
      throw new Error('Invalid request');
    }
    const url = await s3Service.GetSignedUrl(
      FromEnvironment('ASSETS_BUCKET'),
      event.queryStringParameters.key,
      180,
    );
    const response = {
      statusCode: 200,
      headers: getCORSHeaders(),
      body: JSON.stringify(url),
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
