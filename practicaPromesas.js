// Executor
// let promise1 = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         // if (confirm("Esta promesa se cumplio?"))
//         return resolve("Hola Mundo");
//         return reject(new Error("Hubo un error"));
//     }, 2000);
// });

// let promise2 = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         // if (confirm("Esta promesa se cumplio?"))
//         return resolve("Hola Mundo");
//         reject(new Error("Hubo un error"));
//     }, 2000);
// });

// Utilizando dos argumento en el metodo then
// promise1.then(function(resultado) {
//     console.log(resultado);
// }, function(error) {
//     console.error("Algo salio mal...");
//     console.log(error);
// })

// Utilizando catch
// promise2.then(function(resultado) {
//     console.log(resultado);
// }).catch(function(err) {
//     console.error("Algo salio mal...");
//     console.log(err);
// })

// ---------------------------------------------------------------
// Sintaxis alternativa al generar un objeto tipo promesas
// El objeto que se genera puede ser una promesa ya cumplida o rechazada


// function dummy() {
//     if (Math.floor(Date.now() / 1000) % 2 == 0)
//         return Promise.resolve("Hola Mundo!");
//     return Promise.reject("Error");
// }

// dummy().then(console.log).catch(console.log);

// Promise.resolve("Hola Mundo!").then(console.log);
// Promise.reject("Hola Mundo!").catch(console.log);

// ---------------------------------------------------------------
function GET(url) {
    return new Promise(function(resolve, reject) {

        let ajaxCall = new XMLHttpRequest();

        ajaxCall.open('GET', url);

        ajaxCall.onload = function() {
            if (ajaxCall.status == 200) return resolve(ajaxCall.response);
            reject(Error(ajaxCall.status));
        }

        ajaxCall.onerror = function(err) {
            reject(err);
        }

        ajaxCall.send();
    });
}

function getUser(username) {
    return GET("https://api.github.com/users/" + username);
}

function getRepos(repos_url) {
    return GET(repos_url);
}

function getGithubUserInfo() {
    let getUserPromise = getUser("AkinRamirez");

    let getReposPromise = getUserPromise.then(response => {
        return getRepos(JSON.parse(response).repos_url);
    });

    return Promise.all([getUserPromise, getReposPromise])
}

getGithubUserInfo().then(([userInfo, reposInfo]) => {
        console.log("Info del usuario: ");
        console.log(userInfo);
        console.log("Info de los repos: ");
        console.log(reposInfo);
    })
    .catch(err => {
        console.log(err);
    });