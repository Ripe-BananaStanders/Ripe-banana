const pool = require('../utils/pool');

class Review {
    id;
    rating;
    reviewerId;
    review;
    filmId;

    constructor(row) {
      this.id = row.id;
      this.rating = row.rating;
      this.reviewerId = row. reviewer_id;
      this.review = row.review;
      this.filmId = row.film_id;  
    }
    static async insert(review) {
      const { rows } = await pool.query(
        `INSERT INTO reviews (rating, reviewer_id, review, film_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *
         `, [review.rating, review.reviewerId, review.review, review.filmId], 

      );
      
      return new Review(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query(
        `SELECT * FROM reviews 
         LIMIT 100`
      );
  
      return rows.map(row => new Review(row));
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM reviews WHERE id=$1 RETURNING *',
        [id]
      );

      return new Review(rows[0]);
    }
    
}


module.exports = Review;
