import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Chart2.css';

const Chart2 = ({ data }) => {
  const chartRef = useRef();
  const [selectedYear, setSelectedYear] = useState('All Years');

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Clear existing SVG
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    if (selectedYear === 'All Years') {
      // Annual temperatures for all years as bar graph
      const x = d3.scaleBand()
        .domain(data.map(d => d.YEAR))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.ANNUAL)])
        .nice()
        .range([height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .text('Years');

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .text('Temperature');

      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.YEAR))
        .attr('y', d => y(d.ANNUAL))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.ANNUAL))
        .attr('fill', 'steelblue')
        .on('mouseover', (event, d) => {
          tooltip.transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(`Year: ${d.YEAR}<br/>Temperature: ${d.ANNUAL}`)
            .style('left', (event.pageX) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
    } else {
      // Specific year with seasonal data
      const yearData = data.find(d => d.YEAR === +selectedYear);
      const periods = ['JAN-FEB', 'MAR-MAY', 'JUN-SEP', 'OCT-DEC'];

      const x = d3.scaleBand()
        .domain(periods)
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(periods, p => yearData[p])])
        .nice()
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .text('Period');

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .text('Temperature');

      svg.selectAll('.bar')
        .data(periods)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d))
        .attr('y', d => y(yearData[d]))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(yearData[d]))
        .attr('fill', 'steelblue')
        .on('mouseover', (event, d) => {
          tooltip.transition()
            .duration(200)
            .style('opacity', .9);
          tooltip.html(`Period: ${d}<br/>Temperature: ${yearData[d]}`)
            .style('left', (event.pageX) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
    }

    return () => {
      tooltip.remove();
    };
  }, [data, selectedYear]);

  const handleFilterChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const uniqueYears = [...new Set(data.map(d => d.YEAR))].filter(year => year !== 0);

  return (
    <div>
      <div>
        <label htmlFor="yearFilter">Filter by Year:</label>
        <select id="yearFilter" value={selectedYear} onChange={handleFilterChange}>
          <option value="All Years">All Years</option>
          {uniqueYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div ref={chartRef}></div>
      <svg width="0" height="0">
        <defs>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Chart2;
