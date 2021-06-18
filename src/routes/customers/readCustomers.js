export default function readCategories(app, connection) {

  app.get("/customers", async (req, res) => {
    
    const cpf = req.query.cpf ?? "";

    try {
      const sql = "select * from customers where customers.cpf ilike $1";
      const customersList = await connection.query(sql, [cpf + "%"]);
      res.send(customersList.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
