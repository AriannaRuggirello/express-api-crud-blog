// importo express
const express= require('express');
// importo json
const posts = require('../db/db.json')


const path = require("path");
const fs = require("fs");
const { kebabCase } = require("lodash");

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
// rotta index
function index(req,res){
    res.type('html')
    
    // Creo una pagina HTML con i post
    const html = [
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">',
        '<h1>benvenuto!</h1>',
        '<div class="row justify-content-between">'
    ];

    // Aggiungi i post alla pagina HTML
    for (const post of posts) {
        html.push(`
            <div class="col">
                <div class="card" style="width: 250px;">
                <img src="/imgs/posts/${post.image}" alt="">
                  
                    <h5 class="card-title">${post.title}</h5>
                    
                    <div class="card-body">
                    <a class="card-title"> #${post.tags}</a>
                    </div>
                </div>
            </div>
        `);
    }

    html.push('</div>');

    // Invia la pagina HTML al client
    res.send(html.join(''));
  
      

}


  /**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function create(req, res) {
    res.format({
        html: function(){
            return res.type("html").send("<h1>Creazione nuovo post</h1>");
        },
        default: function(){
            if (!req.get('Accept') || !req.get('Accept').includes('html')) {
                res.status(406).send("Not Acceptable");
            }
        }
    });
}


  /**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
  function store(req, res) {
  
    res.format({
        html: ()=>{
            console.log('Reindirizzamento HTML a /');
            res.redirect('/posts/');
          
        },
    
        default: ()=> {
            res.type("json");

            // leggo il DB
            const postsDb = require('../db/db.json');

            // recupero gli id delle pizze
         /**
         * @type {number[]}
         */
            let idList =postsDb.map((post)=>post.id);

            // ordino gli id in ordine decrescente
            idList.sort((a,b)=>b-a);

            // aggiungo la pizza al DB
            postsDb.push({
                ...req.body,
                id: idList[0]+1,
                slug: kebabCase(req.body.title),
            });

            // converto il DB in JSON
            const json = JSON.stringify(postsDb,null,2);

            // scrivo il JSON su file
            fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), json);

            res.json(postsDb[postsDb.length-1]);

        },
        
    });
//     console.log(req.body);
//   //   console.log(req.query);
//       res.send('ok')
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function show(req, res) {
    res.type('json')
    // Ottengo lo slug del post dalla richiesta
    const postSlug = req.params.slug;
    // Cerco il post corrispondente nello slug nell'array dei post
    const post = posts.find((post) => post.slug == postSlug);

    // Se non ho trovato il post, restituisco un errrore
    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }
    // Se ho trovato il post, lo restituisco come risposta JSON
    res.json(post);
  }



/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

function downloadImage(req, res) {
    // Ottengo lo slug del post dalla richiesta.
    const postSlug = req.params.slug;

    // Cerco il post corrispondente allo slug nella lista dei post.
    const post = posts.find((post) => post.slug == postSlug);

    // Se il post non viene trovato, restituisco uno stato 404 con un messaggio appropriato.
    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }

    // Costruisco il percorso completo dell'immagine utilizzando lo slug del post.
    const imagePath = path.resolve(__dirname, '..', 'public', 'imgs', 'posts', post.image);

    // Verifico se l'immagine esiste sul percorso specificato.
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        // Se l'immagine non viene trovata, restituisco uno stato 404 con un messaggio appropriato.
        if (err) {
            res.status(404).send('Immagine non trovata');
            return;
        }
    });

    // Se tutto è a posto, invio l'immagine come download.
    res.download(imagePath);
}


// esporto 
module.exports={
    index,
    create,
    store,
    show,
    downloadImage
}