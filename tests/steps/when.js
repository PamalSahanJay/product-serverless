"use strict"
const _ = require('lodash');
const { options } = require('superagent');
const Promise = this.Promise || require('promise');
const agent = require('superagent-promise')(require('superagent'), Promise);

const makeHttpRequest = async (path, method, options) => {
    let root = process.env.TEST_ROOT;
    let url = options.id ? `${root}/${path}/${options.id}` : `${root}/${path}`
    let httpReq = agent(method, url)
    let body = _.get(options, "body")
    let token = _.get(options, "idToken")
    console.log(`invoking Http ${method} ${url}`)
    try {
        httpReq.set("Authorization", token)
        if (body) {
            httpReq.send(body)
        }
        let response = await httpReq
        return {
            statusCode: response.status,
            body: response.body
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: error.status,
            body: null
        }
    }

}

const invoke_createProduct = async (options) => {
    const response = makeHttpRequest("product", "POST", options)
    return response;
}

const invoke_updateProduct = async (options) => {
    const response = makeHttpRequest("product", "PUT", options)
    return response;
}

const invoke_deleteProduct = async (options) => {
    const response = makeHttpRequest("product", "DELETE", options)
    return response;
}

module.exports =
{
    invoke_createProduct,
    invoke_updateProduct,
    invoke_deleteProduct
}