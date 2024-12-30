import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJwt = (id, first_name, last_name) => {
  const payload = {
    id,
    first_name,
    last_name
  };

  const secret = process.env.SECRET_KEY;
  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
};

class UserController {
  async login(req, res) {

    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(422).json({ message: "Введены некорректные данные" });
      }

      const [findUser, roles] = await Promise.all([
        db("auth").where("login", login).first(),
        db('roles').select()
      ]);
      console.log(findUser);
      const {user_id} = findUser || {};

      if (!user_id) {
        return res.status(404).json({ message: "Нет такого пользователя" });
      }

      const [candidate] = await db("users")
        .select()
        .where({id: user_id});
      console.log(candidate);

      let comparePassword = bcrypt.compareSync(password, findUser.password);

      if (!comparePassword) {
        return res.status(404).json({ message: "Неверный пароль" });
      }

      const token = generateJwt(candidate.id, candidate.first_name, candidate.last_name);
      const user = {
        ...candidate,
        ...findUser
      };

      return res.json({ token, user });

    } catch (error) {
      return res.status(500).json({ message: "Непредвиденная ошибка сервера" });
    }
  }
  async check(req, res) {

    try {
      const { id } = req.user;
      if (id <= 0) {
        return res.status(422).json({ message: "Некорректные данные" });
      }

      const currentUser = await db("users")
        .select()
        .where({id})
        .first();
    
      if (!currentUser) {
        return res.status(400).json({
          message: "Ошибка получения данных об авторизованном пользователе",
        });
      }
      const token = generateJwt(
        currentUser.id,
        currentUser.first_name,
        currentUser.last_name
      );

      return res.json({ token, user: currentUser });
    } catch (error) {
      return res.status(500).json({ message: "Непредвиденная ошибка сервера" });
    }
  }
}

export default new UserController();
