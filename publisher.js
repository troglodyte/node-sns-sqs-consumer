const AWS_ENDPOINT = 'http://localhost:4566';
const AWS = require('aws-sdk');
const { promisify } = require('util');
AWS.config.update({ region: 'us-east-1' });
/* WARNING: the endpoint param is important! See README.md */
const sns = new AWS.SNS({ endpoint: AWS_ENDPOINT });
sns.publish = promisify(sns.publish);
const TopicArn = "arn:aws:sns:us-east-1:000000000000:local-topic";

async function publish(msg) {
  const publishParams = {
    TopicArn,
    Message: msg
  };

  let topicRes;

  try {
    topicRes = await sns.publish(publishParams);
  } catch (e) {
    topicRes = e;
  }

  console.log('TOPIC Response: ', topicRes);
}

/* Spawn a few messages to consume */
for (let i = 0; i < 100; i++) {
  publish('New user created: ' + i);
}
