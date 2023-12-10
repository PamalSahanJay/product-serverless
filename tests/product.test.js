const { init } = require("./steps/init")
let { an_auth_user } = require("./steps/given")
const uuid = require('uuid');
let { invoke_createProduct, invoke_updateProduct, invoke_deleteProduct } = require("./steps/when")
let idToken;

describe('given an authenticate user', () => {
    beforeAll(async () => {
        init();
        let user = await an_auth_user();
        idToken = user.AuthenticationResult.IdToken;
        console.log(idToken)
    })

    describe('test post end point', () => {
        it('should create new product ', async () => {
            const body = {
                id: `${uuid.v4()}_test`,
                modelType: "referenceProduct_test",
                doi: "abc123_test"
            }

            let result = await invoke_createProduct({ idToken, body })
            console.log(result)
            expect(result.statusCode).toEqual(201);
            expect(result.body).not.toBeNull();
        });
    })

    describe('test update end point', () => {
        it('should update product ', async () => {
            let id = "a65f9b4e-3f72-45b0-bca4-260215be8d08_test"
            const body = {
                modelType: "referenceProduct_update",
                doi: "abc123_update_test"
            }

            let result = await invoke_updateProduct({ idToken, body, id })
            console.log(result)
            expect(result.statusCode).toEqual(200);
            expect(result.body).not.toBeNull();
        });
    })

    describe('test delete end point', () => {
        it('should update product ', async () => {
            let id = "a65f9b4e-3f72-45b0-bca4-260215be8d08_test"
            let result = await invoke_deleteProduct({ idToken, id })
            console.log(result)
            expect(result.statusCode).toEqual(200);
            expect(result.body).not.toBeNull();
        });
    })
})

