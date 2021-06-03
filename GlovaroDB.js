const mongoose = require("mongoose")
function GlovaroDB(connectionString, options={autoConnect:true, useUnifiedTopology:true, 
                        useNewUriParser:true}) {
    let models = []
    let _cb =  null
    if(options.autoConnect) {
       _cb = Open((er)=>{
            if(er)
            {
                throw new Error(er)
            }
        })
    }
   

    function Open(cb) {
        if(!connectionString)
        {
            throw new Error("undefined connection string")
        }
        mongoose.connect(connectionString, options, (er)=>{
            if(er) {
                cb(er,null)
            }
        })

        const db = mongoose.connection
        _cb = db
        cb(null,db)
    }

    function CreateModel(ModelName, properties) {
        var schema = new mongoose.Schema(properties)

        return mongoose.model(ModelName, schema)
    }

    function Add(model) {
        models.push(model)

        return this
    }

    async function Save(doc) {
        const result = await doc.save()
        return result._id != null ? result._id : null
    }

    async function SaveChangesAsync() {
        
        for(let k of models) 
        {
            const res = await k.save()

            if(res._id == null) {
                return false;
            }
        }
        models = [];
        return true
    }

    async function FirstOrDefaultAsync(ModelName, query) {
        const vl = await ModelName.find(query)

        return vl != null ? vl[0] : null
    }

    async function TopTen(ModelName){
        return await ModelName.find().skip(0).limit(10).exec()
    }
    async function FindById(ModelName, id) {
        return ModelName.find({_id:id})
    }
    async function Count(ModelName, query=null) {

        if(ModelName == null){
            throw new Exception("null input")
        }
            
        if(query == null) {
            return await ModelName.countDocuments();
        }

        var res = await ModelName.find(query)
        return res.length
    }

    async function QueryAsync(ModelName, query) {
        return ModelName.find(query)
    }

    async function PaginatedQuery(ModelName, query, pageIndex=1, PageSize=500) {
        return await ModelName.find(query).skip((pageIndex-1)*PageSize).limit(PageSize).exec()
    }

    function CreateAndSave(ModelName, properties, PropValues, cb) {
        var SchemaProp = new mongoose.Schema(properties)
        var model = mongoose.Model(ModelName, SchemaProp)

        var modelToSave = new SchemaProp(PropValues)

        modelToSave.save().then(res=>cb(null, res)).catch(er=>cb(er,null))
    }

    return {
        FindById,
        Open,
        TopTen,
        QueryAsync,
        Count,
        Save,
        PaginatedQuery,
        CreateAndSave, CreateModel, Add, SaveChangesAsync,FirstOrDefaultAsync
    }

}

module.exports = GlovaroDB