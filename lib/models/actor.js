const pool = require('../utils/pool');

class Actor {
    id;
    name;
    dob;
    pob;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.dob = row.dob;
      this.pob = row.pob;  
    }

    static async insert(actor) {
      const { rows } = await pool.query(
        `INSERT INTO actors (name, dob, pob)
               VALUES ($1, $2, $3)
               RETURNING * `,
        [actor.name, actor.dob, actor.pob]
      );
      return new Actor(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM actors'
      );
  
      return rows.map(row => new Actor(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM actors WHERE id=$1',
        [id]
      );
  
      if(!rows[0]) return null;
      return new Actor(rows[0]);
    }
}

module.exports = Actor;
