export default function readGames(app, connection) {

  app.get("/games", async (req, res) => {

    const game = req.query.name ?? "";
    try {
      const gamesList = await connection.query("select * from games where name ilike $1", [game+"%"]);
      res.status(200).send(gamesList.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
