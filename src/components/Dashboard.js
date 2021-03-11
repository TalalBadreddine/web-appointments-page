import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Calendar from './Calendar'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")
    //logout
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  async function handleAppointment() {
    setError("")
    //appointment
    try {
      history.push("/appointment-form")
    } catch {
      setError("Failed the appointment page")
    }
  }
  function handleClient() {
    setError("")
    //Client
    try {
      history.push("/clientRequests")
    } catch {
      setError("Failed the client page")
    }
  }
  return (
    <>
      <Card className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <Card.Header>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3 tc">
            Update Profile
          </Link>
        </Card.Header>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
        </Button>
          <Card.Body>
            <Button variant="link" onClick={handleAppointment}>
              Admin page Scheduals
        </Button>
       
        <Button variant="link" onClick={handleClient}>
              Client for sending requests
        </Button>
        

          </Card.Body>
          <Calendar />
        </div>
      </Card>

    </>
  )
}
