const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const urlService = require("../../service/url")
const db = require("../../db/user.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
const userModel = require("../../models/user.model")
const bcrypt = require("bcrypt")
chai.use(chaiAsPromised);


describe("test_user_db",()=>{
    let createStub, hashStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(userModel.prototype,"save");
        hashStub = sinon.stub(bcrypt, "hash")
    })
    it("test_user_service_register_user_success",async()=>{
       
        createStub.returns({code: 200,msg:"User created"})
        hashStub.returns(true)
        let body = {"name": "SP"}
        let res = await db.create(body)
        expect(res.code).to.be.equals(200)
    })
    it("test_user_service_user_exist",async()=>{
       
        createStub.throws({code: 11000})
        hashStub.returns(true)
        let body = {"name": "SP"}
         await db.create(body).catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_user_service_unexpected_error",async()=>{
       
        createStub.throws({})
        hashStub.returns(true)
        let body = {"name": "SP"}
         await db.create(body).catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
        hashStub.restore();
        createStub.restore();
    })
})


describe("test_user_db",()=>{
    let createStub, hashStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(userModel,"findOne");
        hashStub = sinon.stub(bcrypt, "compare")
    })
    it("test_user_login_success",async()=>{
       
        createStub.returns({code:200,password:"1234578"})
        hashStub.returns(true)
        let res = await db.findByEmailAndPassword("sp@gmail.com","1234578")
        expect(res.code).to.be.equals(200)
    })
    it("test_user_login_invalid_user",async()=>{
       
        createStub.returns(false)
        hashStub.returns(true)
        await db.findByEmailAndPassword("sp@gmail.com","1234578").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
       
    })
    it("test_user_login_invalid_user_and_email",async()=>{
       
        createStub.returns({code:200,password:"1234578"})
        hashStub.returns(false)
        await db.findByEmailAndPassword("sp@gmail.com","1234578").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
       
    })
    it("test_user_login_throws_error",async()=>{
       
        createStub.throws("error")
        hashStub.returns(false)
        await db.findByEmailAndPassword("sp@gmail.com","1234578").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
       
    })
    afterEach(()=>{
        hashStub.restore();
        createStub.restore();
    })
})