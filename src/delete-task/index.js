const aws = require('aws-sdk');

const TasksTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  // TODO: Get the ID of the task and perform the deletion. Return HTTP status 200 if successful
};

async function deleteTask(id) {
  // TODO: Implement deleting the record in DynamoDB. API documentation for DynamoDB can be found at https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
}
