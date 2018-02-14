/* eslint-disable */
import fetch from 'node-fetch';
import AWS from 'aws-sdk';
import logger from '../../utils/logger';

export default class ImageFetcher {
  constructor(url) {
    this.url = url;
    this.relativeUrl = this.url.split('https://s3-us-west-2.amazonaws.com/')[1];
    this.bucketName = this.relativeUrl.split('/')[0].toLowerCase();
    this.key = this.relativeUrl.split(`${this.bucketName}/`)[1];
    this.s3 = new AWS.S3({
      region: 'us-west-2',
      params: {
        Bucket: this.bucketName,
        Key: this.key,
      },
    });
    this.signedUrl = this.s3.getSignedUrl('getObject');
  }

  readResponseAsBlob(response) {
    return response.buffer();
  }

  validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  fetchImage() {
    logger.info(`Fetching - ${this.signedUrl}`);
    logger.info('Hardocde Bucket = sentinel-img');
    logger.info(`Got Bucket = ${this.bucketName}`);
    logger.info('Hardcoded key = cloudinary/011040_00_plp_standard.jpg');
    logger.info(`Got Key = ${this.key}`);
    return fetch(this.signedUrl)
      .then(res => this.validateResponse(res))
      .then(res => this.readResponseAsBlob(res));
  }
}
