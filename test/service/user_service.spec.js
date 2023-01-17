const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const userService = require("../../service/user")
const db = require("../../db/user.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
chai.use(chaiAsPromised);

describe("test_user_service_signup",()=>{
    let isValidRegisterUserBodyStub,createStub;
    beforeEach(()=>{
        isValidRegisterUserBodyStub = sinon.stub(validate,"isValidRegisterUserBody");
        createStub = sinon.stub(db,"create");
    })
    it("test_user_service_register_user_success",async()=>{
        isValidRegisterUserBodyStub.returns({isValid:true});
        createStub.returns({code: 200,msg:"User created"})
        let body = {"name": "SP"}
        let res = await userService.signUp(body)
        expect(res.code).to.be.equals(200)
    })
    it("test_user_service_register_user_fail_for_invalid_req_body",async()=>{
        isValidRegisterUserBodyStub.returns({isValid:false, payload:response.InvalidReqBody});
        let body = {}
        userService.signUp(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_user_service_register_user_fail_for_unexpected_error",async()=>{
        createStub.throws("error")
        let body = {}
        userService.signUp(body).catch(function(err){;
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        isValidRegisterUserBodyStub.restore();
        createStub.restore();
    })
})

describe("test_user_service_login",()=>{
    let signStub,findByEmailAndPasswordStub;
    beforeEach(()=>{
        signStub = sinon.stub(jwt,"sign");
        findByEmailAndPasswordStub = sinon.stub(db,"findByEmailAndPassword");
    })
    it("test_user_service_login_user_success",async()=>{
        signStub.returns("jkjkjkjk");
        findByEmailAndPasswordStub.returns({"name": "SP"})
        let res = await userService.getDetails("email.com", "pass")
   
        expect(res.token).to.be.equals("jkjkjkjk")
    })
    it("test_user_service_login_user_fail_invalid_req_params",async()=>{
        signStub.returns("jkjkjkjk");
        findByEmailAndPasswordStub.returns({"name": "SP"})
        await userService.getDetails("email.com").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
   
        
    })
    it("test_user_service_login_user_invalid_user_or_email",async()=>{
        signStub.returns("jkjkjkjk");
        findByEmailAndPasswordStub.returns(null)
        await userService.getDetails("email.com","pass").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
    })
    it("test_user_service_login_user_fail_throws_error",async()=>{
        signStub.returns("jkjkjkjk");
        findByEmailAndPasswordStub.throws("error")
        await userService.getDetails("email.com","pass").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
   
        
    })
    afterEach(()=>{
        findByEmailAndPasswordStub.restore();
        signStub.restore();
    })
})