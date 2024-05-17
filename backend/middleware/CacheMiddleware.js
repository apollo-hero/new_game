const ResponseData = require("../utils/ResponseData");

let CACHE_DATA = []

module.exports = async(req,res,next) =>{
    const data = (req.body);
    try{
        
        if (data.seqPlay && data.playState && CACHE_DATA.filter((cache)=>(cache.seqPlay==data.seqPlay && cache.playState.toLowerCase()==data.playState.toLowerCase())).length==0) {

            if (CACHE_DATA.length >= 10) {
                CACHE_DATA.splice(0, 1);
                CACHE_DATA.push(data);
            }
            else {
                CACHE_DATA.push(data);
            }
            next();
        }
        else{
            ResponseData.error(res,"Alreay Exist on cache",{});
        }
    }
    catch(err){
        CACHE_DATA = [];
        ResponseData.error(res,"Cache Error",{});
    }
}  
