import { Module } from "@nestjs/common";
import { awsConfigProvider } from "./awsConfig.providers";

@Module({
  providers: [
    awsConfigProvider
  ],
  exports: [
    awsConfigProvider
  ]
})
export class AwsConfigModule {}