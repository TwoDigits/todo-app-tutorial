const aws = require('aws-sdk');

const TasksTableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const id = event.pathParameters.id;

  const task = await deleteTask(id);
  return {
    statusCode: 200
  }
};

async function deleteTask(id) {
  const params = {
    TableName: TasksTableName,
    Key: {
      id: id
    }
  };

  const dynamoDB = new aws.DynamoDB.DocumentClient();
  try {
    await dynamoDB.delete(params).promise();
  } catch (error) {
    console.log('Failed to delete task with id "' + id + '": '+ error);
    throw error;
  }
}
