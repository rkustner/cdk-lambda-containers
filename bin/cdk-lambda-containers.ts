#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CDKLambdaDocker } from '../lib/cdk-lambda-containers-stack';

const app = new cdk.App();
new CDKLambdaDocker(app, 'CDKLambdaDocker');
