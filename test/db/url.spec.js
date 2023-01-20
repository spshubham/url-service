const sinon = require("sinon")
const {expect} = require("chai")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const validate = require("../../utils/validation")
const urlService = require("../../service/url")
const db = require("../../db/url.db")
const response = require("../../utils/response")
const jwt = require('jsonwebtoken')
const urlModel = require("../../models/url.model")
const bcrypt = require("bcrypt")
chai.use(chaiAsPromised);


describe("test_add_url_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(urlModel.prototype,"save");

    })
    it("test_url_service_register_user_success",async()=>{
       
        createStub.returns({code: 200,msg:"Url created"})
        let body = {"name": "SP"}
        let res = await db.addUrl(body, "ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_url_service_user_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.addUrl(body, "ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_url_service_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.addUrl(body,"ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})


describe("test_updateUrl_url_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(urlModel,"findOneAndUpdate");

    })
    it("test_updateUrl_url_success",async()=>{
       
        createStub.returns({code: 200,msg:"Url updated"})
        let body = {"name": "SP"}
        let res = await db.updateUrl(body, "ac12sa","ac12sa")
        expect(res.code).to.be.equals(200)
    })
    it("test_updateUrl_url_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.updateUrl(body, "ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_updateUrl_url_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.updateUrl(body,"ac12sa","ac12sa").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})

describe("test_listUrl_url_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(urlModel,"find");

    })
    it("test_listUrl_url_success",async()=>{
       const mockSelect={
        select: function(){
            return {code:200, url_name:"Url Name"}
        }
       }
        createStub.returns(mockSelect)
 
        let res = await db.listUrl("63c962e85913cb98539edab9")
        expect(res.code).to.be.equals(200)
    })
    it("test_listUrl_url_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.listUrl("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_listUrl_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.listUrl("63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})

describe("test_delete_url_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(urlModel,"deleteOne");

    })
    it("test_delete_url_success",async()=>{

        createStub.returns({code:200,deletedCount:1})
 
        let res = await db.removeUrl("63c962e85913cb98539edab9", "63c962e85913cb98539edab9")
        expect(res.code).to.be.equals(200)
    })
    it("test_delete_url_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.removeUrl("63c962e85913cb98539edab9","63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_delete_url_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.removeUrl("63c962e85913cb98539edab9","63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})

describe("test_trackUrl_db",()=>{
    let createStub;
    beforeEach(()=>{
      
        createStub = sinon.stub(urlModel,"findOne");

    })
    it("test_trackUrl_success",async()=>{
        const mockSelect={
            select: function(){
                return {code:200, url_name:"Url Name"}
            }
           }
            createStub.returns(mockSelect)
 
        let res = await db.trackUrl("63c962e85913cb98539edab9", "63c962e85913cb98539edab9")
        expect(res.code).to.be.equals(200)
    })
    it("test_trackUrl_exist",async()=>{
       
        createStub.throws({code: 11000})

        let body = {"name": "SP"}
         await db.trackUrl("63c962e85913cb98539edab9","63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(400)
        })
        
    })
    it("test_trackUrl_unexpected_error",async()=>{
       
        createStub.throws({})
        let body = {"name": "SP"}
         await db.trackUrl("63c962e85913cb98539edab9","63c962e85913cb98539edab9").catch((res)=>{
            expect(res.code).to.be.equals(500)
        })
        
    })
    afterEach(()=>{
    
        createStub.restore();
    })
})