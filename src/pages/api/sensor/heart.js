import { query } from "@/utils/database"

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
  const { sensor_id, user_id } = req.query;

  if (!sensor_id || !user_id) {
    const error = !sensor_id ? "sensor_id" : "user_id";

    return res.status(400).json({ error: `Missing ${error}`});
  }

  const response = await query("SELECT * FROM tbl_heart WHERE sensor_id = ? AND user_id = ?", [sensor_id, user_id]);

  const data = response[0]

  if (data.length === 0) {
    return res.status(404).json({ error: "No data found" });
  }

  return res.status(200).json(data);
}

async function post(req, res) {
  const { sensor_id, rate, user_id } = req.query;

  if (!sensor_id || !rate || !user_id) {
    const error = !sensor_id ? "sensor_id" : !rate ? "rate" : "user_id";

    return res.status(400).json({ error: `Missing ${error}`});
  }

  await query("INSERT INTO tbl_heart (sensor_id, rate, user_id) VALUES (?, ?, ?)", [sensor_id, rate, user_id]);

  return res.status(200).json({ message: "Success" });
}