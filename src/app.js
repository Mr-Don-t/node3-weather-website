const express=require('express')
const hbs=require('hbs')
const path=require('path')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')


/////////////////////////////////////////////

// console.log(__dirname)
// console.log(__filename)


// console.log(path.join(__dirname,'../'))



// console.log(path.join(__dirname,'../public'))







////////////////////////////////////////////////////////

const app=express()

// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.use(express.static(publicDirectoryPath))


// Setup static directory  to serve

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// app.get('',(req,res)=>{
//     res.send(
//         'Hello express'
//     )
// })

////////////////////////////////////////////////
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Prabhakar'
//     },{
//         name:'aman'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About<h1>')
// })
////////////////////////////////////////////////////////////////


// app.get('/products',(req,res)=>{
        
//         // console.log(req.query)

//         if(!req.query.search){
//            return res.send({
//                 error:"You must provide a search tern"
//             })
//         }
//         console.log(req.query.search)

//       res.send({
//         products:[]
//       })

// })

/////////////////////////////////////////////////////////////////////////
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'prabhakar yadav'
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"prabhakar yadav"
    })
})




app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some helpful text',
        name:"prabhakar yadav"
    })
})



app.get('/weather',(req,res)=>{


    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }

    // res.send({
    //     forecast:'It is snowing',
    //     location:'Delhi',
    //     address:req.query.address
    // })

     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
     })


})


app.get('/help/*',(req,res)=>{

    res.render(  '404',{
        title:'404',
        name:'Prabhakar yadav',
        errorMessage:"Help article not found"

    }
)
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Prabhakar yadav',
        errorMessage:"Page not found"

    })
})


//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})