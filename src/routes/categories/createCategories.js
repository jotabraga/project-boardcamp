export default function createCategories(app, connection) {

  app.post("/categories", async (req, res) => {
    const { name } = req.body;
  
    try {
      const sql = "select * from categories where name = $1";
      const nameList = await connection.query(sql, [name]);

      if (name.length === 0) {
        return res.sendStatus(400);
      } else if (nameList.rows[0]) {
        return res.sendStatus(409);
      } else {
        const sql = "insert into categories (name) values ($1)";
        await connection.query(sql, [name]);
        res.sendStatus(201);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
