'use strict';
require('dotenv').config();
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { returnFunction } = require("./statusCode")
const documentClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(documentClient);
const PRODUCT_TABLE_NAME = process.env.TABLE_NAME;

module.exports.createProduct = async (event) => {
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: PRODUCT_TABLE_NAME,
      Item: {
        productId: { S: data.id },
        modelType: { S: data.modelType },
        doi: { S: data.doi },
      },
      ConditionExpression: "attribute_not_exists(productId)",
    };
    const command = new PutItemCommand(params);
    await documentClient.send(command);
    return returnFunction(201, data)
  } catch (error) {
    return returnFunction(500, error.message)
  }
};

module.exports.updateProduct = async (event) => {
  let productId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  try {
    const params = {
      TableName: PRODUCT_TABLE_NAME,
      Key: { productId: productId },
      UpdateExpression: "set modelType = :modelType, doi = :doi",
      ExpressionAttributeValues: {
        ":modelType": data.modelType,
        ":doi": data.doi,
      },
      ConditionExpression: "attribute_exists(productId)",
    };
    const command = new UpdateCommand(params);
    await docClient.send(command);
    return returnFunction(200, data)
  } catch (error) {
    return returnFunction(500, error.message)
  }
};