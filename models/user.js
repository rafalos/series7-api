var mongoose = require("mongoose");
var bcrypt = require("bcrypt")

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
});

UserSchema.pre("save", function(next){
    var user = this;
    if(this.isModified("password") || this.isNew ) {
        bcrypt.genSalt(10, function( err,salt){
            if(err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password = hash
                next();
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch){
        if(err) {
            return cb(err)
        }
        cb(null, isMatch);
    })
}

module.export = mongoose.model("User", UserSchema)