# Todo App

## Prerequsites
You need an AWS account for deploying the application contained in this repository. The instructions are based on using [AWS Cloud9](https://aws.amazon.com/cloud9/) as the IDE. Of course, you can use any other IDE you like. In this case you need to install and configure the AWS CLI appropriately.

## Deployment
Log in to your AWS account and switch to the [Cloud9 console](https://eu-west-1.console.aws.amazon.com/cloud9/home?region=eu-west-1). Open your instance of the IDE by clicking the button "Open IDE".

Once the IDE has been launched successfully, go to the terminal and clone this repository:

```
git clone https://github.com/jenseickmeyer/todo-app.git
```

You need to make a change to the deployment file. The variable `STAGE_NAME` needs to be set to your username.

Next, change to the directory `todo-app` in the terminal and deploy the application:

```
cd todo-app
bash deploy.sh
```

The script prints out the URL of the API Gateway you can use for testing the application.

Now the application should be deployed to the AWS account. You should see a corresponding stack in the [CloudFormation console](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks). It should be called `todo-app-<USER>`.

## Testing
Once the application has been deployed successfully, you can test it:

```
curl -i https://qcw6e3wy5h.execute-api.eu-west-1.amazonaws.com/dev
```

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

Alternatively, you can use tools like [Postman](https://www.getpostman.com) for testing the REST API.