import validator from 'validator';

export const validationForm = (body) => {
    let message = [];
    const {email , notlp} = body;
// VALIDATION EMAIL
    (function () {
        validator.isMobilePhone(notlp , 'id-ID') == true ?
        "escape" :
        message = ["Phone number not valid"];
    }());
// VALIDATION NUMBER PHONE
    (function () {
        validator.isEmail(email) == true ?
        "escape" :
        message.push("Email not Valid");
    }());
// LAST VALIDATION AND CREATE MESSAGE
    message.length == 0 ? 
    message = ["Successfully sending data"] 
    : "escape";
// RETURN MESSAGE
    return {
        email : validator.isEmail(email),
        notlp : validator.isMobilePhone(notlp , 'id-ID'),
        message : message.join(' and ')
    };
};
