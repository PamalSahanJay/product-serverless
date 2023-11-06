const { CognitoJwtVerifier } = require("aws-jwt-verify")

const createObject = {
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: process.env.TOKEN_USE,
    clientId: process.env.CLIENT_ID
}

const cognitoVerifier = CognitoJwtVerifier.create(createObject)

module.exports.handler = async (event) => {
    var token = event.authorizationToken;
    try {
        const payload = await cognitoVerifier.verify(token)
        console.log(JSON.stringify(payload))
        return generatePolicy("user", "Allow", event.methodArn)
    } catch (error) {
        throw error
    }
};

const generatePolicy = (principalId, effect, resource) => {
    var authResponse = {}
    authResponse.principalId = principalId;
    if (effect && resource) {
        let policyDocument = {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: effect,
                    Resource: resource,
                    Action: "execute-api:Invoke"
                }
            ]
        }
        authResponse.policyDocument = policyDocument
    }
    authResponse.context = {
        foo: "bar"
    }
    console.log(JSON.stringify(authResponse))
    return authResponse;
}