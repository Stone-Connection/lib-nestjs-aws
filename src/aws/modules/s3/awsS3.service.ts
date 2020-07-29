import { Inject, Injectable } from "@nestjs/common";
import { AWS_S3_PROVIDER } from "./awsS3.providers";
import { S3, AWSError } from "aws-sdk";

@Injectable()
export class AwsS3Service {
  constructor(@Inject(AWS_S3_PROVIDER) private s3: S3) {}

  async upload(params: S3.PutObjectRequest): Promise<S3.ManagedUpload.SendData> {
    
    const uploadParams: S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ...params
    };
    
    try {
      return await this.s3.upload(uploadParams).promise();
    } catch (error) {
      throw error;
    }
  }

  async uploadMany(paramsArray: S3.PutObjectRequest[]): Promise<Array<S3.ManagedUpload.SendData>> {
    const resultArray: Array<S3.ManagedUpload.SendData> = [];
    
    const errors: Array<AWSError & {index: number}> = [];
    
    for (let i = 0; i < paramsArray.length; i++) {
      const params = paramsArray[i];
      
      try {
        const uploadResult = await this.upload(params);
        resultArray.push(uploadResult);
      } catch (error) {
        errors.push({...error, index: i});
      }
    }

    if (errors.length) {
      let errMessage = "";
      errors.forEach((error) => {
        errMessage += `\nError uploading item ${error.index}: \n ${error.code} ${error.message}\n`;
      });
      throw new Error(errMessage);
    }

    return resultArray;
  }
}