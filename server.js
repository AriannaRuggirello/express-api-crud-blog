
// Esercizio
// Usando l’array dei post fornito con le relative immagini, creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l’entità post.All’interno creare le seguenti rotte:

//     / - index: ritornerà un html con una ul che stamperà la lista dei post
//     /:slug - show: tramite il parametro dinamico che rappresenta lo slug del post, ritornerà un json con i dati del post
//     /create - create: ritornerà un semplice html con un h1 con scritto Creazione nuovo post e nel caso venga richiesta una risposta diversa da html lancerà un errore 406
//     /:slug/download - download: dovrà far scaricare l’immagine del post rappresentato dallo slug. Attenzione, se lo slug contiene il simbolo / la rotta non funzionerà. C’è qualche strumento che ci permette di codificare lo slug?
//     Scrivere tutte le funzioni delle rotte nel controller dedicato

// Registrare il router dentro app.js con il prefisso posts/.


const express = require("express");
// importo dotenv
const dotenv =require('dotenv').config();
// importo il controller
const homecontroller = require('./controller/home');
// importo il router
const postsRouter = require ('./router/posts');

// creo istanza express
const app=express();
// configuro i file statici
app.use(express.static("public"));


// Rotte relative all'entità pizze
app.use("/posts", postsRouter)

// avviamo il server
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`);
});