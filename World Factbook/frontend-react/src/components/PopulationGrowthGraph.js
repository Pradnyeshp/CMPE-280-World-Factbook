import React, {Component} from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import url from '../url.js';

class PopulationGrowthGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            country : "india" ,
            populationArray : []
        }
    }

    componentWillMount() {

        console.log("country props : " , this.props.country) ;

        
        let api = url+`/population/${this.state.country}` ;

        axios.get(api)
            .then(response =>{
                console.log("Response from server : ", response.data) ;
                this.setState({
                    populationArray : response.data.data
                })
            }
        )

    }

    render() {

        let populationArray = this.state.populationArray ;
        populationArray.sort((a,b) => {
            let year1 = a.yearRange.split('-') ;
            let year2 = b.yearRange.split('-') ;

            return year1[0] - year2[0] ;
        });

        let graphArray = [] ;
        let header = ['Year Range', 'value'] ;
        graphArray.push(header) ;
        let startYear = 0;
        let endYear = 0;
        let limit = populationArray.length-(populationArray.length/2);
        for(let i=0;i<limit;i++) {
            let temp = [] ;
            let row = populationArray[i];
            if(i===1)
                startYear = row.yearRange.split('-')[0];
            if(i===limit-1)
                endYear = row.yearRange.split('-')[1];
            temp.push(row.yearRange) ;
            temp.push(row.value) ;
            graphArray.push(temp) ;
        }

        //
        console.log(startYear) ;
        console.log(endYear) ;

        return(
            <div>
                {/*<Navbar/>*/}
                <div className="container">
                    {/*<h1 className='graph'>Population Page</h1>*/}
                    {/*<br/>*/}
                    {/*<h3>Population growth trend</h3>*/}
                    <br/>
                    <div className='graph'>


                        {/*Google chart*/}

                        <Chart
                            width={'700px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data = {graphArray}
                            options={{
                                // Material design options
                                chart: {
                                    title: 'Population Growth ',
                                    subtitle: 'Year { ' + startYear + ' - ' + endYear + ' }'
                                    // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                                },
                                chartArea: { right: 80}
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}

export default PopulationGrowthGraph;
