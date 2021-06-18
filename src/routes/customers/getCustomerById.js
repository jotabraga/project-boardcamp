export default function readCategories(app, connection) {

    app.get("/customers/:id", async (req, res) => {

      const id = req.params;
    
      try {
        const sql = 'select * from customers where id like $1';
        const customersList = await connection.query(sql, [id]);
        res.send(customersList.rows);  
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }