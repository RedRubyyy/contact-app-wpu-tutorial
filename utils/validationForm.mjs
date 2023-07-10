import validator from 'validator';

export const validationForm = (body) => {
    const {email , notlp} = body
    const email_val = validator.isEmail(email)
    const notlp_val = validator.isMobilePhone(notlp , "id-ID")
    let message =  "Succes sending data";
    email_val === true ? message += "" : message = "Email not valid";
    notlp_val === true ? message += "" : message = "Number not valid";
    return {
        email : email_val,
        notlp : notlp_val,
        message : message
    }
};