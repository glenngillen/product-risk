var KanbanRiskRadarChart = RadarChart;
KanbanRiskRadarChart.riskTranslations = {
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

KanbanRiskRadarChart.prototype.labelSegments = function(g, data, radius, format, cfg) {
  //Text indicating at what % each level is
  var segmentPoints = [];
  for(var key in KanbanRiskRadarChart.riskTranslations) {
    for(var point in KanbanRiskRadarChart.riskTranslations[key]) {
      segmentPoints.push(key + ':' + point);
    };
  };
    
    //for(var j=0; j<cfg.levels; j++){
      g.selectAll(".levels")
       .data(segmentPoints)
       .enter()
       .append("svg:text")
       .attr("x", function(d){
         var total = 5;
         var parts = d.split(":", 2);
         var val = KanbanRiskRadarChart.riskTranslations[parts[0]][parts[1]];
         var i = Object.keys(KanbanRiskRadarChart.riskTranslations).indexOf(parts[0]);
         var x = cfg.w/2*(1-(Math.max(val, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
         return x;
       })
       .attr("y", function(d){
         var total = 5;
         var parts = d.split(":", 2);
         var val = KanbanRiskRadarChart.riskTranslations[parts[0]][parts[1]];
         var i = Object.keys(KanbanRiskRadarChart.riskTranslations).indexOf(parts[0]);
         var y = cfg.h/2*(1-(Math.max(val, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
         return y;
       })
       .attr("class", "legend")
       .style("font-family", "sans-serif")
       .style("font-size", "10px")
       //.attr("transform", "translate(" + (cfg.w/2-1 + cfg.ToRight) + ", " + (cfg.h/2-1) + ")")
       .attr("fill", "#737373")
       .text(function(d) { 
         var parts = d.split(":", 2);
         return parts[1]; });
    //}
}
