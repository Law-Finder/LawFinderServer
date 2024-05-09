module.exports = {
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    full_name : {
        type: String
    },
    date_of_birth : {
        required : true,
        type: Date
    },
    gender : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        unique : true,
        required: true,
    },
    email : {
        type: String,
        required: true
    },
    identity_card : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "default.png"
    }
}