
function optionChanged(idChoosen){
      console.log(idChoosen);
      d3.json("samples.json").then((data) => {
        getDemographicInfo(data, parseInt(idChoosen));
        getSamples(data,idChoosen);
      });
}

function init(){
  console.log("here INIT");

  d3.json("samples.json").then((data) => {
    var idNo = data.names;
    var idName1 = parseInt(data.names[0]);
    var idName2 = data.names[0];
    console.log(idName1);
    var selector = d3.select("#selDataset");
          
    idNo.forEach((id) => {
        selector
            .append("option")
            .text(id)
            .property("value", id);
    });
   
   
    getDemographicInfo(data, idName1);
    getSamples(data,idName2);
   
  });
}

function getDemographicInfo(data, idName1){

   var filteredMetadata = data.metadata.filter(metadata => metadata.id === idName1);
   console.log("filteredMetadata=", filteredMetadata);

   var id = filteredMetadata.map(metadatas => metadatas.id);
   var ethnicity = filteredMetadata.map(metadatas => metadatas.ethnicity);
   var gender = filteredMetadata.map(metadatas => metadatas.gender);
   var age = filteredMetadata.map(metadatas => metadatas.age);
   var location = filteredMetadata.map(metadatas => metadatas.location);
   var bbtype = filteredMetadata.map(metadatas => metadatas.bbtype);
   var wfreq = filteredMetadata.map(metadatas => metadatas.wfreq);

   var demoInfo = d3.select("#sample-metadata"); 
  
   demoInfo.html("");
   var row6 = demoInfo.append("P");
   row6.text("ID: " + id);

   var row0 = demoInfo.append("P");
   row0.text("Ethnicityr: " + ethnicity);

   var row1 = demoInfo.append("P");
   row1.text("Gender: " + gender);

   var row2 = demoInfo.append("P");
   row2.text("Age: " + age);

   var row3 = demoInfo.append("P");
   row3.text("Location: " + location);

   var row4 = demoInfo.append("P");
   row4.text("BBType: " + bbtype);

   var row5 = demoInfo.append("P");
   row5.text("WFreq: " + wfreq);

  
}
// getting "samples" Data for graphing

function getSamples(data, idName2){
  
  console.log("getSamples");
 
  var filteredSamples = data.samples.filter(samples => samples.id === idName2);
  var otuIds = filteredSamples.map(samples => samples.otu_ids);
  var sampleValues = filteredSamples.map(samples => samples.sample_values);
  var otuLabels = filteredSamples.map(samples => samples.otu_labels);
  
  var otuIds10 = otuIds[0].slice(0, 10);
  var sampleValues10 = sampleValues[0].slice(0, 10);
  var otuLabels10 = otuLabels[0].slice(0, 10);
 
  var otuIDs10RevData = otuIds10.reverse();
  var sampleValues10RevData = sampleValues10.reverse();
  var otuLabels10RevData = otuLabels10.reverse();

  var otuIDs10RevDatName = [];
  for (i = 0; i < 10; i++){
    otuIDs10RevDatName[i] = `OTU ${otuIDs10RevData[i]}`;
  }
  
  var trace1 = {
    x: sampleValues10RevData,
    y: otuIDs10RevDatName,
    type: "bar",
    orientation: "h",
    text: otuLabels10RevData

  };
 
  var dataBar = [trace1];
 
  var layout = {
    title: "OTU Values"
  };
 
  Plotly.newPlot("bar", dataBar, layout);

  // bubble chart

  var trace2 = {
    x: otuIDs10RevData,
    y: sampleValues10RevData,
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(164, 89, 240)', 'rgb(232, 226, 65)',  'rgb(232, 65, 182)', 
      'rgb(97, 64, 16)', 'rgb(20, 25, 179)', 'rgb(188, 242, 94)'],
      opacity: [1,1,1,1,1,1,1,1,1,1],
      size: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
    }
  };
  
  var dataBubble = [trace2];
  
  var layout2 = {
    xaxis: {title: {text:'OTU ID'}},
    showlegend: false,
    height: 600,
    width: 1000
  };
  
  
  Plotly.newPlot("bubble", dataBubble, layout2);
}
  
init();
