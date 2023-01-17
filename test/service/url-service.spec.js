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

describe("test_url_service_add",()=>{
    let validateURLReqStub,addStub;
    beforeEach(()=>{
        validateURLReqStub = sinon.stub(validate,"validateURLReq");
        addStub = sinon.stub(db,"addUrl");
    })
    it("test_user_service_add_url_success",async()=>{
        validateURLReqStub.returns({isValid:true});
        addStub.returns({code: 200,msg:"url added"})
        let body = {"url_name": "sp.com","frequency":1}
        let res = await urlService.addUrl(body)
        expect(res.code).to.be.equals(200)
    })
    it("test_user_service_add_url_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        urlService.addUrl(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_user_service_add_url_fail_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}
        validateURLReqStub.returns({isValid:false});
        urlService.addUrl(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_user_service_add_url_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        validateURLReqStub.returns({isValid:true});
        let body = {"url_name": "sp.com","frequency":1}
        urlService.addUrl(body).catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        validateURLReqStub.restore();
        addStub.restore();
    })
})
describe("test_url_service_update",()=>{
    let validateURLReqStub,addStub;
    beforeEach(()=>{
        validateURLReqStub = sinon.stub(validate,"validateURLReq");
        addStub = sinon.stub(db,"updateUrl");
    })
    it("test_url_service_update_url_success",async()=>{
        validateURLReqStub.returns({isValid:true});
        addStub.returns({code: 200,msg:"url added"})
        let body = {"url_name": "sp.com","frequency":1}
        let res = await urlService.updateUrl(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(200)
    })
    it("test_url_service_update_url_not_found",async()=>{
        validateURLReqStub.returns({isValid:true});
        addStub.returns(false)
        let body = {"url_name": "sp.com","frequency":1}
        let res = await urlService.updateUrl(body, "63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(404)
    })
    it("test_url_service_update_url_fail_for_invalid_req_body",async()=>{
        let body = {"frequency":1}
        urlService.updateUrl(body).catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_url_service_update_url_fail_for_invalid_req_params",async()=>{
        let body = {"url_name": "sp.com","frequency":1}
        validateURLReqStub.returns({isValid:false});
        urlService.updateUrl(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){
            expect(err.code).to.be.equals(400)
        })
    })
    it("test_user_service_add_url_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        validateURLReqStub.returns({isValid:true});
        let body = {"url_name": "sp.com","frequency":1}
        urlService.updateUrl(body,"63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        validateURLReqStub.restore();
        addStub.restore();
    })
})
describe("test_url_service_list",()=>{
    let addStub;
    beforeEach(()=>{

        addStub = sinon.stub(db,"listUrl");
    })
    it("test_user_service_list_url_success",async()=>{
       
        addStub.returns("url added")
     
        let res = await urlService.listUrl()
        console.log(res);
        expect(res).to.be.equals("url added")
    })
    it("test_user_service_list_url_not_found",async()=>{
        addStub.returns(false)
        let res = await urlService.listUrl()
        expect(res.code).to.be.equals(404)
    })
    it("test_user_service_add_url_fail_for_unexpected_error",async()=>{
        addStub.throws("error")

        urlService.listUrl().catch(function(err){
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})
describe("test_url_service_removeUrl",()=>{
    let addStub;
    beforeEach(()=>{
        addStub = sinon.stub(db,"removeUrl");
    })
    it("test_url_service_removeUrl_success",async()=>{
        addStub.returns({deletedCount:1})
        let res = await urlService.removeUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(200)
    })
    it("test_url_service_update_url_not_found",async()=>{
        addStub.returns({deletedCount:0})
        let res = await urlService.removeUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(404)
    })
    it("test_url_service_update_Invalid_id",async()=>{
        let res = await urlService.removeUrl("63c4e189ca3c78a13c4671d9", "4")
        expect(res.code).to.be.equals(400)
    })
    it("test_user_service_add_url_fail_for_unexpected_error",async()=>{
        addStub.throws("error")
        urlService.removeUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})
describe("test_url_service_trackURL",()=>{
    let addStub;
    beforeEach(()=>{
        addStub = sinon.stub(db,"trackUrl");
    })
    it("test_url_service_trackURL_success",async()=>{
        addStub.returns({
            "url_name": "https://mongoosejs.com/docs/",
            "url_status": [
                {
                    "status": "Active",
                    "time": 1673847540983
                },
                {
                    "status": "Active",
                    "time": 1673847600426
                }
            ]
        })
        let res = await urlService.trackUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.url_name).to.be.equals("https://mongoosejs.com/docs/")
    })
    it("test_url_service_trackURL_not_found",async()=>{
        addStub.returns(0)
        let res = await urlService.trackUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9")
        expect(res.code).to.be.equals(404)
    })
    it("test_url_service_trackURL_Invalid_id",async()=>{
        let res = await urlService.trackUrl("63c4e189ca3c78a13c4671d9", "4")
        expect(res.code).to.be.equals(400)
    })
    it("test_url_service_trackURL_unexpected_error",async()=>{
        addStub.throws("error")
        urlService.trackUrl("63c4e189ca3c78a13c4671d9", "63c4e189ca3c78a13c4671d9").catch(function(err){console.log(err);
            expect(err.code).to.be.equals(500)
        })
    })
    afterEach(()=>{
        addStub.restore();
    })
})