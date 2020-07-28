import { Module } from "@nestjs/common";
import { AwsConfigModule } from "../config/awsConfig.module";
import { s3Provider } from "./awsS3.providers";
import { AwsS3Service } from "./awsS3.service";

@Module({
  imports: [
    AwsConfigModule
  ],
  providers: [
    s3Provider,
    AwsS3Service
  ],
  exports: [
    AwsS3Service
  ]
})
export class AwsS3Module {}