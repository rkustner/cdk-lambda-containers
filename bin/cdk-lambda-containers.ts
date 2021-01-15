#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkLambdaContainersStack } from '../lib/cdk-lambda-containers-stack';

const app = new cdk.App();
new CdkLambdaContainersStack(app, 'CdkLambdaContainersStack');
