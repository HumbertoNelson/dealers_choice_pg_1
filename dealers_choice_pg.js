const pg=require('pg')
const express=require('express')
const {client,movie_books_db}= require('./db')

const app=express()

app.use(express.urlencoded({ extended: false }));

app.use('/assets',express.static('assets'))

app.get(`/`,async(req,res,next)=>{
    try{
    const movieResponse=await client.query(`SELECT * FROM 'movies'`)
    const bookResponse=await client.query(`SELECT * FROM 'books'`)
    const movies=movieResponse.rows
    const books=bookResponse.rows
    res.send(`
         <html>
             <head>
                 <link rel='stylesheet' href='/assets/styles.css' />
             </head>
             <body>
             <h1>IMDB Clone! (with SQL)</h1>
             <h2><a href='/'>Movies and Books</a></h2>
                <ul>
                ${movies.map(movie=>{
                    return `<li>
                    Movie Title:
                    <a href='/movies/${movie.id}'>
                    ${movie.title}
                    </a>
                    </li>
                `}
                ).join('')
            }${books.map(book=>{
                return `<li>
                Movie Title:
                <a href='/movies/${book.id}'>
                ${book.title}
                </a>
                </li>
            `}
            ).join('')
        }
                </ul>
        </html>
         `)
}catch(ex){

    console.log(ex)
}
})

app.get(`/movies/:id`,async(req,res,next)=>{
    try{
    const response=client.query(`SELECT * FROM "movies" WHERE id=$1;`,[req.params.id]);
    const movies=response.rows
    res.send(`
         <html>
             <head>
                 <link rel='stylesheet' href='/assets/styles.css' />
             </head>
             <body>
             <h1></h1>
             <h2><a href='/'>Back to All Movies</a></h2>
                <ul>
                    <li>
                    Movie Title:
                    The name of the movie is: ${movies.title}
                    The release year is: ${movies.release_year}
                    The movie rating is: ${movies.rating}
                    </li>
                ).join('')
            }
                </ul>
        </html>
         `)
}catch(ex){
    next(ex)
}
})

app.get(`/books/:id`,async(req,res,next)=>{
    try{
    const response=client.query(`SELECT * FROM "books" WHERE id=$1;`,[req.params.id]);
    const books=response.rows
    res.send(`
         <html>
             <head>
                 <link rel='stylesheet' href='/assets/styles.css' />
             </head>
             <body>
             <h1></h1>
             <h2><a href='/'>Back to All Movies and Books</a></h2>
                <ul>
                    <li>
                    Movie Title:
                    The name of the movie is: ${books.title}
                    The release year is: ${books.release_year}
                    The movie rating is: ${books.rating}
                    </li>
                ).join('')
            }
                </ul>
        </html>
         `)
}catch(ex){
    next(ex)
}
})

const setup = async () => {
    try {
      await client.connect();
      await client.query(movie_books_db);
      const port = process.env.PORT || 3001;
      app.listen(port, () => console.log(`
        listening on port ${port}
      `));
    }
    catch (ex) {
      console.log(ex);
    }
  };

  
  setup();


