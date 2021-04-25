import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DatepickerComponent.css'

class DatepickerComponent extends Component {

    static defaultProps = {
        handleTimeChange: () => ('')
    }

    state = {
        startDate: new Date()
    };

    handleChange = (date) => {
        this.setState({
            startDate: date
        });

        this.props.handleTimeChange(date.toJSON())
    };

    


    render() {
        return (
            <div className="date_picker_container">
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy hh:mm"
                />
            </div>
        )
    };
}

export default DatepickerComponent;