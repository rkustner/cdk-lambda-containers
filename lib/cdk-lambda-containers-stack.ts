import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";
import * as Lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import {Duration} from '@aws-cdk/core';

export class CDKLambdaDocker extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Configure path to Dockerfile
    const dockerfile = path.join(__dirname, "../src");

    const translateAccessPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['translate:*'],
      resources: ['*']
    })

    // Create AWS Lambda function and push image to ECR
    const backend = new Lambda.DockerImageFunction(this, "function", {
      code: Lambda.DockerImageCode.fromImageAsset(dockerfile),
    });
    backend.addToRolePolicy(translateAccessPolicy)

    // create apigateway
    new apigateway.LambdaRestApi(this, 'myapi', {
      handler: backend,
    });

  }
}
