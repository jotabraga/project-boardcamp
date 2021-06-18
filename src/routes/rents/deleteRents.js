
export default function deleteRents(app, connection) {

    app.delete("/rentals/:id", async (req, res) => {

      const { id } = req.params;
              
      try {
        const rental = await connection.query('select * from rentals where id = $1', [id]);
      
          
        if (!rental.rows[0]) {
          return res.sendStatus(404);
        } else if (rental.rows[0].returnDate !== null) {
          return res.sendStatus(400);
        } else {
          await connection.query('delete from rentals where id = $1', [id]);
          res.sendStatus(200);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }