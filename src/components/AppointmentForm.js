import React, {UseState,useEffect, useState} from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const AppointmentForm = (props) => {
    const initialFieldValues = {
        fullName: '',
        mobile:'',
        email:'',
        address:'',
        date:'',
        time:'',
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(()=> {
        if(props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
              ... props.appointmentObjects[props.currentId]
        })
            
    }, [props.currentId, props.appointmentObjects])

    const handleInputChange = e => {
        var {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })

    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38 + 'px',}}>
                        <i style={{marginLeft: 1 + 'px',}} className="fas fa-user"></i>
                    </div>
                </div>
                <br></br>
                <input className="form-control" placeholder="Full Name" name="fullName" value=
                {values.fullName} onChange={handleInputChange}
                />
            </div>
            <br></br>
            <div className="form-row">
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38 + 'px',}}>
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Email" name="email" value=
                {values.email} onChange={handleInputChange}
                />
            </div>
            <br></br>
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38 + 'px',}}>
                        <i className="fas fa-mobile-alt">&nbsp;&nbsp;</i>
                    </div>
                </div>
                <input className="form-control" placeholder="Mobile" name="mobile" value=
                {values.mobile} onChange={handleInputChange}
                />
            </div>
            <br></br>
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38 + 'px',}}>
                        <i className="fas fa-calendar">&nbsp;&nbsp;</i>
                    </div>
                </div>
                <input type="date" className="form-control" placeholder="dd/mm/yyyy" name="date" value=
                {values.date} onChange={handleInputChange}
                />
            </div>
            <br></br>
            <div className="form-group input-group col-md-6">
                <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38 + 'px',}}>
                        <i className="fas fa-clock">&nbsp;&nbsp;</i>
                    </div>
                </div>
                <input type="time" className="form-control" name="time" value=
                {values.time} onChange={handleInputChange}
                />
            </div>
            <br></br>
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Address" name="address" value={values.address} onChange={handleInputChange}/>
            </div>
            <br></br>
            
            <div>
               <input style={{marginLeft: 170 + 'px',}} type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block"/>
            </div>
        </form>
        );
}
export default AppointmentForm; 