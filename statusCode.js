const returnFunction = (statusCode, data) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
};

module.exports = {
    returnFunction
}