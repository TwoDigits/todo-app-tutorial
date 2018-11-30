const aws = require('aws-sdk');

const TasksTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  const task = await getTask(id);
  // TODO: Return the task as a JSON object with status code 200. If no task for id can be found status code 404 should be returned.
};

async function getTask(id) {
  const params = {
    TableName: TasksTableName,
    Key: {
      id: id
    }
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    const result = await dynamoDB.get(params).promise();
    return result.Item;
  } catch (error) {
    console.log('Failed to get task with id "' + id + '": '+ error);
    throw error;
  }
}
