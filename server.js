// Esercizio
// Per il nostro blog, concentriamoci sul creare 2 rotte:

//     / [POST] - rotta store del crud che riceverà dei dati e creerà un nuovo post. Questa dovrà riceve i dati in formato application/x-www-urlencoded e dovrà ritornare un redirect nel caso di richiesta html, altrimenti di default il json dell’elemento appena creato
//     /:slug [DELETE] - rotta destroy del crud che dovrà ritornare un 404 nel caso non sia stato trovato un post corrispondente. Ritornare un redirect nel caso di richiesta html, altrimenti di default del testo con scritto “post eliminato”

// Tutte le funzioni delle rotte dovranno essere scritte nel controller dedicato.
// Testare le rotte tramite Postman.


const express = require("express");

// importo dotenv
const dotenv =require('dotenv').config();
// importo il controller
const homecontroller = require('./controller/home');
// importo il router
const postsRouter = require ('./router/posts');

// creo istanza express
const app=express();

// configuro express per leggere i dati in formato json
app.use(express.json());
// configuro express per leggere i dati in formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// configuro i file statici
app.use(express.static("public"));


    // Rotte relative all'entità pizze
    app.use("/posts", postsRouter)

// avviamo il server
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
});