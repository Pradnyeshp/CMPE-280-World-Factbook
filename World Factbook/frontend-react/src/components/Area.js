import React, {Component} from 'react';
import Navbar from "./Navbar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, PieChart, Pie } from 'recharts';


class Area extends Component {

    constructor() {
        super();
    }

    render() {

        let data = [
            {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "uv": 3000,
                "pv": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "uv": 2000,
                "pv": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "uv": 2780,
                "pv": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "uv": 1890,
                "pv": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "uv": 2390,
                "pv": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "uv": 3490,
                "pv": 4300,
                "amt": 2100
            }
        ]

        const data01 = [
            {
                "name": "Group A",
                "value": 400
            },
            {
                "name": "Group B",
                "value": 300
            },
            {
                "name": "Group C",
                "value": 300
            },
            {
                "name": "Group D",
                "value": 200
            },
            {
                "name": "Group E",
                "value": 278
            },
            {
                "name": "Group F",
                "value": 189
            }
        ];

        const data02 = [
            {
                "name": "Group A",
                "value": 2400
            },
            {
                "name": "Group B",
                "value": 4567
            },
            {
                "name": "Group C",
                "value": 1398
            },
            {
                "name": "Group D",
                "value": 9800
            },
            {
                "name": "Group E",
                "value": 3908
            },
            {
                "name": "Group F",
                "value": 4800
            }
        ];

        return(
            <div>
                <Navbar/>
                <br/>
                <br/>
                <div className="container small">
                    <h1>Area Page</h1>
                    <br/>
                    <br/>
                    <br/>
                    <LineChart width={730} height={250} data={data}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                    </LineChart>
                    <br/>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                    <br/>
                    <PieChart width={730} height={250}>
                        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                        <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                    </PieChart>
                </div>

            </div>
        )
    }
}

export default Area;
