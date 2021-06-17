import Joi from 'joi';

export default function createCostumers(app, connection) {

    app.post("/costumers", async (req, res) => {
      const { name, phone, cpf, birthday } = req.body;
        
      try {

        const nameList = await connection.query('select * from categories where name = $1', [name]);
        const userSchema = joi.object({
            name: joi.string().required(),
            phone: joi.string().min(10).max(11).required(),
            cpf: joi.string().lenght(11).required(),
            birthday: joi.date().less(),
        })
          
        if (userSchema.validate(req.body) !== true) {
          return res.sendStatus(400);
        } else if (nameList.rows[0]) {
          return res.sendStatus(409);
        } else {
          await connection.query('insert into costumers (name, phone, cpf, birthday) values ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
          res.sendStatus(201);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }