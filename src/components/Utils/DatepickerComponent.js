import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatepickerComponent.css'

class DatepickerComponent extends Component {

    state = {
        startDate: new Date()
    };

    handleChange = (date, event) => {
        console.log('onChange', date, event);
        this.setState({
            startDate: date
        });
    };

    


    render() {
        console.log(this.state.startDate)
        return (
            <div className="date_picker_container">
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy  EE hh:mm a"
                />
            </div>
        )
    };
}

export default DatepickerComponent;