import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const App = () => {
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sample Data',
        data: [],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  });

  useEffect(() => {
    fetchDataFromGoogleSheets();
  }, []);

  const fetchDataFromGoogleSheets = async () => {
    const SHEET_ID = '1DJ3oq6pRXbnt_yCfCwgWoDsUCYu-UVuc_UppNsQ3jZs';  
    const API_KEY = 'AIzaSyDfp9sC09FVbpFLKO9iW65VPneEPvIyIHU';  
    const range = 'Sheet1!A1:B5'; 

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data.values || [];

      const labels = data.map(row => row[0] || '');  
      const values = data.map(row => row[1] || 0);   

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Sample Data',
            data: values,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
    }
  };

  return (
    <div className="App">
      <Sidebar onChartSelect={setChartType} />
      <div className="chart-container">
        {chartType === 'bar' && <Bar data={chartData} />}
        {chartType === 'doughnut' && <Doughnut data={chartData} />}
        {chartType === 'line' && <Line data={chartData} />}
        {chartType === 'pie' && <Pie data={chartData} />}
      </div>
    </div>
  );
};

export default App;
