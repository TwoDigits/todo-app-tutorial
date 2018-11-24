exports.handler = async (event) => {
  const tasks = await listTasks();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tasks)
  };
};

async function listTasks() {
  return [
    {
      id: '22d157f8-5812-457e-8fbd-db49aaa25c45',
      title: 'Some Todo',
      description: 'Lorem ipsum dolor est',
      done: false
    },
    {
      id: '22d157f8-5812-457e-8fbd-db49aaa25c46',
      title: 'Another Todo',
      description: 'Lorem ipsum dolor est',
      done: true
    }
  ];
}
