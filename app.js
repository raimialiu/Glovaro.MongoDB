const glovaro = require("./GlovaroDB")
const {SchemaWriter} = require("./SchemaWriter")

const db = glovaro("mongodb+srv://glovaro:DVorak2300@glovaro.13pik.mongodb.net/glovaromicroservices",{
    autoConnect:false, useNewUriParser:true, useUnifiedTopology:true
})

db.Open((er, data)=>{
    if(!er) {
        console.log(data)
    }
})
const model = db.CreateModel("User", {
    FirstName:String,
    LastName:String,
    City:String
})


const res = new model({FirstName:"olatunde", LastName:"kehinde", City:"Lagos"})
const res2 = new model({FirstName:"Akintunde", LastName:"Pero", City:"Niger"}) 

const sc = new SchemaWriter()
sc.Define({FirstName:String}).Add("IsAdmin", Boolean).Add("FirstTimeLogin", Boolean)
const md = sc.ToModel('Admin')

const adminOne = new md({FirstName:'Tunde', "IsAdmin":true, "FirstTimeLogin":true})
//db.Add(adminOne)

//db.SaveChangesAsync().then(res=>console.log(res)).catch(er=>console.log(er))

//sc.Define({FirstName:String}).Add(LastName, String)

db.Count(md).then(res=>console.log(res)).catch(er=>console.log(er))

//db.Add(res)
//db.Add(res2)

//db.SaveChangesAsync().then(res=>console.log(res)).catch(er=>console.log(er))
//res.save().then(res=>console.log(res)).catch(er=>console.log(er))

// db.FirstOrDefaultAsync(model, {"FirstName":"olatunde"})cls

//         .then(res=>console.log(res))
//         .catch(er=>console.log(er))

// db.PaginatedQuery(model, {"FirstName":"olatunde"}, 1, 2)
//             .then(res=>console.log(res))
//             .catch(er=>console.log(er))

//db.Count(model, {FirstName:'bimbo'}).then(res=>console.log(res)).catch(er=>console.log(er))
//db.FirstOrDefaultAsync(model, {FirstName:'olatunde'}).then(res=>console.log(res)).catch(er=>console.log(er))