const pg=require('pg')

const client=new pg.Client('postgres://localhost/movies_books_db')

const movie_books_db= async()=>{
   const sql=`
    DROP TABLE IF EXISTS "movies";
    DROP TABLE IF EXISTS "books";
      CREATE TABLE movies(
        movie_id INTEGER PRIMARY KEY,
        title VARCHAR(50),
        release_year INTEGER,
        rating VARCHAR(10)
      );
      
      INSERT INTO movies(movie_id,title,release_year, rating) VALUES(1,'JAWS',1976,'R');
      
      INSERT INTO movies(movie_id,title,release_year, rating) VALUES(2, 'Back To The Future', 1985, 'PG13');
      
      INSERT INTO movies(movie_id,title,release_year, rating) VALUES(3,'The Matrix', 2000, 'R');
      
      INSERT INTO movies(movie_id,title,release_year, rating) VALUES(4,'Interstellar', 2014, 'R');


      CREATE TABLE books(
        movie_id INTEGER PRIMARY KEY,
        title VARCHAR(50),
        release_year INTEGER,
        category VARCHAR(10)
      );
      
      INSERT INTO books(book_id, title, release_year, category) VALUES(1, 'Harry Potter', 1997,'Teen');
      
      INSERT INTO books(book_id, title, release_year, category) VALUES(2, 'Frankenstein', 1818, 'Adult');
      
      INSERT INTO books(book_id, title, release_year, category) VALUES(3, 'Interview With a Vampire', 2000, 'Adult');
      
      INSERT INTO books(book_id, title, release_year, category) VALUES(4, 'Contact', 1985, 'Teen');
      `
    await client.query(sql)
}

module.exports={client,movie_books_db}
