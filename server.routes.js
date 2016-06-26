var Pages = reqRoot('handlers/pagesHandler.js');

exports.endpoints = [
    /* Says Hello World */
    {method: 'GET', path:'/', config:Pages.hello}
];