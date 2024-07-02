import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Patients = () => {
  const [appointments, setAppointments] = useState([]); 
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    doctor: '',
    patientName: '',
  }); // State to store new appointment details
  const [selectedAppointment, setSelectedAppointment] = useState(null); 
  

  useEffect(() => {

    // Fetch appointments on component mount
    getAppointments(); 
  }, []);

  const getAppointments = async () => {
          // Fetch all appointments from the server
    try {
      const response = await axios.get('/api/appointments'); 
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: e.target.value,
    }); // Handle input changes for the new appointment form
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
       // Add a new appointment
      await axios.post('/api/appointments', { ...newAppointment, confirmed: false }); 
      setNewAppointment({ date: '', doctor: '', patientName: '' });
      getAppointments();
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

// Delete an appointment
  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`); 
      getAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Fetch details of the appointment to be edited
  const handleEditAppointment = async (id) => {
    try {
      const response = await axios.get(`/api/appointments/${id}`); 
      setSelectedAppointment(response.data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };

  // Update an appointment
  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/appointments/${selectedAppointment._id}`, selectedAppointment); 
      setSelectedAppointment(null);
      getAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleConfirmAppointment = async (id) => {
    try { 
      // Confirm an appointment
      await axios.put(`/api/appointments/${id}/confirm`, { confirmed: true });
      getAppointments();  
      
      // Show alert message
      setTimeout(() => alert('Your Booking has been confirmed!'), 100);
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

// Cancel editing an appointment
  const handleCancelEdit = () => {
    setSelectedAppointment(null); 
  };



  return (
    <div>
      <NavBar />
    {/*   Booking form   */}
      <div className='bookApp'>
        <span>Book your Appointment</span><br /><br />
        <form onSubmit={handleAddAppointment}>
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="doctor"
            placeholder="Doctor"
            value={newAppointment.doctor}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={newAppointment.patientName}
            onChange={handleInputChange}
          />
          <button type="submit">Add Appointment</button>
        </form>
      </div>
      <div className='Appointments'>
        <span>Appointments</span>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} style={{ backgroundColor: appointment.confirmed ? 'lightblue' : 'white' }}>
              <p>Date: {appointment.date}</p>
              <p>Doctor's Name: {appointment.doctor}</p>
              <p>Patient's Name: {appointment.patientName}</p>
              <button className='edit' onClick={() => handleEditAppointment(appointment._id)} disabled={appointment.confirmed}>
                Edit
              </button>
              <button className='delete' onClick={() => handleDeleteAppointment(appointment._id)}>
                Delete
              </button>
              <button className='confirm' onClick={() => handleConfirmAppointment(appointment._id)} disabled={appointment.confirmed}>
                {appointment.confirmed ? 'Confirmed' : 'Confirm'}
              </button>
            </li>
          ))}
        </ul>
      </div>
{/*  Edit form  */}
      {selectedAppointment && (
        <div className='edit-booking'>
          <span>Edit Appointments</span><hr /><br />
          <form onSubmit={handleUpdateAppointment}>
            <input
              type="date"
              name="date"
              value={selectedAppointment.date}
              onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
            />
            <input
              type="text"
              name="doctor"
              placeholder="Doctor"
              value={selectedAppointment.doctor}
              onChange={(e) => setSelectedAppointment({ ...selectedAppointment, doctor: e.target.value })}
            />
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={selectedAppointment.patientName}
              onChange={(e) => setSelectedAppointment({ ...selectedAppointment, patientName: e.target.value })}
            />
            <button type="submit">Update Appointment</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Patients;
