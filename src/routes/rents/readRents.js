export default function readRents(app, connection) {
    app.get("/rentals", async (req, res) => {

      const { customerId, gameId } = req.query;    

      const sql = `
      SELECT rentals.*, 
          jsonb_build_object('name', customers.name, 'id', customers.id) AS customer,
          jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game            
          FROM rentals 
          JOIN customers ON rentals."customerId" = customers.id
          JOIN games ON rentals."gameId" = games.id
          JOIN categories ON categories.id = games."categoryId"
          where rentals.id > 0`;

      const params = [];
        let paramCount = 1;

        if(gameId) {
            sql +=  ` AND games.id = $${paramCount}`;
            paramCount++;
            params.push(gameId);
        }

        if(customerId) {
            sql +=  ` AND customers.id = $${paramCount}`;
            paramCount++;
            params.push(customerId);
        }

      try {
        
        const rentalsList = await connection.query(sql, params);
  
        res.status(200).send(rentalsList.rows);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }