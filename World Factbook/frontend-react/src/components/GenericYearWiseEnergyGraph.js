import React from 'react';
import Chart from 'react-google-charts';
import '../css/generic-year-wise-energy-graph.css';


function GenericYearWiseEnergyGraph(props) {
    let year = props.year;
    let dataForMainEnergyGraph = props.dataForMainEnergyGraph;
    let dataForconsumptionBySectorGraph = props.dataForconsumptionBySectorGraph;
    let energy_consumption_graph = null;
    let filteredYearConsumptionData = null;
    if( year === '' || 
        dataForMainEnergyGraph === null || 
        dataForMainEnergyGraph === undefined || 
        dataForMainEnergyGraph.length === 0 || 
        dataForconsumptionBySectorGraph === null ||
        dataForconsumptionBySectorGraph === undefined ||
        dataForconsumptionBySectorGraph.length === 0
        ) {
            return (
                <div>
                    <p>No Data To Show</p>
                </div>
            );
        }
        
    

    try {
        filteredYearConsumptionData = dataForconsumptionBySectorGraph[year];
        //console.log('filteredYearConsumptionData', filteredYearConsumptionData);
        energy_consumption_graph = (
                                <div className='yearWiseConsumptionBySectorChart'>
                                    <div className="energygraphTitle">
                                        Energy Consumption by Sectors
                                    </div>
                                    <div className="energygraphSubtitle">
                                        Energy Consumption by Sectors for {props.year}
                                    </div>

                                    <div className="energyforYear">
                                        <Chart
                                            chartType="PieChart"
                                            loader={<div>Loading Chart</div>}
                                            data={filteredYearConsumptionData}
                                            options={{
                                                width: 600,
                                                height: 400,
                                                // title: `Consumption by sector for year ${year}`,
                                                hAxis: {
                                                    title: 'killo-watt-hour/million units',
                                                    format: 'short',

                                                },
                                                vAxis: {
                                                    title: 'Sector  '
                                                },
                                                fontSize: 14,
                                                legend: { position: 'right'}
                                            }}
                                        />

                                    </div>

                                </div>
        );
    } catch(err) {
        //console.log(err);
        energy_consumption_graph = (
            <div>
                <p>No Data To Show</p>
            </div>
        );
    }


    let finalArray = [];
    let header = ['Year', 'Demand', 'Production', 'Consumption'];
    finalArray.push(header);
    const array = dataForMainEnergyGraph.filter((element)=>{
        return element[0] === year;
    });
    finalArray.push(array[0]);

    console.log('FinalArray', finalArray);

    
    
    return (
        <div className='GenericYearWiseEnergyGraph' style={ {marginLeft : "50px" , marginRight : "50px", paddingLeft: '50px', paddingRight: '50px'}}>
        <div className='row'>
            <div className= 'col-md-6'>
                <div className='yearWiseConsumptionDemandProductionChart'>
                    <div className="energygraphTitle">
                        Energy Graph
                    </div>
                    <div className="energygraphSubtitle">
                        Energy demand, production and consumption for {props.year}
                    </div>

                    <div className="energyforYear">
                        <Chart
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data= {finalArray}
                            options={
                                {
                                    width: 600,
                                    height: 400,
                                    chartArea: {
                                        width: '80%'
                                    },
                                    hAxis: {
                                        title: 'Year'
                                    },
                                    vAxis: {
                                        title: 'killo-watt-hour/million',
                                        format: 'short',
                                        gridlines: {
                                            color: 'lightgrey',
                                            count: 2
                                        }
                                    },
                                    fontSize: 14,
                                    legend: { position: 'bottom'}
                                }
                            }
                            legendToggle
                        />

                    </div>

                </div>
            </div>
            <div className= 'col-md-6'>
                {energy_consumption_graph}
            </div>
        </div>
            
        </div>
        


        
    );
}

export default GenericYearWiseEnergyGraph;