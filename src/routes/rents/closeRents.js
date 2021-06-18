import dayjs from "dayjs";

export default function closeRents(app, connection) {

  app.post("/rentals/:id/return", async (req, res) => {

    const { id } = req.params;

    try {
      const sql = "select * from rentals where id = $1";
      const rent = await connection.query(sql, [id]);

      if (rent.rows.length === 0) {
        return res.sendStatus(404);
      } else if (rent.rows[0].returnDate !== null) {
        return res.sendStatus(400);
      } else {
        const returnDate = dayjs().format("YYYY-MM-DD");
        const rentDate = rent.rows[0].rentDate;
        const daysRented = rent.rows[0].daysRented;
        const lateDays = dayjs(returnDate).diff(rentDate, "day") - daysRented;
        const delayFee =
          lateDays > 0 ? lateDays * rent.rows[0].originalPrice : 0;

        const sql = `update rentals 
        set "returnDate" = $1, "delayFee" = $2
        WHERE id = $3`;
        await connection.query(sql, [returnDate, delayFee, id]);
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
}
