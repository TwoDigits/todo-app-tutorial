#!/bin/bash

if [ -z "$1" ]
then
  echo "Parameter is missing. Please provide the name of the stage like"
  echo "  bash deploy.sh dev"
  exit
fi

REGION=eu-central-1
S3_BUCKET=io.twodigits.sam.deploy.$REGION
INPUT_FILE=sam-template.yaml
OUTPUT_FILE=sam-template-output.yaml
STAGE_NAME=$1
STACK_NAME=todo-app-$STAGE_NAME

basePath=$(pwd)

cd $basePath/src
for d in *; do
    if [[ -d $d ]]; then
        cd "$d"
        echo "Building $d..."
        npm install --silent
        cd ..
    fi
done
cd $basePath

aws cloudformation package --template-file $INPUT_FILE --output-template-file $OUTPUT_FILE --s3-bucket $S3_BUCKET --region $REGION
aws cloudformation deploy --template-file $OUTPUT_FILE --stack-name $STACK_NAME --parameter-overrides StageName=$STAGE_NAME --capabilities CAPABILITY_IAM --region $REGION

API_GATEWAY_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[0].OutputValue')

length=${#API_GATEWAY_URL}
API_GATEWAY_URL=${API_GATEWAY_URL:1:$length-2}

echo
echo "API Gateway URL: $API_GATEWAY_URL"
echo "Get all the tasks:"
echo "  curl -i $API_GATEWAY_URL/tasks"
echo
echo "Create a new task"
echo "  curl -H \"Content-Type: application/json\" -d '{ \"title\": \"Task 1\", \"description\": \"Lorem ipsum dolor est\" }' $API_GATEWAY_URL/tasks"
