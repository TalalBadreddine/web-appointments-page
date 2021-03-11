import React, { Component } from "react";
import DateTime from "../data/DateTime";
import EventForm from "../components/EventForm";

import Header from "../components/Header";
import 'tachyons';
import firebase from 'firebase';
import background1 from '../images/appointment-scheduling-blog-810x405.webp';

const style = {
  //color: "#ccc",
  backgroundImage: `url(${background1})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  padding: "0em 1em"
};


class AppointmentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dt: "",
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {},
      events: []
    };
    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);

  }

  handleShowFormClick() {
    this.setState({
      formVisible: !this.state.formVisible
    });
  }
  handleFormCancel() {
    this.setState({
      formVisible: false,
      hasSelectedEvent: false,
      selectedEvent: {}
    });
  }
  //add event to firebase......
 
  //alter from firebase........
  removeEvent(uid) {
    firebase.database()
      .ref('/events').child(uid).remove();
      console.log('Removed from firebase')
  }
  handleRemoveItem(node) {
    this.removeEvent(node.uid)
  }
  handleEditItem(node) {
    this.setState({
      selectedEvent: node,
      hasSelectedEvent: true,
      formVisible: true
    });
  }
 
  componentDidMount() {
    const dt = new DateTime();
    const currentDateTime = dt.getCurrentDateTime().toString();
    this.setState({
      dt: currentDateTime
    });
   
  }

  writeUserData = (data) => {
    firebase.database()
      .ref('/events').child(data.uid)
      .set(data);
    console.log("DATA SAVED");
  }
  render() {
    return (
      <div id={this.props.id} style={style}>
        <Header
          onShowFormClick={this.handleShowFormClick}
          formVisible={this.state.formVisible}
        />
        {this.state.formVisible ? (
          <EventForm
            formVisible={this.state.formVisible}
            formTitle="Schedule an Event"
            onFormCancel={this.handleFormCancel}
            onFormSubmit={this.writeUserData}
            selectedEvent={this.state.selectedEvent}
            hasSelectedEvent={this.state.hasSelectedEvent}
          />
        ) : null}
        
      </div>
    );
  }
}

export default AppointmentForm;
