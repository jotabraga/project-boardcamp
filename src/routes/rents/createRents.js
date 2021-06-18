import dayjs from 'dayjs';

export default function createRents(app, connection) {    

    app.post("/rentals", async (req, res) => {
      const { customerId, gameId, daysRented } = req.body;
  
      try {
        const customer = await connection.query("select * from customers where id = $1", [customerId]);
        const game = await connection.query('select * from games where id = $1', [gameId]);      
        const rentDate = dayjs().format("YYYY-MM-DD");
        const originalPrice = parseInt(daysRented)*game.rows[0].pricePerDay;
        const stockOfGame = game.rows[0].stockTotal;
        const rentalsOfTheGame = await connection.query('select * from rentals where "gameId" = $1', [gameId]);
        const returnDate = null;
        const delayFee = null;  

        if(!customer.rows[0] || !game.rows[0] || daysRented <= 0 || rentalsOfTheGame.rows.length >= stockOfGame){
          return res.sendStatus(400);
        } else{
          const sql = `insert into rentals 
                      ( "customerId", "gameId", "rentDate", "daysRented",
                       "returnDate", "originalPrice", "delayFee" ) 
                      values ($1, $2, $3, $4, $5, $6, $7)`;
          await connection.query(sql, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
          res.sendStatus(201);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }