export default function readGames(app, connection) {
  app.get("/games", async (req, res) => {
    const game = req.query.name ?? "";
    try {
      const sql = `
      SELECT games.*, 
      categories.name AS "categoryName" 
      FROM games INNER JOIN categories 
      ON games."categoryId" = categories.id 
      where games.name ilike $1`;
      const gamesList = await connection.query(sql, [game + "%"]
      );

      res.status(200).send(gamesList.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
