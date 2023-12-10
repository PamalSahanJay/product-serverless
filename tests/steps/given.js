'use strict';
require("dotenv").config()
const { CognitoIdentityProviderClient, AdminInitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");
const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });

const userPoolID = process.env.USER_POOL_ID
const clientID = process.env.CLIENT_ID
const userName = process.env.USERNAME_TEST
const password = process.env.PASSWORD_TEST

const an_auth_user = async () => {
    const params = {
        UserPoolId: userPoolID,
        ClientId: clientID,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
            USERNAME: userName,
            PASSWORD: password
        }
    }
    const command = new AdminInitiateAuthCommand(params)
    return cognitoClient.send(command)
}

module.exports = { an_auth_user }