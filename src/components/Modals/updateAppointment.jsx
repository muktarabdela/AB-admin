import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import ConfirmationBox from './confirmationBox';

const UpdateAppointment = () => {
  const {appointmentModal, setAppointmentModal, setConfirm, confirm} = useStateContext()
  const [formData, setFormData] = useState({
    appointedTime: '',
    status: 'scheduled',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //submission logic 
    if(formData.appointedTime !== "" && !formData.status !== "")
    {
      setAppointmentModal({isOpen: false})
      setAppointmentModal({updateBody: formData})
      setConfirm({modalIsOpen: true, action: "Update", modalType: "Appointment", id: confirm.id})
    }
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
    <div className="relative bg-white w-full sm:w-96 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Appointment Details</h2>
        <button onClick={() => setAppointmentModal({isOpen: false})} className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="appointedTime" className="block text-sm font-medium text-gray-700">Appointed Time</label>
          <input
            type="datetime-local"
            id="appointedTime"
            name="appointedTime"
            value={formData.appointedTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="scheduled">Scheduled</option>
            <option value="canceled">Canceled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={() => setAppointmentModal({isOpen: false})} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{confirm.action}</button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default UpdateAppointment;
