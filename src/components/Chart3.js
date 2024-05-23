import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './Chart3.css';

const Chart3 = ({ data }) => {
  const svgRef = useRef();
  const svgWidth = 1000;
  const svgHeight = 600;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const [bedroomsFilter, setBedroomsFilter] = useState('All');
  const [bathroomsFilter, setBathroomsFilter] = useState('All');

  const filteredData = data.filter(d =>
    (bedroomsFilter === 'All' || d.bedroom === +bedroomsFilter) &&
    (bathroomsFilter === 'All' || d.bathroom === +bathroomsFilter)
  );

  useEffect(() => {
    if (filteredData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const x = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d.area)).nice()
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d.price)).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g => g.append('text')
        .attr('x', width - margin.right)
        .attr('y', -4)
        .attr('fill', '#000')
        .attr('text-anchor', 'end')
        .text('Area (sq ft)'));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(height / 40).tickSizeOuter(0))
      .call(g => g.append('text')
        .attr('x', 4)
        .attr('y', margin.top)
        .attr('fill', '#000')
        .attr('text-anchor', 'start')
        .text('Price (INR)'));

    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
      .domain(d3.extent(filteredData, d => d.price).reverse());

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    const dots = svg.append('g')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(filteredData)
      .join('circle')
      .attr('cx', d => x(d.area))
      .attr('cy', d => y(d.price))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.price))
      .attr('class', 'dot')
      .on('mouseover', (event, d) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`
          Price: ${d.price}<br/>
          Area: ${d.area}<br/>
          Bedrooms: ${d.bedroom}<br/>
          Bathrooms: ${d.bathroom}<br/>
          Property Type: ${d.property_type}<br/>
          Locality: ${d.locality}<br/>
          Furnish Type: ${d.furnish_type}
        `)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    dots.transition()
      .duration(1000)
      .attr('cx', d => x(d.area))
      .attr('cy', d => y(d.price))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.price));

    return () => {
      tooltip.remove();
    };
  }, [filteredData, height, margin.bottom, margin.left, margin.right, margin.top, width]);

  const bedroomsOptions = [...new Set(data.map(d => d.bedroom).filter(b => b !== 0))];
  const bathroomsOptions = [...new Set(data.map(d => d.bathroom).filter(b => b !== 0))];

  return (
    <div>
      <div className="filters">
        <label>
          Bedrooms:
          <select id='bedrooms' value={bedroomsFilter} onChange={e => setBedroomsFilter(e.target.value)}>
            <option value="All">All</option>
            {bedroomsOptions.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
        <label>
          Bathrooms:
          <select id='bathrooms' value={bathroomsFilter} onChange={e => setBathroomsFilter(e.target.value)}>
            <option value="All">All</option>
            {bathroomsOptions.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>
    </div>
  );
};

export default Chart3;
