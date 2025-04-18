import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { title } from "process";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Sun", "Mon", "Tue", "Thu", "Fri", "Sat"],
  datasets: [
    {
        label : "Weekly statistics",
      data: [4000, 3000, 2000, 2780, 1890, 2390],
      backgroundColor: "#6F00EA",
      borderWidth: 0, // Remove the border
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  title : {
    display : true,
    text : "Weekly Statistics"
  },
  scales: {
    y: {
      beginAtZero: true, // Start Y-axis from 0
      ticks: {
        stepSize: 1000, // Set Y-axis steps to 1000, 2000, 3000, etc.
      },
    },
  },
};

export default function SimpleBarChart() {
  return <Bar data={data}  />;
}