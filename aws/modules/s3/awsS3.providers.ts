import { Provider } from "@nestjs/common";
import { S3 } from 'aws-sdk';
import { AWS_CONFIG_PROVIDER } from "../config/awsConfig.providers";

export const AWS_S3_PROVIDER = 'AWS_S3_PROVIDER';

export const s3Provider: Provider<S3> = {
  provide: AWS_S3_PROVIDER,
  useFactory: (awsConfig): S3 => (new S3({
    ...awsConfig,
    apiVersion: '2006-03-01',
    maxRetries: process.env.AWS_S3_MAX_RETRIES || 3,
  })),
  inject: [
    AWS_CONFIG_PROVIDER
  ]
}