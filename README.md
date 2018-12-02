# Todo App Tutorial
This project contains a simple application which provides a REST API for an imaginary Todo app. It uses serverless services provided by Amazon Web Services (AWS). The services are configured by using the [Serverless Application Model (SAM)](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md).

The application is not fully implemented. Instead, for some functions only the partial implementation is available and it's an excercise to fill in the necessary code to get it working.

## Prerequsites
You need an AWS account for deploying the application contained in this repository. The instructions are based on using [AWS Cloud9](https://aws.amazon.com/cloud9/) as the IDE. Of course, you can use any other IDE you like. In this case you need to install and configure the AWS CLI appropriately.

## Deployment
Log in to your AWS account and switch to the [Cloud9 console](https://eu-west-1.console.aws.amazon.com/cloud9/home?region=eu-west-1). Open your instance of the IDE by clicking the button "Open IDE".

Once the IDE has been launched successfully, go to the terminal and clone this repository:

```
git clone https://github.com/TwoDigits/todo-app.git
```

Next, change to the directory `todo-app` in the terminal and deploy the application:

```
cd todo-app
bash deploy.sh <STAGE_NAME>
```

Replace `<STAGE_NAME>` with some unique value, e.g. your username.

The script prints out the URL of the API Gateway you can use for testing the application.

Now the application should be deployed to the AWS account. You should see a corresponding stack in the [CloudFormation console](https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks). It should be called `todo-app-<STAGE_NAME>`.

## Testing
Once the application has been deployed successfully, you can test it by sending requests to the API endpoints.

### curl
To use curl simply type in this command with the correct API endpoint URL:

```
curl -i https://qcw6e3wy5h.execute-api.eu-central-1.amazonaws.com/dev/tasks
```

To create a new task just use the following command:

```
curl -H "Content-Type: application/json" -d '{ "title": "Task 1", "description": "Lorem ipsum dolor est" }' https://qcw6e3wy5h.execute-api.eu-central-1.amazonaws.com/dev/tasks
```

Use the actual URL of your API Gateway instance.

This should print out something like this:

```
HTTP/2 200
content-type: application/json
content-length: 2
date: Tue, 27 Nov 2018 21:10:49 GMT
x-amzn-requestid: e965d8f6-f288-11e8-a0d2-6900192cbae9
x-amz-apigw-id: RCjhwFtWDoEFgrg=
x-amzn-trace-id: Root=1-5bfdb2d8-44c60ccac8b9cc5ea3eb24a8;Sampled=0
x-cache: Miss from cloudfront
via: 1.1 1e4c92160d51d8949ec2279f03ad3acb.cloudfront.net (CloudFront)
x-amz-cf-id: gBgdABFJ2UHRIFFNrR7SKUsnl5ATsPNoQ0P2jv6vWq_nkQpsyEJclA==

[]
```

### Postman
Alternatively, you can use tools like [Postman](https://www.getpostman.com) for testing the REST API. You can easily import the [environment configuration](todo-app-enironment.json). You need to update the environment with the API endpoint URL of your application stack.

After that, you can import the [collection](todo-app-postman-collection.json) and test the various API calls.

## Find the building blocks
The actual configuration of the different AWS services is done in [sam-template.yaml](sam-template.yaml). In the `Resource` section you find the declaration of the various services needed for the application: API Gateway, Lambda functions and DynamoDB table. To learn more about the syntax of this configuration file by reading the [SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md).

The code for handling the different API requests can be found in the [src](src) directory. For each function the code is placed in a corresponding subdirectory, e.g. [src/list-tasks](src/list-tasks). The `index.js` file contains the actual implementation of the Lambda function.

All requests are handled by the API Gateway. After deploying the application you can have a look in the [API Gateway Console](https://eu-central-1.console.aws.amazon.com/apigateway/home?region=eu-central-1#/apis) to find your actual API provisioned during the deployment. The API is called `todo-app-api-<STAGE_NAME>`.

In the [Lambda Console](https://eu-central-1.console.aws.amazon.com/lambda/home?region=eu-central-1#/functions) you'll find all the Lambda functions belonging to your application. Their names all begin with `todo-app-<STAGE_NAME>-`.

Finally, in the [DynamoDB Console](https://eu-central-1.console.aws.amazon.com/dynamodb/home?region=eu-central-1#) you'll find the table belonging to your application. It is called `todo-app-<STAGE_NAME>-tasks`.

## Exercises

### Get Task
Fill in the missing pieces for the endpoint implementation `get-task`. The endpoint should return HTTP status code `200` and the task as a JSON object if a record with the matching ID can be found in DynamoDB. In case no record can be found the HTTP status code `404` should be returned instead.

### Delete Task
Fill in the missing pieces for the endpoint implementation `delete-task`. The endpoint should return HTTP status code `200` if the record has been deleted successfully.

### Update Task
Create a new endpoint to update an existing task. The endpoint should have the path `/{id}` and the HTTP method `PUT`. It should respond with HTTP status `200` upon success and `404` if the task with the corresponding `id` can not be found. You need to:

- Create the Lambda function `update-task`
  - Get the path parameter from the event
  - Get the body from the the event
  - Save the task to the DynamoDB table
- Configure it in `sam-template.yaml`
- Deploy the application

## References
- [AWS Serverless Application Model (SAM) specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/)
