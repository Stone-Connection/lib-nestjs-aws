import { Module, Global } from '@nestjs/common';
import { AwsConfigModule } from './modules/config/awsConfig.module';
import { AwsS3Module } from './modules/s3/awsS3.module';

@Module({
  imports: [
    AwsConfigModule,
    AwsS3Module
  ],
  providers: [],
  exports: []
})
@Global()
export class AwsModule {}