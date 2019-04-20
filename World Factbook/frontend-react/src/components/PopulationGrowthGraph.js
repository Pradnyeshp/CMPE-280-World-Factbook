import React, {Component} from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { Chart } from "react-google-charts";

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

        //change port to 3001
        let url = `http://localhost:4040/population/${this.state.country}` ;

        axios.get(url)
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

                        {/*Recharts*/}

                        {/*<BarChart width={550} height={250} data={populationArray}>*/}
                        {/*    <CartesianGrid strokeDasharray="1 1" />*/}
                        {/*    <XAxis dataKey="yearRange" />*/}
                        {/*    <YAxis dataKey="value"/>*/}
                        {/*    <Tooltip />*/}
                        {/*    <Legend />*/}
                        {/*    <Bar dataKey="value" fill="#8884d8" />*/}
                        {/*</BarChart>*/}


                        {/*Google chart*/}

                        <Chart
                            width={'700px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data = {graphArray}
                            // data={[
                            //     ['Year', 'Sales', 'Expenses', 'Profit'],
                            //     ['2014', 1000, 400, 200],
                            //     ['2015', 1170, 460, 250],
                            //     ['2016', 660, 1120, 300],
                            //     ['2017', 1030, 540, 350],
                            // ]}
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
