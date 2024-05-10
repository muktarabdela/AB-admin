import React from 'react';
import jsPDF from 'jspdf';
import { useStateContext } from '../../contexts/ContextProvider';
import { FaPrint } from "react-icons/fa";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const Modal = ({ userData }) => {
  const { userModal, setUserModal } = useStateContext();

  const handleClose = () => {
    setUserModal({ isOpen: false });
  };

  const exportToPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font size and add title
    doc.setFontSize(18);
    doc.text(`User Information/ ${userData.username}`, 10, 10);

    // Add horizontal line
    doc.line(10, 15, 200, 15);

    // Set font size and add user data
    doc.setFontSize(12);
    
    // User Information
    doc.text('Full Name:', 10, 25);
    doc.text(userData.fullname, 50, 25);
    
    doc.text('Username:', 10, 35);
    doc.text(userData.username, 50, 35);
    
    doc.text('Email:', 10, 45);
    doc.text(userData.email, 50, 45);
    
    doc.text('Phone:', 10, 55);
    doc.text(userData.phone, 50, 55);
    
    doc.text('Price Range:', 10, 65);
    doc.text(`From ${userData.profile.preferences.priceRange.from.toString()} birr upto ${userData.profile.preferences.priceRange.upto.toString()} birr`, 50, 65);
    
    doc.text('Location:', 10, 75);
    doc.text(userData.profile.preferences.location, 50, 75);
    
    doc.text('Size:', 10, 85);
    doc.text(userData.profile.preferences.size.toString() +  ' Karemeter', 50, 85);
    
    doc.text('Amenities:', 10, 95);
    const amenities = userData.profile.preferences.amenities ? userData.profile.preferences.amenities.join(', ') : 'No amenities specified';
    doc.text(amenities, 50, 95);

    // Save the PDF
    doc.save('user_information.pdf');
};


  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${userModal.isOpen ? 'block' : 'hidden'}`}>
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
              <p className='p-3'>Price Range: From <span className='text-red-500 px-2'>{userData.profile.preferences.priceRange.from} birr</span> Upto 
              <span className='text-red-500 px-5'>{userData.profile.preferences.priceRange.upto}</span> birr</p>
              <p className='p-3'>Location: <span className='text-green-500 px-5'>{userData.profile.preferences.location}</span></p>
              <p className='p-3'>Size: <span className='text-green-500 px-5'>{userData.profile.preferences.size}</span></p>
              <p className='p-3'>Amenities: 
                {userData.profile.preferences.amenities ? (
                    <span className='text-green-500 px-5'>
                    {userData.profile.preferences.amenities.map((amenity, index) => (
                        <span key={index}>{amenity}{index !== userData.profile.preferences.amenities.length - 1 && ', '}</span>
                    ))}
                    </span>
                ) : (
                    <span className='text-gray-500'>No amenities specified</span>
                )}
              </p>
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
  );
};

export default Modal;
