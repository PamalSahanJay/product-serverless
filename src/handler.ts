'use strict';
require('dotenv').config();
const { statusCode } = require('./statusCode');
import DynamoDb = require('./dynamoDb');
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"

//module.exports.createProduct = async (event) => {
export const createProduct = async (event : APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  let data = JSON.parse(event.body as string);
  try {
    await DynamoDb.post(data)
    return statusCode(201, data);
  } catch (error) {
    return statusCode(500, error.message);
  }

};

// module.exports.updateProduct = async (event) => {
export const updateProduct = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  let productId = event.pathParameters?.id;
  let data = JSON.parse(event.body as string);
  try {
    await DynamoDb.put(productId as string, data)
    return statusCode(200, "product id : " + productId + " is updated.")
  } catch (error) {
    return statusCode(500, error.message)
  }
};

// module.exports.deleteProduct = async (event) => {
export const deleteProduct = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  let productId = event.pathParameters?.id;
  try {
    await DynamoDb.del(productId as string)
    return statusCode(200, "product id : " + productId + " is deleted.")
  } catch (error) {
    return statusCode(500, error.message);
  }
};

// module.exports.getAllProducts = async (event) => {
export const getAllProducts = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  try {
    const results = await DynamoDb.getAll();
    console.log(results)
    return statusCode(200, results.Items)
  } catch (error) {
    return statusCode(500, error.message);
  }
};

// module.exports.getProduct = async (event) => {
export const getProduct = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  let productId = event.pathParameters?.id;
  try {
    const result = await DynamoDb.get(productId as string);
    if (result.Item) {
      return statusCode(200, result.Item);
    } else {
      return statusCode(404, "product Id : " + productId + " is not found.");
    }
  } catch (error) {
    return statusCode(500, error.message);
  }
};