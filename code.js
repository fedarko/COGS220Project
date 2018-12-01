// URL: https://beta.observablehq.com/d/a622c917118d5e61
// Title: COGS 220 EventDrops Demo
// Based on https://beta.observablehq.com/@mbostock/hello-eventdrops
// and https://github.com/marmelab/EventDrops/blob/fc0d8ca4001156ddfc5738133b53bf479ffb190f/demo/demo.js


var tooltip = d3
  .select('body')
  .append('div')
  .classed('tooltip', true)
  .style('opacity', 0)
  .style('pointer-events', 'auto');

function makeTooltip(e) {
  tooltip.html(
    `
    <div class="content">
      ${e.date.toString().substring(17, 21)}
    </div>
    `
  ).style('left', `${d3.event.pageX - 30}px`).style('top', `${d3.event.pageY + 20}px`);
  // Make the tooltip visible
  tooltip.transition().duration(200).style("opacity", 1).style("pointer-events", "auto");
}

function rmTooltip(e) {
  // Make the tooltip invisible
  tooltip.transition().duration(500).style("opacity", 0).style("pointer-events", "none");
}

function getRandomNoise(){
  return randn_bm(4*3600);
}

function addJittering(d){
  var dates = [new Date('10/02/2017 8:00:00 AM'), new Date('10/03/2017 8:00:00 AM'), new Date('10/04/2017 8:00:00 AM')
           ,new Date('10/05/2017 8:00:00 AM'),new Date('10/06/2017 8:00:00 AM'),new Date('10/07/2017 8:00:00 AM'),
           new Date('10/08/2017 8:00:00 AM')];
  var noise = getRandomNoise();
  var temp = dates[d];
  temp.setSeconds(temp.getSeconds() + noise);
  return temp;
}

function objLength(obj) {
  return Object.keys(obj).length - 1;
}

function unifyStuff(hist) {

   var outputData = [];
   for (var t = 0; t < hist.length; t++) {
     //console.log(t);
     //console.log("T " + hist[t]);
     var dates = [];
     for (var d = 0; d < objLength(hist[t]); d++) {
       //console.log("D" + hist[t][d]);
       for (var multiplicity = 0; multiplicity < parseInt(hist[t][d]); multiplicity++) {
         //console.log("M " + multiplicity);
         dates.push({date: addJittering(d)});
        }
      }
     var dataInstance = {name: t.toString(), data: dates};
     outputData.push(dataInstance);
   }
   return outputData;
}

function randn_bm(scaleFactor) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(scaleFactor); // resample between 0 and 1
    num = num - 0.5;
    num = num * 2 * scaleFactor;
    return num;
}

function replicateTweetsZoom(e) {
    console.log(tweetsChart.scale().domain());
}

function replicateNewsZoom(e) {
    console.log(e);
}

const tweetsHistCSV = ",0,1,2,3,4,5,6\n0,11.0,28.0,24.0,37.0,27,33.0,59.0\n1,24.0,23.0,14.0,17.0,23,11.0,35.0\n2,27.0,21.0,38.0,19.0,25,27.0,67.0\n3,26.0,15.0,38.0,19.0,37,26.0,86.0\n4,13.0,19.0,22.0,14.0,22,14.0,25.0\n5,26.0,31.0,30.0,13.0,25,29.0,77.0\n6,26.0,30.0,40.0,31.0,32,41.0,74.0\n7,11.0,27.0,23.0,26.0,26,49.0,65.0\n8,3.0,2.0,6.0,,1,3.0,164.0\n9,13.0,24.0,29.0,8.0,13,11.0,32.0\n10,25.0,8.0,34.0,18.0,10,6.0,25.0\n11,13.0,23.0,35.0,26.0,27,29.0,65.0\n12,,,,33.0,58,,\n13,22.0,27.0,27.0,32.0,34,32.0,58.0\n14,15.0,21.0,34.0,14.0,28,32.0,44.0\n15,17.0,25.0,31.0,35.0,25,30.0,46.0\n16,11.0,16.0,45.0,19.0,31,29.0,40.0\n17,11.0,22.0,35.0,21.0,51,34.0,75.0\n18,8.0,7.0,10.0,9.0,30,26.0,26.0\n19,4.0,12.0,40.0,23.0,16,39.0,27.0\n20,1.0,6.0,5.0,6.0,1,1.0,5.0\n21,15.0,30.0,33.0,26.0,38,36.0,57.0\n22,55.0,38.0,18.0,16.0,11,11.0,19.0\n23,30.0,18.0,19.0,17.0,29,18.0,64.0\n24,28.0,21.0,41.0,35.0,42,35.0,89.0";
var tweetsHist = d3.csvParse(tweetsHistCSV);

const newsHistCSV = ",0,1,2,3,4,5,6\n0,510,656,615,652,641,378,466\n1,340,540,587,666,442,202,212\n2,526,562,659,694,633,593,401\n3,655,600,532,572,675,511,564\n4,333,284,399,390,506,458,349\n5,456,533,466,609,526,74,111\n6,451,542,607,675,645,342,371\n7,452,513,428,324,390,253,255\n8,554,439,309,448,356,190,505\n9,369,403,540,397,394,275,290\n10,1355,1081,661,487,326,194,157\n11,424,667,500,583,560,251,380\n12,372,496,478,559,513,415,488\n13,156,170,124,187,117,53,69\n14,626,763,571,558,553,160,161\n15,280,422,300,325,219,59,102\n16,204,297,287,340,276,156,155\n17,372,399,524,529,463,250,242\n18,215,239,194,234,307,296,330\n19,393,381,235,354,339,344,368\n20,245,233,267,252,390,314,297\n21,96,190,159,154,150,37,9\n22,551,679,547,673,510,305,393\n23,275,337,356,398,456,236,370\n24,482,482,543,569,580,347,159";
var newsHist = d3.csvParse(newsHistCSV);

var tweetsConfig = {
  range: {
    start: new Date('10/01/2017 6:55:11 PM'),
    end: new Date('10/09/2017 7:15:11 PM')
  },
  //metaballs: {
  //  blurDeviation: 25
  //},
  drop: {
    date: d => d.date,
    onMouseOver: makeTooltip,
    onMouseOut: rmTooltip
  },
  zoom: {
    onZoom: replicateTweetsZoom
  }
};

var newsConfig = {
  range: {
    start: new Date('10/01/2017 6:55:11 PM'),
    end: new Date('10/09/2017 7:15:11 PM')
  },
  //metaballs: {
  //  blurDeviation: 25
  //},
  drop: {
    date: d => d.date,
    onMouseOver: makeTooltip,
    onMouseOut: rmTooltip
  },
  zoom: {
    onZoom: replicateNewsZoom
  }
};

var tweetsChart = eventDrops(tweetsConfig);
var newsChart = eventDrops(newsConfig);
var tweetsData = unifyStuff(tweetsHist);
var newsData = unifyStuff(newsHist);

d3.select("#tweetsChart").datum(tweetsData).call(tweetsChart);
d3.select("#newsChart").datum(newsData).call(newsChart);
