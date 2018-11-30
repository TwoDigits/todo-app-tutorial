const aws = require('aws-sdk');

const TasksTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const tasks = await listTasks();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tasks, null, 2)
  };
};

async function listTasks() {
  const params = {
    TableName: TasksTableName
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    const results = await dynamoDB.scan(params).promise();
    return results.Items;
  } catch (error) {
    console.log('Failed to fetch tasks: ' +  error);
    throw error;
  }
}
