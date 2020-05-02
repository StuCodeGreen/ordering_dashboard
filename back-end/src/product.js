'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event) => {
  const requestBody = JSON.parse(event.body);
  const {
    size,
    colour,
    product_status,
    customer_initials,
    product_name,
    category,
  } = requestBody;
};
