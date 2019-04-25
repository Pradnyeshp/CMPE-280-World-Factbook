import React, {Component} from 'react';

class GeoGraphComponent extends Component{

    constructor(props) {
        super(props);
        this.state = ({
            country : this.props.country,
            displayArray : this.props.graphArray
        })
    }


    render() {

        console.log(this.state);

        return(
            <div>

            </div>
        )

    }


}

export default GeoGraphComponent ;