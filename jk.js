const {GlovaroDB} = require("./main")

const db = GlovaroDB("mongodb+srv://glovaro:DVorak2300@glovaro.13pik.mongodb.net/glovaromicroservices",{
    autoConnect:true, useNewUriParser:true, useUnifiedTopology:true});


// db.Open((er, data)=>{
//         if(!er) {
//             console.log(data)
//         }
//     })
const AdminModel = db.CreateModel('Admin', {
    IsAdmin: Boolean,
    UserName: String
})

const sd = new AdminModel({IsAdmin:true, UserName:'olatunde'})

db.Add(sd)
db.SaveChangesAsync()
.then(res=>console.log(res))
.catch(er=>console.log(er))
