const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const urlService = require("../../service/url")
const db = require("../../db/url.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);


describe("test_isValidRegisterUserBody",()=>{
  
    it("test_isValidRegisterUserBody_success",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(true)
    })
    it("test_isValidRegisterUserBody_Invalid_pass",async()=>{
        let body = {"password": "1234","email":"sp@gmail.com","age":24,"city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_email",async()=>{
        let body = {"password": "12345678","email":"sp","age":24,"city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_age",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":"24","city": "Sangli", "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_name",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": "Sangli", "name":1}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid-city",async()=>{
        let body = {"password": "12345678","email":"sp@gmail.com","age":24,"city": 1, "name":"SP"}
        let res = await validate.isValidRegisterUserBody(body)
        expect(res.isValid).to.be.equals(false)
    })
})

describe("test_validateURL",()=>{
  
    it("test_isValidRegisterUserBody_success",async()=>{
        let body = {"frequency":24, "url_name":"https://editor.swagger.io/"}
        let res = await validate.validateURLReq(body)
        expect(res.isValid).to.be.equals(true)
    })
    it("test_isValidRegisterUserBody_invalid_url_name",async()=>{
        let body = {"frequency":24, "url_name":"h"}
        let res = await validate.validateURLReq(body)
        expect(res.isValid).to.be.equals(false)
    })
    it("test_isValidRegisterUserBody_invalid_frequency",async()=>{
        let body = {"frequency":"24", "url_name":"https://editor.swagger.io/"}
        let res = await validate.validateURLReq(body)
        expect(res.isValid).to.be.equals(false)
    })
})