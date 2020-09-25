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
 
}

module.exports = Film;
