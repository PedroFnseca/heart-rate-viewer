import { query } from "../../../utils/database"
import jwt from "jsonwebtoken"

export default async function Login(req, res) {
  // Coleta o tipo de requisição
  const { method } = req
  const { email, password } = req.body

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  } else if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  // Verifica se o usuário existe
  const responseDatabase = await query("SELECT email, username, id, phone FROM tbl_user WHERE email = ? AND password = ?", [email, password])

  const user = responseDatabase[0][0]

  if (!user) {
    res.status(401).json({ error: "Email ou senha inválidos" })
  } else {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    res.setHeader("Token", token)
    res.status(200).json({ message: "Success" })
  }
}
