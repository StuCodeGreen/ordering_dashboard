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
    customer_initial,
    product_name,
    category,
    product_image,
  } = requestBody;

  if (
    typeof size !== 'string' ||
    typeof colour !== 'string' ||
    typeof product_status !== 'string' ||
    typeof product_name !== 'string' ||
    typeof customer_initial !== 'string' ||
    typeof product_image !== 'string' ||
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
      customer_initial,
      product_name,
      category,
      product_image,
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

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.PRODUCT_TABLE,
    ProjectionExpression:
      'id, size, colour, product_status, customer_initial, product_name, category, product_image',
  };
  console.log('Scanning Product table.');
  const onScan = (err, data) => {
    if (err) {
      console.log(
        'Scan failed to load data. Error JSON:',
        JSON.stringify(err, null, 2)
      );
      callback(err);
    } else {
      console.log('Scan succeeded.');
      return callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          products: data.Items,
        }),
      });
    }
  };
  dynamoDb.scan(params, onScan);
};

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.PRODUCT_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  dynamoDb
    .get(params)
    .promise()
    .then((result) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch((error) => {
      console.error(error);
      callback(new Error("Couldn't fetch product."));
      return;
    });
};
