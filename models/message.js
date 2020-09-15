module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            topic: String,
            message: String,
            sensorId: String,
            ambienteId: String
        },
        {
            timestamps: true
        }
    );
    
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    
    const User = mongoose.model("message", schema);
        
    return User;
}