const AWS_ENDPOINT = 'http://localhost:4566';

const AWS = require('aws-sdk');
const { promisify } = require('util');
AWS.config.update({ region: 'us-east-1' });
/* WARNING: the endpoint param is important! See README.md */
const sqs = new AWS.SQS({ endpoint: AWS_ENDPOINT });
sqs.receiveMessage = promisify(sqs.receiveMessage);
const QueueUrl = `${AWS_ENDPOINT}/queue/local-queue`; // leave this one blank for now!
const receiveParams = {
  QueueUrl,
  MaxNumberOfMessages: 1
};
let count = 0;
async function receive() {
  try {
    const queueData = await sqs.receiveMessage(receiveParams);
    if (
      queueData &&
      queueData.Messages &&
      queueData.Messages.length > 0
    ) {
      count++;
      const [firstMessage] = queueData.Messages;
      let body = JSON.parse(firstMessage.Body)
      console.log(`${count}. ${body.Message}`);
      const deleteParams = {
        QueueUrl,
        ReceiptHandle: firstMessage.ReceiptHandle
      };
      sqs.deleteMessage(deleteParams, function(err, data) {
        err && console.log(err, err.stack)
      });
    }
  } catch (e) {
    console.log('ERROR: ', e);
  }
}

// Listen continuously
setInterval(receive, 500);

// Grab single message
// receive()
