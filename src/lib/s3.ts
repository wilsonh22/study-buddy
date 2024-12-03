// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
// });

// export default s3;
import { S3Client } from '@aws-sdk/client-s3';

// Check required environment variables
if (!process.env.NEXT_PUBLIC_AWS_REGION || !process.env.NEXT_PUBLIC_S3_BUCKET) {
  throw new Error('Missing required AWS configuration');
}

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    // Use standard AWS credentials
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export default s3;
