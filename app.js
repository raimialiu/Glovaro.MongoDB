const glovaro = require("./GlovaroDB")

const db = glovaro("mongodb+srv://glovaro:DVorak2300@glovaro.13pik.mongodb.net/glovaromicroservices")

const model = db.CreateModel("User", {
    FirstName:String,
    LastName:String,
    City:String
})


const res = new model({FirstName:"olatunde", LastName:"kehinde", City:"Lagos"})
const res2 = new model({FirstName:"Akintunde", LastName:"Pero", City:"Niger"}) 

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

//db.Count(model).then(res=>console.log(res)).catch(er=>console.log(er))
db.FirstOrDefaultAsync(model, {FirstName:'olatunde'}).then(res=>console.log(res)).catch(er=>console.log(er))