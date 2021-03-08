import React, { Component } from 'react'
//import TimeCalendar from "react-timecalendar"
import AvailableTimes from 'react-available-times';
import firebase from 'firebase'

class TimeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            hoursavailble: { start: 9, end: 20 },
            busyTime: {},
            aDateObject: {},
            anotherDateObject: {}
        };
    }
    getReservedTime() {// load reservation time from firebase when Mounted 
        const eventsRef = firebase.database().ref('events');
        eventsRef.once('value')
            .then(data => {
                if (data.exists) {

                }
            });
    }
    render() {
        return (
            <div>
                <AvailableTimes
                    id="calender_id"
                    onChange={(selections) => {
                        selections.forEach(({ start, end }) => {
                            console.log('Start:', start, 'End:', end);
                            this.setState({
                                aDateObject :start,
                                anotherDateObject : end
                            })
                        })
                    }}
                    weekStartsOn="monday"
                    height={400}
                    recurring={false}
                    availableDays={this.state.daysAvailable}
                    availableHourRange={this.state.hoursavailble}
                    initialSelections={[
                        { start: this.state.aDateObject, end: this.state.anotherDateObject }
                    ]}
                />
            </div>
        );
    }

} export default TimeTable;
