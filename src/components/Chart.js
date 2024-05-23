import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data, selectedCategory }) => {
  const svgRef = useRef();
  const svgWidth = 1000; 
  const svgHeight = 600; 
  const margin = { top: 30, right: 40, bottom: 180, left: 150 }; 
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); 

    const subgroups = ['Total Vaccination Doses', 'Dose 1', 'Dose 2'];
    const groups = data.map(d => d['State/UTs']);

    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.3]); 

    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.1]); 
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[selectedCategory === 'All Categories' ? 'Total Vaccination Doses' : selectedCategory])])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#6baed6', '#fd8d3c', '#74c476']);

    const yAxis = d3.axisLeft(y);

    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    yAxisGroup.call(yAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const barGroups = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${x(d['State/UTs'])},0)`);

    const rects = barGroups.selectAll('rect')
      .data(d => subgroups.map(key => ({ key, value: d[key], state: d['State/UTs'] })))
      .enter().append('rect')
      .attr('x', d => xSubgroup(d.key))
      .attr('width', xSubgroup.bandwidth())
      .attr('fill', d => color(d.key))
      .attr('y', height)
      .attr('height', 0)
      .on('mouseover', (event, d) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(
          `State: ${d.state}<br/>Category: ${d.key}<br/>Value: ${d.value}`
        )
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    rects.transition()
      .duration(750)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value));

    if (selectedCategory !== 'All Categories') {
      barGroups.selectAll('rect')
        .attr('opacity', d => d.key === selectedCategory ? 1 : 0.2);
    } else {
      barGroups.selectAll('rect')
        .attr('opacity', 1);
    }

    // Update Y-axis on category change
    y.domain([0, d3.max(data, d => d[selectedCategory === 'All Categories' ? 'Total Vaccination Doses' : selectedCategory])]).nice();
    yAxisGroup.transition().duration(750).call(yAxis);

    return () => {
      tooltip.remove();
    };
  }, [data, selectedCategory, height, margin.left, margin.top, width]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>;
};

export default Chart;
