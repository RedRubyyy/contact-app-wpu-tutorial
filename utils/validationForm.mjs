import validator from 'validator';

export const validationForm = (body) => {
    let message = [];
    const {email , notlp} = body;
    if ( !validator.isMobilePhone(notlp , 'id-ID') ) { 
        message = ["Phone number not valid"];
    };
    if( !validator.isEmail(email) ) { 
        message.push("Email not Valid"); 
    };
    if (message.length == 0) { 
        message = ["Successfully sending data"]; 
    };
    return {
        email : validator.isEmail(email),
        notlp : validator.isMobilePhone(notlp , 'id-ID'),
        message : message.join(' and ')
    };
};

export const editDataValidation = (dataSend) => {
    const validation = [
        dataSend.oldName == dataSend.name ? true : false,
        dataSend.oldEmail == dataSend.email ? true : false,
        dataSend.oldNotlp == dataSend.notlp ? true : false
    ];
    delete dataSend.oldName;
    delete dataSend.oldEmail;
    delete dataSend.oldNotlp;
    let message = `Data code ${dataSend.code} belum diubah`;
    let status = false;
    if(validation.includes(false)) {
        status = true
        message = `Data code ${dataSend.code} berhasil diubah`
    }
    return {status,message,dataSend}
}
