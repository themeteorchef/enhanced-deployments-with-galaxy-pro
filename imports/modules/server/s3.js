/* eslint-disable */

import { Meteor } from 'meteor/meteor';
import AWS from 'aws-sdk';
import moment from 'moment';

const { aws } = Meteor.settings.private;

AWS.config = new AWS.Config();

AWS.config.accessKeyId = aws.akid;
AWS.config.secretAccessKey = aws.sak;

const s3 = new AWS.S3();

export default {
  putObject(file) {
    return new Promise((resolve, reject) => {
      if (file) {
        s3.putObject({
          Bucket: 'i-heart-meteor',
          Key: file.name,
          Body: new Buffer(file.data.split(',')[1], 'base64'),
          ACL: 'private',
          ContentEncoding: 'base64',
          ContentType: file.type,
        }, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(`https://s3.amazonaws.com/i-heart-meteor/${file.name}`);
          }
        });
      } else {
        resolve();
      }
    });
  },
  deleteObject(Key) {
    return new Promise((resolve, reject) => {
      s3.deleteObject({
        Bucket: 'i-heart-meteor',
        Key,
      }, Meteor.bindEnvironment((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }));
    });
  },
}
