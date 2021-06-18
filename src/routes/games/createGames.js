export default function createGames(app, connection) {

  app.post("/games", async (req, res) => {

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
      
      const category = await connection.query("select * from categories where id = $1", [categoryId]);
      const gameName = await connection.query("select * from games where name = $1",[name]);

      if (
        category.rows.length === 0 ||
        name.length === 0 ||
        stockTotal <= 0 ||
        pricePerDay <= 0
      ) {
        return res.sendStatus(400);

      } else if (gameName.rows[0]) {
        return res.sendStatus(409);

      } else {
        const sql = `insert into games 
                    (name, image, "stockTotal", "categoryId", "pricePerDay") 
                    values ($1, $2, $3, $4, $5)`;
        await connection.query(sql, [name, image, stockTotal, categoryId, pricePerDay,]);
        res.sendStatus(201);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
