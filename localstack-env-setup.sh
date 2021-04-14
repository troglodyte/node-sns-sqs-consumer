# Set the localstac endpoint
endpoint="http://localhost:4566"
# create alias to ensure we're using the localstack instance
# and not our actual AWS instance
alias laws="aws --endpoint=${endpoint}"

# For s3 Creation reference
# create the bucket
#laws s3 mb s3://local-aws-bucket;
# list all buckets
#laws s3 ls

# creating the queue 'local-queue'
laws sqs create-queue --queue-name local-queue --endpoint-url ${endpoint} --region us-east-1
laws sqs list-queues

# creating the topic 'local-topic'
laws sns create-topic --name local-topic --endpoint-url ${endpoint} --region us-east-1
laws sns list-topics

# create subscription between the topic and queue
laws sns subscribe --notification-endpoint ${endpoint}/queue/local-queue \
  --topic-arn arn:aws:sns:us-east-1:000000000000:local-topic \
  --protocol sqs \
  --endpoint-url=${endpoint} \
  --region us-east-1
