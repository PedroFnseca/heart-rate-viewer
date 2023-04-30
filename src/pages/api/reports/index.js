import { query } from "@/utils/database"

export default async function Reports(req, res) {
  let { startDate, endDate, hrRangeMin, userId } = req.body;

  if(!startDate) {
    res.status(400).json({ error: "Informe a data de início" });
    return;
  }
  startDate = new Date(startDate);

  !endDate ? endDate = new Date() : endDate = new Date(endDate);

  const sql = "SELECT * FROM tbl_heart WHERE rate > ? AND datetime >= ? AND datetime <= ? AND user_id = ? ORDER BY datetime ASC"

  const response = await query(sql, [hrRangeMin, formatJSDateTOSQLDate(startDate, 1), formatJSDateTOSQLDate(endDate, 2), userId]);

  const formattedResponse = formatJSONfromSQL(response[0]);

  res.status(200).json(formattedResponse);
}

function formatJSDateTOSQLDate(date, index) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

function formateDatetimeToNormalDate(datetime) {
  // recebe datetime no formato de js
  // e deve retornar no formato dd/mm/yyyy hh:mm:ss

  const date = new Date(datetime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function formatJSONfromSQL(data) {
  return data.map(item => {
    const dateFormated = formateDatetimeToNormalDate(item.datetime.toString());

    return {
      "data hora": dateFormated,
      "BPM": item.rate
    }
  })
}