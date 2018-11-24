const aws = require('aws-sdk');
const uuid = require('uuid/v4');

const TasksTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const hostname = event.headers.Host;
  const path = event.requestContext.path;

  let task = JSON.parse(event.body);
  task.id = uuid();
  task.done = false;

  await createTask(task);
  return {
    statusCode: 201,
    headers: {
      'Location': `https://${hostname}${path}${task.id}`
    }
  };
};

async function createTask(task) {
  const params = {
    TableName: TasksTableName,
    Item: task
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    await dynamoDB.put(params).promise();
  } catch (error) {
    console.log('Failed to save task: ' + error);
    throw error;
  }
}
