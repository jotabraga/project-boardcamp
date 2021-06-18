import Joi from 'joi';

export default function createCustomers(app, connection) {

    app.post("/customers", async (req, res) => {
      const { name, phone, cpf, birthday } = req.body;
        
      try {

        const cpfList = await connection.query('select * from customers where cpf = $1', [cpf]);
        const userSchema = Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().min(10).max(11).required(),
            cpf: Joi.string().required(),
            birthday: Joi.date().less('now').iso(),
        });
        const verification = userSchema.validate(req.body);
          
        if (verification.error) {
          return res.sendStatus(400);
        } else if (cpfList.rows[0]) {
          return res.sendStatus(409);
        } else {
          await connection.query('insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
          res.sendStatus(201);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }