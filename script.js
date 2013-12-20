var w = 500,
    h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Attachable Resources'];

var RiskTranslations = {
  "Market Risk": {
    "Table Stakes": 0.25,
    "Cost Reducer": 0.5,
    "Spoiler": 0.75,
    "Differentiator": 1
  },
  "Product Lifecycle": {
    "New": 1,
    "Mid": 0.66,
    "Cash Cow": 0.33
  },
  "Delay Impact": {
    "Extinction Level Event": 1,
    "Major Capital Expense": 0.75,
    "Discoverable": 0.5,
    "Intangible": 0.25
  },
  "Technical Difficulty": {
    "Unknown Solution": 1,
    "Solved, but not by us": 0.75,
    "Done it before": 0.5,
    "Commodity": 0.25
  },
  "Cost of Delay": {
    "Expedite": 1,
    "Fixed Date": 0.75,
    "Standard": 0.5,
    "Intangible": 0.25
  }
}; 

//Data
var d = [
          [
            {axis:"Market Risk",value:RiskTranslations["Market Risk"]["Table Stakes"]},
            {axis:"Product Lifecycle",value:RiskTranslations["Product Lifecycle"]["Cash Cow"]},
            {axis:"Delay Impact",value:RiskTranslations["Delay Impact"]["Discoverable"]},
            {axis:"Technical Difficulty",value:RiskTranslations["Technical Difficulty"]["Done it before"]},
            {axis:"Cost of Delay",value:RiskTranslations["Cost of Delay"]["Standard"]}
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
    .attr("fill", "#404040")
    .text("What % of owners use a specific service in a week");
        
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
