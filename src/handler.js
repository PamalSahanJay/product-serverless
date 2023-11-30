'use strict';
require('dotenv').config();
const { statusCode } = require("./statusCode")
const DynamoDb = require("./dynamoDb");

module.exports.createProduct = async (event) => {
  let data = JSON.parse(event.body);
  try {
    await DynamoDb.post(data)
    return statusCode(201, data);
  } catch (error) {
    return statusCode(500, error.message);
  }

};

module.exports.updateProduct = async (event) => {
  let productId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  try {
    await DynamoDb.put(productId, data)
    return statusCode(200, "product id : " + productId + " is updated.")
  } catch (error) {
    return statusCode(500, error.message)
  }
};

module.exports.deleteProduct = async (event) => {
  let productId = event.pathParameters.id;
  try {
    await DynamoDb.del(productId)
    return statusCode(200, "product id : " + productId + " is deleted.")
  } catch (error) {
    return statusCode(500, error.message);
  }
};

module.exports.getAllProducts = async (event) => {
  try {
    const results = await DynamoDb.getAll();
    console.log(results)
    return statusCode(200, results.Items)
  } catch (error) {
    return statusCode(500, error.message);
  }
};

module.exports.getProduct = async (event) => {
  let productId = event.pathParameters.id;
  try {
    const result = await DynamoDb.get(productId);
    if (result.Item) {
      return statusCode(200, result.Item);
    } else {
      return statusCode(404, "product Id : " + productId + " is not found.");
    }
  } catch (error) {
    return statusCode(500, error.message);
  }
};