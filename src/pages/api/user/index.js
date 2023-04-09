import { query } from "@/utils/database";

export default async function User(req, res) {
  const { method } = req;

  if (!["GET", "PUT"].includes(method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  switch (method){
    case "GET":
      const user = await getQuery(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    case "PUT":
      const data = req.body;

      await updateQuery(id, data);

      return res.status(200).json({ message: "Success" });
    default:
      return res.status(405).json({ error: "Method not allowed" });
    }
}

async function getQuery(id) {
  const sql = `SELECT u.id, u.username, u.email, u.phone, e.id AS emergency_contact_id, e.username AS emergency_contact_name, 
  e.email AS emergency_contact_email, e.phone AS emergency_contact_phone
  FROM tbl_user u
  LEFT JOIN tbl_emergency_contact e ON u.id = e.user_id
    WHERE u.id = ?`

  const response = await query(sql, [id])

  return response[0][0]
}

async function updateQuery(id, data) {
  const arrayUser = [data.username, data.email, id]
  const arrayEmergencyContact = [data.emergency_contact_name, data.emergency_contact_email, data.emergency_contact_phone, data.emergency_contact_id]

  const sqlUser = "UPDATE tbl_user SET username = ?, email = ? WHERE id = ?"
  const sqlEmergencyContact = "UPDATE tbl_emergency_contact SET username = ?, email = ?, phone = ? WHERE id = ?"

  await query(sqlUser, arrayUser)
  await query(sqlEmergencyContact, arrayEmergencyContact)
}