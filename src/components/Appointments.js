import AppointmentForm from "./AppointmentForm"
import React, {UseState,useEffect, useState} from "react";
import firebaseDb from "../firebase";

const Appointments = () => {

    var [appointmentObjects, setAppointmentObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(()=> {
        firebaseDb.child('appointments').on('value', snapshot=>{
           if(snapshot.val()!=null)
           setAppointmentObjects({
               ...snapshot.val()
           })
           else
           setAppointmentObjects({})
        })
    }, [])

    const addOrEdit = obj => {
        if(currentId=='')
            firebaseDb.child('appointments').push(
                obj,
                err => {
                    if(err)
                        console.log(err)
                        else
                        setCurrentId('')
                }
         )
        else
             firebaseDb.child(`appointments/${currentId}`).set(
                obj,
                err => {
                    if(err)
                        console.log(err)
                        else
                            setCurrentId('')
                }
     )

    }

    const onDelete = key=> {
        if(window.confirm('Do you want to delete this appointment?'))
        firebaseDb.child(`appointments/${key}`).remove(            
            err => {
                if(err)
                    console.log(err)
                    else
                    setCurrentId('')
            }
     )
    }

    return (
        <React.Fragment>
         <div class="jumbotron jumbotron-fluid"><br></br>
             <img style={{display:"inline-block",}} src="/logo.png" width="150" height="150"/>
             <h1 style={{textAlign: 'center',display:"inline-block",}} class="display-3 text-center">⠀Appointments Registration</h1>
           <br></br><br></br>
        </div>
        <div className="row">
        <div className="col-md-5">
            <AppointmentForm {...({addOrEdit, currentId, appointmentObjects})} />
        </div>
        <div className="col-md-7">
            <table className="table table-borderless table-stripped">
                <thead className="thead-light">
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(appointmentObjects).map(id=>{
                            return <tr key={id}>
                                <td>{appointmentObjects[id].fullName}</td>
                                <td>{appointmentObjects[id].mobile}</td>
                                <td>{appointmentObjects[id].email}</td>
                                <td>
                                    <a className="btn text-primary" onClick={()=>{setCurrentId(id)}}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </a>
                                    <a className="btn text-danger" onClick={()=>{onDelete(id)}}>
                                        <i className="far fa-trash-alt"></i>
                                    </a>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    </React.Fragment>
     );
}
export default Appointments; 