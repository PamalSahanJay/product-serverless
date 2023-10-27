const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, UpdateCommand, DeleteCommand, ScanCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { returnFunction } = require("./statusCode");
const documentClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(documentClient);
const PRODUCT_TABLE_NAME = process.env.TABLE_NAME;

const post = async (data) => {
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
        return await documentClient.send(command);
    } catch (error) {
        throw error
    }
}

const put = async (productId, data) => {
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
        return await docClient.send(command);
    } catch (error) {
        throw error;
    }
}

const get = async (productId) => {
    try {
        const params = {
            TableName: PRODUCT_TABLE_NAME,
            Key: {
                productId: productId
            }
        };
        const command = new GetCommand(params);
        return await docClient.send(command);
    } catch (error) {
        throw error;
    }

}

const getAll = async () => {
    try {
        const params = {
            TableName: PRODUCT_TABLE_NAME
        };
        const command = new ScanCommand(params);
        return await docClient.send(command);
    } catch (error) {
        throw error
    }
}

const del = async (productId) => {
    try {
        const params = {
            TableName: PRODUCT_TABLE_NAME,
            Key: { productId: productId },
            ConditionExpression: "attribute_exists(productId)",
        };
        const command = new DeleteCommand(params);
        return await docClient.send(command);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    post,
    put,
    get,
    getAll,
    del
}