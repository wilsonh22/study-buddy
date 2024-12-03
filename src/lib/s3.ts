// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
//   params: { Bucket: process.env.S3_BUCKET },
// });

// export default s3;

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
});

export default s3;
