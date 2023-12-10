// we are passing token as allow or deny to demonstrate the 
// authentication handler
module.exports.handler = async (event) => {
    var token = event.authorizationToken;
    switch (token) {
        case "Allow":
            return generatePolicy("user", "Allow", event.methodArn)
            break;

        case "Deny":
            return generatePolicy("user", "Deny", event.methodArn)
            break;

        default:
            throw new Error;
            break;
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