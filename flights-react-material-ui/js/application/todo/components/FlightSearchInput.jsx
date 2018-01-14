'use strict';

import React from 'react';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import uuid from 'uuid';
import { isFunction, trim } from 'lodash';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

const styles = {
    block: {
      maxWidth: 250,
    },
    radioButton: {
      marginBottom: 16,
    },
    form:{
        marginBottom: 16,
    }
  };

  
class FlightSearchInput extends React.Component {
    constructor(props) {
       super(props);
       this.searchFlights = this.searchFlights.bind(this);
       
       this.setAvailableFlights = this.setAvailableFlights.bind(this);

        this.state = {fieldSelected: '', value: '', availableFlights: []};
        
        
    }

    setAvailableFlights(availableFlights){
        alert("setAvailableFlights. availableFlights: "+availableFlights);
        this.setState({availableFlights: availableFlights})
    }
    //Search flights by making a rest call
    searchFlights() {
        alert("Searching Flights. this: "+this);
        // availableFlights = tableData;
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
          };
        axios.get('http://localhost:8090/flights',  { crossdomain: true })
        .then(data => this.setAvailableFlights(data.data))
        //this is not available in below code. So have to define a new method and call that
        // .then(function (response) {
        //     console.log(response);
        //     alert("response.data: "+response.data);
        //     alert("this: "+this);
            
        //     this.setState({availableFlights: response.data})
        // })
        .catch(function (error) {
            alert("Error: "+error)
            console.log(error);
        });

    }

    render() {
        let inputStyle = {
            padding: '16px 16px 11px 60px',
            boxSizing: 'border-box'
        };
        let underlineStyle = {marginLeft: '-60px', bottom: '0px'};

        return (
            <div>
              <form style={styles.form} onSubmit={e => {
                alert("Submitting");
                }}>  
              <RadioButtonGroup name="searchField" defaultSelected="name">
                    <RadioButton
                        value="name"
                        label="Flight Name"
                        style={styles.radioButton}
                    />
                    
                    <RadioButton
                        value="id"
                        label="Flight Id"
                    />
                </RadioButtonGroup>
            
              <TextField hintText="Flight Name or Number?"
                fullWidth={ true }
                style={ inputStyle }
                />

                <RaisedButton label="Search Flights"  onClick = {this.searchFlights.bind(this)}/>
                </form>
                <br/> <br/>

                <h2> Available Flights </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            {/* <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {this.state.availableFlights.map( (row, index) => (
                    <TableRow key={index}>
                        <TableRowColumn>{index}</TableRowColumn>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        {/* <TableRowColumn>{row.status}</TableRowColumn> */}
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
            );
    }
}

FlightSearchInput.propTypes = {onTodoAdded: React.PropTypes.func};

export default FlightSearchInput;
