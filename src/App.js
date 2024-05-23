import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Chart from './components/Chart';
import Chart2 from './components/Chart2';
import Chart3 from './components/Chart3';
import NavBar from './components/NavBar';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    d3.csv(process.env.PUBLIC_URL + '/doseData.csv').then(data => {
      data.forEach(d => {
        d['Total Vaccination Doses'] = +d['Total Vaccination Doses'];
        d['Dose 1'] = +d['Dose 1'];
        d['Dose 2'] = +d['Dose 2'];
        d['Population'] = +d['Population'];
      });
      setData(data);
    });

    d3.csv(process.env.PUBLIC_URL + '/Mean_temp.csv').then(data => {
      data.forEach(d => {
        d.YEAR = +d.YEAR;
        d.ANNUAL = +d.ANNUAL;
        d['JAN-FEB'] = +d['JAN-FEB'];
        d['MAR-MAY'] = +d['MAR-MAY'];
        d['JUN-SEP'] = +d['JUN-SEP'];
        d['OCT-DEC'] = +d['OCT-DEC'];
      });
      setTemperatureData(data);
    });

    d3.csv(process.env.PUBLIC_URL + '/propertyData.csv').then(data => {
      data.forEach(d => {
        d.bedroom = +d.bedroom;
        d.price = +d.price;
        d.area = +d.area;
        d.bathroom = +d.bathroom;
      });
      setPropertyData(data);
    });
  }, []);

  const colorMap = {
    'Total Vaccination Doses': '#6baed6',
    'Dose 1': '#fd8d3c',
    'Dose 2': '#74c476'
  };

  return (
    <div className="App">
      <NavBar />
      <AboutMe />
      <div className="content" id="project1">
        <h1>Indian Vaccine Dose Distribution</h1>
        <p>
          This interactive chart visualizes the distribution of vaccine doses across various States and Union Territories (UTs) in India. The data includes total vaccination doses, the number of first doses (Dose 1), the number of second doses (Dose 2), and the population of each State/UT. The chart allows users to filter the data by category to gain insights into the vaccination efforts in different regions.
        </p>
        <div id="filters">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="Total Vaccination Doses">Total Vaccination Doses</option>
            <option value="Dose 1">Dose 1</option>
            <option value="Dose 2">Dose 2</option>
          </select>
          <div className="legend">
            {Object.keys(colorMap).map(key => (
              <div key={key} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: colorMap[key] }}
                ></span>
                {key}
              </div>
            ))}
          </div>
        </div>
        <div id="project1">
          <Chart data={data} selectedCategory={selectedCategory} />
        </div>
        <p>
          <a href={process.env.PUBLIC_URL + '/doseData.csv'} download="doseData.csv" className="download-link">Download CSV Data</a>
        </p>
      </div>
      <div className="content" id="project2">
        <h1>Annual Mean Temperature from 1901 to 2021</h1>
        <p>
          This interactive chart visualizes the annual mean temperatures from 1901 to 2021. The data includes the annual mean temperature as well as the mean temperatures for various seasons.
        </p>
        <div id="project2">
          <Chart2 data={temperatureData} />
        </div>
        <p>
        <a href={process.env.PUBLIC_URL + '/Mean_temp.csv'} download="Mean_temp.csv" className="download-link download-link-move-down">Download CSV Data</a>
        </p>
      </div>
      <div className="content" id="project3">
        <h1>Property Prices in Ahmedabad</h1>
        <p>
          This interactive chart visualizes the property prices in Ahmedabad. The data includes various attributes such as  number of bedrooms, property type, locality, price, area, furnish type, and the number of bathrooms.
        </p>
        <div id="project3">
          <Chart3 data={propertyData} />
        </div>
        <p>
          <a href={process.env.PUBLIC_URL + '/propertyData.csv'} download="propertyData.csv" className="download-link">Download CSV Data</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
