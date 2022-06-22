const request=require('request')



const geocode=(address,callback)=>{
    const url='https://api.geoapify.com/v1/geocode/search?text='+address+'&lang=en&limit=1&type=city&format=json&apiKey=d548c5ed24604be6a9dd0d989631f783'
  
    // request({url:url,json:true},(error,response)=>{
       
  
    //    if(error){
    //      callback('Unable to connect to location services',undefined)
      
    //    }else if(response.body.error){
    //      callback('Unable to find the locatioin, try again later',undefined)
    //    }else{
    //   callback(undefined,{
    //       latitude:response.body.results[0].lon,
    //      longitude:response.body.results[0].lat,
    //     location:response.body.results[0].city+" ," +response.body.results[0].state+" ," +response.body.results[0].country
    //     }
    //   )
  
  
    //     }
    //    })
  


    request({url:url,json:true},(error,{body})=>{
       
  
      if(error){
        callback('Unable to connect to location services',undefined)
     
      }else if(body.error){
        callback('Unable to find the locatioin, try again later',undefined)
      }else{
     callback(undefined,{
         latitude:body.results[0].lon,
        longitude:body.results[0].lat,
       location:body.results[0].city+" ," +body.results[0].state+" ," +body.results[0].country
       }
     )
 
 
       }
      })






  
      }
  
  
  
    





  module.exports=geocode