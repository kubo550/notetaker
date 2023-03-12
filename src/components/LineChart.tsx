import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler, Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


export function LineChart() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };


  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "MAU",
        data: labels.map(() => {
          return Math.random() * 100 + 500;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };


  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl "}>

      <div className="divider mt-2"></div>

      <div className="h-full w-full pb-6 bg-base-100">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}