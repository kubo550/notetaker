import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {

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
        label: "Store 1",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(255, 99, 132, 1)"
      },
      {
        label: "Store 2",
        data: labels.map(() => {
          return Math.random() * 1000 + 500;
        }),
        backgroundColor: "rgba(53, 162, 235, 1)"
      }
    ]
  };

  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl "}>

      <div className="divider mt-2"></div>

      <div className="h-full w-full pb-6 bg-base-100">

        <Bar options={options} data={data} />

      </div>
    </div>

  );
};


