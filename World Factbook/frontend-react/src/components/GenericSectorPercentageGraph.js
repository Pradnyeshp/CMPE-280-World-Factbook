import Chart from 'react-google-charts';
import React from 'react';
import '../css/countrydetails.css';


function GenericSectorPercentageGraph(props) {
    if(props.details.length === 0) 
        return null;
    
    let finalArray = [];
    let header = ['Sector', 'Percentage'];
    finalArray.push(header);
    props.details.forEach(element => {
        let array = [];
        array.push(element.sector);
        array.push(element.percentage);
        finalArray.push(array);
    });
    return (
        <div className="GenericSectorPercentageGraph">
            <div id={props.id}>
                <h3>
                    {props.heading}
                </h3>
                <Chart
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={finalArray}
                    options={{
                        width: 500,
                        height: 290,
                        chartArea: {
                            top: '20',
                            left: '30'
                        },
                        legend: {position: 'bottom'},
                        fontSize: 14
                    }}
                />
            </div>
            
        </div>
    );
}

export default GenericSectorPercentageGraph;
