function getQueryParams(qs) {
  qs = qs.split("+").join(" ");

  var params = {}, tokens,
  re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])]
    = decodeURIComponent(tokens[2]);
  }

  return params;
}

function drawRadar(params) {
  var w = 500,
      h = 500;
  var colorscale = d3.scale.category10();
  
  //Legend titles
  
  //var params = getQueryParams(document.location.search);
  var LegendOptions = [params.name];
  
  //Data
  var d = [
            [
              {axis:"Market Risk",value:KanbanRiskRadarChart.riskTranslations["Market Risk"][params.market_risk]},
              {axis:"Product Lifecycle",value:KanbanRiskRadarChart.riskTranslations["Product Lifecycle"][params.product_lifecycle]},
              {axis:"Delay Impact",value:KanbanRiskRadarChart.riskTranslations["Delay Impact"][params.delay_impact]},
              {axis:"Technical Difficulty",value:KanbanRiskRadarChart.riskTranslations["Technical Difficulty"][params.technical_difficulty]},
              {axis:"Cost of Delay",value:KanbanRiskRadarChart.riskTranslations["Cost of Delay"][params.cost_of_delay]}
            ]
          ];
  
  //Options for the Radar chart, other than default
  var mycfg = {
    w: w,
    h: h,
    maxValue: 1,
    levels: 4,
    ExtraWidthX: 300
  }
  
  //Call function to draw the Radar chart
  //Will expect that data is in %'s
  
  chart = new KanbanRiskRadarChart();
  chart.draw("#chart", d, mycfg);
  
  ////////////////////////////////////////////
  /////////// Initiate legend ////////////////
  ////////////////////////////////////////////
  
  var svg = d3.select('#body')
      .selectAll('svg')
      .append('svg')
      .attr("width", w+300)
      .attr("height", h)
  
  //Create the title for the legend
  var text = svg.append("text")
      .attr("class", "title")
      .attr('transform', 'translate(90,0)') 
      .attr("x", w - 70)
      .attr("y", 10)
      .attr("font-size", "12px")
      .attr("font-family", "sans-serif")
      .attr("fill", "#404040")
      .text("Kanban Risk Assessment");
          
  //Initiate Legend    
  var legend = svg.append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 200)
      .attr('transform', 'translate(90,20)') 
      ;
      //Create colour squares
      legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function(d, i){ return i * 20;})
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function(d, i){ return colorscale(i);})
        ;
      //Create text next to squares
      legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function(d, i){ return i * 20 + 9;})
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(function(d) { return d; })
        ;
  var el = window.document.querySelector("#chart");
  return el;
}

params = { name: 'Detached Resourcesa',
          market_risk: 'Spoiler',
          product_lifecycle: 'Mid',
          delay_impact: 'Discoverable',
          technical_difficulty: 'Done it before',
          cost_of_delay: 'Standard' }
drawRadar(params);
