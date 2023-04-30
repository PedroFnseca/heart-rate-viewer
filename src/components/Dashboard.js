
import { useState, useEffect } from "react"
import LineChart from "./Charts/LineChart"
import { decodeJWT } from "@/utils/JWT"

export default function Dashboard() {
  const token = sessionStorage.getItem("token");
  const id = decodeJWT(token).id;

  const [heartData, setHeartData] = useState({
    labels: [],
    datasets: [
      {
        label: "BPM",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 4,
        tension: 0.5
      }
    ]
  })

  const [options, setOptions] = useState({
    scales: {
      y: {
        min: 0,
        max: 250,
        ticks: {
          stepSize: 10
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: "Carregando...",
        font: { size: 16 }
      },
      subtitle: {
        display: true,
        text: "Carregando..."
      }
    }
  })

  async function getHeartRate () {
    const response = await fetch(`/api/sensor/heart?user_id=${id}&limit=15&sensor_id=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json()

    setHeartData({
      labels: data.map((data) => {
        // tranformar do formato YYYY-MMM-DDTHH:MM:SS:000Z para somente HH:MM:SS
        const date = data.datetime.split("T")[1].split(".")[0]

        return date
      }),
      datasets: [
        {
          label: "BPM",
          data: data.map((data) => data.rate),
          backgroundColor: "rgba(255, 99, 132, 1)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 4,
          tension: 0.5
        }
      ]
    })

    setOptions({
      scales: {
        y: {
          min: 0,
          max: 220,
          ticks: {
            stepSize: 10
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Batimentos cardiacos por minuto (BPM)",
          font: { size: 16 }
        },
        subtitle: {
          display: true,
          text: "Últimos 15 registros"
        }
      }
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getHeartRate();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[75%] h-full bg-white rounded-lg">
        <LineChart chartData={heartData} chartOptions={options}/>
      </div>
    </div>
  )
}