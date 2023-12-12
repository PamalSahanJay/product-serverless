import { APIGatewayProxyResult } from "aws-lambda";

const statusCode = (statusCode: number, data : string): APIGatewayProxyResult => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
};

export = {
    statusCode
}