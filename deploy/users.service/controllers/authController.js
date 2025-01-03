import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

export class AuthController {

  generateJwt = (id, first_name, last_name) => {
    const payload = {
      id,
      first_name,
      last_name,
  };

  const secret = process.env.SECRET_KEY;
  const options = {
      expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
  }

  async login(req, reply) {

      try {
          const { login, password } = req.body || {};

          if (!login || !password) {
              return reply
                  .status(422)
                  .send({ message: "Введены некорректные данные" });
          }

          const [findUser, roles] = await Promise.all([
              db("auth").where("login", login).first(),
              db("roles").select(),
          ]);

          const { user_id } = findUser || {};

          if (!user_id) {
              return reply
                  .status(404)
                  .send({ message: "Нет такого пользователя" });
          }

          const [candidate] = await db("users")
              .select()
              .where({ id: user_id });

          const comparePassword = bcrypt.compareSync(
              password,
              findUser.password
          );

          if (!comparePassword) {
              return reply.status(404).send({ message: "Неверный пароль" });
          }

          const token = this.generateJwt(
              candidate.id,
              candidate.first_name,
              candidate.last_name
          );
          const user = {
              ...candidate,
              ...findUser,
          };

          return reply.send({ token, user });
      } catch (error) {
          console.error(error);
          return reply
              .status(500)
              .send({ message: "Непредвиденная ошибка сервера" });
      }
  }

  async check(req, reply) {
      try {
          const { id } = req.user;
          if (id <= 0) {
              return reply
                  .status(422)
                  .send({ message: "Некорректные данные" });
          }

          const currentUser = await db("users")
              .select()
              .where({ id })
              .first();

          if (!currentUser) {
              return reply.status(400).send({
                  message:
                      "Ошибка получения данных об авторизованном пользователе",
              });
          }

          const token = this.generateJwt(
              currentUser.id,
              currentUser.first_name,
              currentUser.last_name
          );

          return reply.send({ token, user: currentUser });
      } catch (error) {
          console.error(error);
          return reply
              .status(500)
              .send({ message: "Непредвиденная ошибка сервера" });
      }
  }
}