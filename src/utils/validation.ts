import { connect } from '../config/mongodb';

class Validacao {

    errors: Array<Object> = []

    messageEmailInvalid = "Digite um email valido";

    messageEmailExist = "Este email já está associado a uma conta existente";

    //valida se o campo não e nulo ou menor que zero
    public isRequired(value : string, message: string) : void {
        if (!value || value.length <= 0) { this.errors.push({ message: message }) }
    }

    //valida se o campo e menor que X
    public hasMinLen(value : string, min: number, message: string) : void {
        if (!value || value.length < min) { this.errors.push({ message: message }) }
    }

    //valida se o campo e maior que X
    public hasMaxLen(value: string, max: number, message: string) : void {
        if (!value || value.length > max) { this.errors.push({message: message}) }
    }

    public error() : Array<Object> {
        return this.errors;
    }

    public clear() : void {
        this.errors = [];
    }

    public isValid() : boolean {
        return this.errors.length == 0;
    }

    //valida o e-mail
    public isValidEmail(email : string, cb) {
        const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(email)) { 
            cb(new Error(this.messageEmailInvalid))
            return; 
        }

        connect((err, db) => {
            db.collection('users').findOne({email: email}, (err, res) => {
                if (res && res.email === email) { 
                    cb(new Error(this.messageEmailExist))
                } else {
                    cb(null);
                }
            })
        }); 
    }
}

export default new Validacao()
