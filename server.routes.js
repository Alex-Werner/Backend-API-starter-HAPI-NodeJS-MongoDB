var Pages = reqRoot('handlers/pagesHandler.js');
var Authentication = reqRoot('handlers/authHandler.js');

exports.endpoints = [
    /* Says Hello World */
    {method: 'GET', path:'/', config:Pages.hello},

    /*** Authentification ***/
    {method: 'POST', path:'/auth/register', config:Authentication.register}
];