import React, { Component } from "react";
import DateTime from "../data/DateTime";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
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
      events: [],
      statusColor :"red"
    };
    this.handleShowFormClick = this.handleShowFormClick.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
  handleFormSubmit(event) {
    let events = this.state.events;
    const eventIndex = events.findIndex(obj => {
      return obj.uid === event.uid;
    });
   
    if (eventIndex === -1) {
      
      events.push(event);
    } else {

      events[eventIndex] = event;
    }
    this.setState({
      events: events,
      formVisible: false
    });
    this.writeUserData(event);
  }
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
  handleApprovalItem(node){
    firebase.database().ref('/events').child(node.uid).set(Object.assign({},node,{status:'approved'}));

  }
  componentDidMount() {
    const dt = new DateTime();
    const currentDateTime = dt.getCurrentDateTime().toString();
    this.setState({
      dt: currentDateTime
    });
    const eventsRef = firebase.database().ref('events');
    eventsRef.on('value', (snapshot) => {
      let events = snapshot.val();
      let newState = [];

      for (let event in events) {
        newState.push({
          uid: event,
          description: events[event].description,
          location: events[event].location,
          dtstart: events[event].dtstart,
          dtend: events[event].dtend,
          title: events[event].title,
          duration: events[event].duration,
          status: events[event].status
        })
      }
      console.log(newState)
      this.setState({
        events: newState
      })
    });
  }
  /////////////////////////////////////////////////////////////////
  /*componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData(data);
    }
  }*/
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
            onFormSubmit={this.handleFormSubmit}
            selectedEvent={this.state.selectedEvent}
            hasSelectedEvent={this.state.hasSelectedEvent}
          />
        ) : null}
        <EventList
          events={this.state.events}
          onRemoveItem={this.handleRemoveItem}
          onEditItem={this.handleEditItem}
          onApproveItem = {this.handleApprovalItem}
        />
      </div>
    );
  }
}

export default AppointmentForm;
