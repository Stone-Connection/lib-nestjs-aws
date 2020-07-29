import { Provider } from "@nestjs/common";
import { ConfigurationOptions, APIVersions } from "aws-sdk/lib/config";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

export const AWS_CONFIG_PROVIDER = 'AWS_CONFIG_PROVIDER';

export const awsConfigProvider: Provider<(ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions)> = {
  provide: AWS_CONFIG_PROVIDER,
  useValue: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'sa-east-1'
  } as (ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions)
}