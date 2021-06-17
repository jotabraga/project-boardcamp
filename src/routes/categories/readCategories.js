export default function readCategories(app, connection) {

  app.get("/categories", async (req, res) => {
  
    try {
      const categoriesList = await connection.query('select * from categories');
      res.send(categoriesList.rows);

    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
