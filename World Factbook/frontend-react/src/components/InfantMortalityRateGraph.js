import Chart from 'react-google-charts';
import React from 'react';
import '../css/countrydetails.css';

function InfantMortalityRateGraph(props) {
    if(props.details.length === 0) 
        return null;
    
    let finalArray = [];
    let header = ['Sex', 'birth lives per 1000 lives'];
    finalArray.push(header);
    props.details.forEach(element => {
        let array = [];
        array.push(element.sex);
        array.push(element.per_1000_birth_lives);
        finalArray.push(array);
    });
    return (
        <div className="InfantMortalityRateGraph">
            <h3>
                Infant Mortality Rate
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
                                title: 'birth lives per 1000 lives',
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

export default InfantMortalityRateGraph;