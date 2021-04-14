# Consume SQS Message Created from SNS Event

Referencing a tutorial here:  
https://medium.com/@FloSloot/your-own-local-copy-of-aws-w-node-js-6d98a10533a8

## Assumes
* Node is installed
* Docker for Mac installed

## Notes
* LocalStack uses the 'us-east-1' region by default
* The endpoint param is important! 
* If it wasn't defined AWS would request the production endpoint

## Setup
1. `npm install`
2. Install localstack and start: `sh ./localstack-install.sh`
   * This will start running a docker instance mimicking a local AWS environment
3. In another terminal, run the aws setup: `sh ./localstack-env-setup.sh`    

## Running
1. Start queue consumer: `node consumer.js`  
   * This will start listening for messages in the queue.

2. Spawn some messages with the producer in another terminal window: 
`node producer.js`  
   * You should now see some messages being consumed and the message
body being displayed in the console of the listening consumer
