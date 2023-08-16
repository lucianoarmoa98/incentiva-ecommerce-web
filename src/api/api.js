import axios from "axios";

//service condicional
const URL_TEST = false; //false para desarrollo, true para produccion

//Url base produccion
const URL = (URL_TEST) ? "https://gastos-app-money.herokuapp.com" : "http://192.168.0.7:8080";


//------------------------------------------------------------------------------servicio de login
export const postLogin = (body) => {
    console.log("body", body);
    return new Promise((resolve, reject) => {
        axios({
            //url: 'https://gastos-app-money.herokuapp.com/api/auth/iniciar-sesion',
            url: URL + "/api/auth/iniciar-sesion",
            method: 'Post',
            data: body,
            headers: {
                'Content-Type': 'application/json'
                //'Authorization': 'Bearer '+ localStorage.getItem('tokenIndufar')
            }
        })
            .then(response => {
                resolve(response);
                //console.warn("postLoginTrueService", response.data);
            })
            .catch(error => {
                //console.warn("dataErrorService", error.response.data);


                reject(error.response.data);
            })

    });
};