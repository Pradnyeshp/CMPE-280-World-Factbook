import Chart from 'react-google-charts';
import React from 'react';
import '../css/countrydetails.css';

function UnemploymentRateGraph(props) {
    if(props.details.length === 0) 
        return null;
    
    let finalArray = [];
    let header = ['Sex', 'Percentage'];
    finalArray.push(header);
    props.details.forEach(element => {
        let array = [];
        array.push(element.sex);
        array.push(element.percentage);
        finalArray.push(array);
    });
    return (
        <div className="UnemploymentRateGraph">
            <h3>
                Unemployment Rate
            </h3>
            <Chart
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data= {finalArray}
                    options={
                        {
                            width: 500,
                            height: 290,
                            hAxis: {
                                title: 'Sex'
                            },
                            vAxis: {
                                title: 'Percentage',
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
    );
}

export default UnemploymentRateGraph;