const {Schema, model} = require("mongoose")


class SchemaWriter {
    constructor() {
        this.self = this
        this.currentSchema = new Schema({})
    }
    
   
    Define(properties) {
        let _NW = new Schema({...properties})
        this.currentSchema = _NW
        return this.self
    }

    Add(PropertyName, PropertyType) {
        let obj = {}
        obj[PropertyName] = PropertyType
        this.currentSchema.add(obj)

        return this.self
    }

    ToModel(ModelName) {
        const result = model(ModelName, this.currentSchema)
        return result;
    }

   
}

module.exports ={ SchemaWriter}