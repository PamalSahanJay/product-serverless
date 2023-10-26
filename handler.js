'use strict';
require('dotenv').config();
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const {returnFunction} = require("./statusCode")
const documentClient = new DynamoDBClient({ region: "us-east-1" });
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
    const result = await documentClient.send(command);
    console.log(result);
    return returnFunction(201, data)
  } catch (error) {
    return returnFunction(500, error.message)
  }
};
