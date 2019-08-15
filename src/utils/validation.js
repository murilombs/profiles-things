"use strict";
exports.__esModule = true;
var mongodb_1 = require("../config/mongodb");
var Validacao = /** @class */ (function () {
    function Validacao() {
        this.errors = [];
        this.messageEmailInvalid = "Digite um email valido";
        this.messageEmailExist = "Este email já está associado a uma conta existente";
    }
    //valida se o campo não e nulo ou menor que zero
    Validacao.prototype.isRequired = function (value, message) {
        if (!value || value.length <= 0) {
            this.errors.push({ message: message });
        }
    };
    //valida se o campo e menor que X
    Validacao.prototype.hasMinLen = function (value, min, message) {
        if (!value || value.length < min) {
            this.errors.push({ message: message });
        }
    };
    //valida se o campo e maior que X
    Validacao.prototype.hasMaxLen = function (value, max, message) {
        if (!value || value.length > max) {
            this.errors.push({ message: message });
        }
    };
    Validacao.prototype.error = function () {
        return this.errors;
    };
    Validacao.prototype.clear = function () {
        this.errors = [];
    };
    Validacao.prototype.isValid = function () {
        return this.errors.length == 0;
    };
    //valida o e-mail
    Validacao.prototype.isValidEmail = function (email, cb) {
        var _this = this;
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(email)) {
            cb(new Error(this.messageEmailInvalid));
            return;
        }
        mongodb_1.connect(function (err, db) {
            db.collection('users').findOne({ email: email }, function (err, res) {
                if (res && res.email === email) {
                    cb(new Error(_this.messageEmailExist));
                }
                else {
                    cb(null);
                }
            });
        });
    };
    return Validacao;
}());
exports["default"] = new Validacao();
