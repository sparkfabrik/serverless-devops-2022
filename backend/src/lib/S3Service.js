import * as parse from 'csv-parse';

export class S3Service {
  constructor(s3Client) {
    this.s3Client = s3Client;
  }

  GetSignedUrl(bucket, key, expireTime) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: key,
        Expires: expireTime,
      };
      this.s3Client.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(url);
      });
    });
  }

  async GetCsvContent(bucket, key) {
    return new Promise((resolve, reject) => {
      const options = {
        delimiter: ',',
        columns: [
          'firstName',
          'lastName',
          'email',
          'bio',
        ],
        from: 2,
      };
      const parser = parse(options, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
      const params = { Bucket: bucket, Key: key };
      this.s3Client.getObject(params).createReadStream().pipe(parser);
    });
  }
}
