const statusCode = (statusCode, data) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(data),
    };
};

module.exports = {
    statusCode
}