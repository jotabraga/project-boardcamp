import Joi from 'joi';

export default function updateCustomers(app, connection) {

    app.put("/customers/:id", async (req, res) => {

      const { id } = req.params;
      const { name, phone, cpf, birthday } = req.body;
        
      try {      

        const userSchema = Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().min(10).max(11).required(),
            cpf: Joi.string().required(),
            birthday: Joi.date().less('now').iso(),
        });
        const verification = userSchema.validate(req.body);
          
        if (verification.error) {
          return res.sendStatus(400);
        } else {
          const sql = 'update customers set name = $1, phone = $2, cpf = $3, birthday = $4 where id = $5';  
          await connection.query(sql, [name, phone, cpf, birthday, id]);
          res.sendStatus(200);
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    });
  }