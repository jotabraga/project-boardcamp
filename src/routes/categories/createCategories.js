export default function createCategories(app, connection) {

  app.post("/categories", async (req, res) => {
    const { name } = req.body;
    console.log(name);

    try {
      const nameList = await connection.query('select * from categories where name = $1', [name]);

      if (name.length === 0) {
        return res.sendStatus(400);
      } else if (nameList.rows[0]) {
        return res.sendStatus(409);
      } else {
        await connection.query('insert into categories (name) values ($1)', [name]);
        res.sendStatus(201);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
