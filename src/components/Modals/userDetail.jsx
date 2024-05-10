import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf'
import { specificUser } from '../../api/userApi';
import { FaPrint } from 'react-icons/fa6';
import { useStateContext } from '../../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const UserDetail = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const { setUser, user } = useStateContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await specificUser(userId);
        setUserData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]); // Include userId as a dependency

  const handleClose = () => {
    setUser({ isOpen: false });
  };

  const exportToPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font size and add title
    doc.setFontSize(18);
    doc.text(`User Information/ ${userData.username || ''}`, 10, 10); // Add null check for username

    // Add horizontal line
    doc.line(10, 15, 200, 15);

    // Set font size and add user data
    doc.setFontSize(12);

    // User Information
    doc.text('Full Name:', 10, 25);
    doc.text(userData.fullname || '', 50, 25); // Add null check for fullname

    doc.text('Username:', 10, 35);
    doc.text(userData.username || '', 50, 35);
    
    doc.text('Email:', 10, 45);
    doc.text(userData.email || '', 50, 45);
    
    doc.text('Phone:', 10, 55);
    doc.text(userData.phone || '', 50, 55);

    // Save the PDF
    doc.save('user_information.pdf');
  };
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${user.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleClose}></div>

      <div className="inline-block bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:max-w-3xl sm:w-full">
        <div className="bg-gray-800 px-4 py-2 rounded-t-lg">
          <button className="p-2 text-white" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <img src={userData.image} alt="User" className="h-24 w-24 rounded-full object-cover border-4 border-gray-200" />
          </div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Details</h3>
            <div className="mt-2 text-sm text-gray-500">
              <p className='p-3'>Full Name: <span className='text-green-500 px-5'>{userData.fullname}</span></p>
              <p className='p-3'>Username: <span className='text-green-500 px-5'>{userData.username}</span></p>
              <p className='p-3'>Email: <span className='text-green-500 px-5'>{userData.email}</span></p>
              <p className='p-3'>Phone: <span className='text-green-500 px-5'>{userData.phone}</span></p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleClose}
          >
            Close
          </button>
          <TooltipComponent content="Print" position='TopCenter'>
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={exportToPDF}
          >
            {<FaPrint size={19}/>}
          </button>
          </TooltipComponent>
        </div>
      </div>
    </div>
  )
}

export default UserDetail