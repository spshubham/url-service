const cron = require("node-cron");
const Url = require("../models/url.model");
const axios = require("axios")
const constant = require("../utils/constant")
const conf = require("../conf/conf")
let min = 1;

cron.schedule("*/1 * * * *", function() { 
    try{
    console.log("running a task every 1 min", min);
    const job = async()=>{
        let res =  await Url.find();

        for(let i = 0;i<res.length;i++)
        {

            if(min%res[i].frequency == 0)
            {
                const resp = await axios.get(res[i].url_name)
                
                if(resp.status<400)
                {
                    await Url.findOneAndUpdate({_id:res[i]._id},{$push:{url_status:{status:"Active",time: parseInt(new Date().getTime())}}})
                }
                else
                {
                    await Url.findOneAndUpdate({_id:res[i]._id},{$push:{url_status:{status:"Active",time: parseInt(new Date().getTime())}}})
                }
            }
            
        }
    }

    job();
    min++;
    }
    catch(err){
        console.log(err)
        return
    }
});


cron.schedule("0 0 0 * * *", async function() { 
   try{

        let curr_date = new Date();
       
        let past_date = new Date(curr_date.getTime() - constant.DAY_TIME*conf.SEVEN_DAYS);
       
        await Url.updateMany({},{$pull:{url_status:{time:{$lte: parseInt(past_date.getTime())}}}})
   }
   catch(err)
   {
    console.log(err)
    return
   }
});





