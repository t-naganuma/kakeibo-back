import * as cdk from "aws-cdk-lib/core";
import type { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class KakeiboBackStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// The code that defines your stack goes here

		// example resource
		// const queue = new sqs.Queue(this, 'KakeiboBackQueue', {
		//   visibilityTimeout: cdk.Duration.seconds(300)
		// });
	}
}
