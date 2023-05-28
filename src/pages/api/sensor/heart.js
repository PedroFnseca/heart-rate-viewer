import { query } from "@/utils/database"
import { sendWarningMail } from "@/utils/sendmail"

export default async function handlerSensorHeart(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      return get(req, res);
    case "POST":
      return post(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}

async function get(req, res) {
  let { sensor_id, user_id } = req.query;
  let { limit } = req.query;

  if (!sensor_id || !user_id) {
    const error = !sensor_id ? "sensor_id" : "user_id";

    return res.status(400).json({ error: `Missing ${error}`});
  }

  const response = await query(`SELECT * FROM tbl_heart WHERE sensor_id = ? AND user_id = ? ORDER BY datetime DESC LIMIT ${limit}`, [sensor_id, user_id]);

  const data = response[0]

  if (data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

async function post(req, res) {
  const { sensor_id, rate, user_id } = req.body;

  if (!sensor_id || !rate || !user_id) {
    const error = !sensor_id ? "sensor_id" : !rate ? "rate" : "user_id";

    return res.status(400).json({ error: `Missing ${error}`});
  }

  verifyWarning(user_id, rate)

  await query("INSERT INTO tbl_heart (sensor_id, rate, user_id) VALUES (?, ?, ?)", [sensor_id, rate, user_id]);

  return res.status(200).json({ message: "Success" });
}

async function verifyWarning(user_id, rate) {
  const responseUser = await query("SELECT * FROM tbl_user WHERE id = ?", [user_id]);
  const user = responseUser[0][0]

  if (user.warningheart > rate) return

  const responseContact = await query("SELECT * FROM tbl_emergency_contact WHERE user_id = ?", [user_id]);
  const contact = responseContact[0][0]

  sendWarningMail(contact.email, contact.username, user.username)
}