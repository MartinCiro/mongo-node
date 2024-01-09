/**
 * *@constructor
 * *@param { boolean } ok Estado de petición
 * *@param { int } cod_status Código de status HTTP
 * *@param { any } result Objeto del resultado de la petición
 */
class ResponseBody {
    constructor(result, ok, status_cod) {
        this.result = result;
        this.ok = ok;
        this.status_cod = status_cod;
    }
}
module.exports = ResponseBody;