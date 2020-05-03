'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.submit = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const {
    id,
    size,
    colour,
    product_status,
    customer_initials,
    product_name,
    category,
  } = requestBody;

  if (
    typeof size !== 'number' ||
    typeof colour !== 'string' ||
    typeof product_status !== 'string' ||
    typeof product_name !== 'string' ||
    typeof customer_initials !== 'string' ||
    typeof category !== 'string'
  ) {
    console.error('Validation Failed');
    callback(new Error('Validation error'));
    return;
  }

  submitProduct(
    productInfo({
      id,
      size,
      colour,
      product_status,
      customer_initials,
      product_name,
      category,
    })
  )
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    })
    .catch((err) => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to ${
            id ? 'update' : 'submit'
          } product with name ${product_name}`,
        }),
      });
    });
};

const submitProduct = (product) => {
  console.log('Submitting product');
  const productInfo = {
    TableName: process.env.PRODUCT_TABLE,
    Item: product,
  };
  return dynamoDb
    .put(productInfo)
    .promise()
    .then((res) => product);
};

const productInfo = ({ id, ...product }) => {
  const timestamp = new Date().getTime();
  return {
    id: id ? id : uuid.v4(),
    submittedAt: timestamp,
    updatedAt: timestamp,
    ...product,
  };
};
