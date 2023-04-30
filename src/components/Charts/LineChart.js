import { Line } from "react-chartjs-2"
import { Chart  as ChartJs} from "chart.js/auto"

function BarChart({ chartData, chartOptions }) {
  return (
    <Line data={chartData} options={chartOptions}/>
  )
}

export default BarChart