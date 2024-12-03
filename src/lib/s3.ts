// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   region: process.env.NEXT_PUBLIC_AWS_REGION,
//   params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
// });

// export default s3;

import { S3Client } from '@aws-sdk/client-s3';
import { awsCredentialsProvider } from '@vercel/functions/oidc';

const s3 = new S3Client({
  // region: process.env.NEXT_PUBLIC_AWS_REGION!,
  region: 'us-west-1',
  credentials: awsCredentialsProvider({
    roleArn: process.env.NEXT_PUBLIC_AWS_ROLE_ARN!,
  }),
});

export default s3;
