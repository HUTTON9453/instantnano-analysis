import * as d3 from 'd3';

type DrawScatter = {
	id: string;
};

var drawScatter = (id) => {
	var svg = d3
		.select(`#${id}`)
		.append('svg')
		  .attr('width', 500)
		  .attr('height', 500)
		.append('h2')
		.text('New Temperature');
	var x = d3.scaleLog().domain([ 10, 100000 ]).range([ 0, 700 ]);
	svg.append('g').attr('transform', 'translate(0,' + 400 + ')').call(d3.axisBottom(x));

	// Add Y axis
	var y = d3.scaleLog().domain([ 10, 100000 ]).range([ 0, 700 ]);
  svg.append('g').call(d3.axisLeft(y));
  return svg;
};

export default drawScatter;
