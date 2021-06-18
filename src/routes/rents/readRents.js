export default function readRents(app, connection) {
    app.get("/rentals", async (req, res) => {

      const customerId = req.query.customerId ?? "";
      const gameId = req.query.gameId ?? "";

      try {
        const sql = `
        SELECT rentals.*, 
        categories.name AS "categoryName" 
        FROM games INNER JOIN categories 
        ON games."categoryId" = categories.id 
        where games.name ilike $1`;
        const rentalsList = await connection.query(sql, [game + "%"]
        );
  
        res.status(200).send(rentalsList.rows);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }