import React from 'react';
import '../css/countrylist.css';
import {Link} from "react-router-dom";

function CountryListTable(props) {
    let column = null;
    if(props.array.length === 0)
        return column;
    let array = props.array;
    column = array.map((a)=>{
        try {
            return (
                <tr key={a.countryName}>
                    <td>
                        <Link to={`/getcountry/${a.countryName}`}>
                            {a.countryName}
                        </Link>
                    </td>
                </tr>
            )
        } catch(err) {
            console.log('Got a countryName undefined');
        }
        
    });

    return (
        <table className='countryTable'>
            <tbody>
                {column}
            </tbody>
        </table>
    );
}

export default CountryListTable;