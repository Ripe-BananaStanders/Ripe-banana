const pool = require('../utils/pool');
// import actors 
// import studio

class Film {
    id;
    studioId;
    title;
    released;
    filmcast;

    constructor(row) {
      this.id = row.id;
      this.studioId = row.studio_id;
      this.title = row.title;
      this.released = row.released;
      this.filmcast = row.filmcast;
    }

    static async insert(film) {
      const { rows } = await pool.query(
        `INSERT INTO films (studio_id, title, released, filmcast)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [film.studioId, film.title, film.released, film.filmcast]
      );
      return new Film(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        `SELECT films.id, studio_id, title, released, name 
         FROM films
         JOIN studios
         ON films.studio_id = studios.id
        `
      );
      const films = rows.map(row => ({
        id: row.id,
        title: row.title,
        released: row.released
      }));
  
      const studios = rows.map(row => ({
        id: row.studio_id,
        name: row.name
      }));
  
      return films.map((film, i) => ({
        ...film,
        studio: studios[i]
      }));
     
    }


    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM films WHERE id=$1',
        [id]
      );
  
      if(!rows[0]) return null;
      return new Film(rows[0]);
    }
    
   
 
}

module.exports = Film;
