import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { FaPrint, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { specificProperty } from '../../api/propertyApi';

const PropertyDetail = ({ propertyId }) => {
  const [propertyData, setPropertyData] = useState({ images: [] });
  const { property, setProperty, setSavedProperty } = useStateContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await specificProperty(propertyId);
        setPropertyData(response.property);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleClose = () => {
    setProperty({ isOpen: false });
    setSavedProperty({ isOpen: false });

  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`User Information/ ${propertyData.title || ''}`, 10, 10);

    doc.line(10, 15, 200, 15);
    doc.setFontSize(12);

    // Set font size and add user data
    doc.setFontSize(12);

    // User Information
    // Adjust the vertical positions to avoid overlapping
    let verticalPosition = 25; // Initial vertical position

    // Title
    doc.text('Title:', 10, verticalPosition);
    doc.text(propertyData.title || '', 50, verticalPosition);
    verticalPosition += 10; // Increase vertical position for the next text

    // Description
    doc.text('Description:', 10, verticalPosition);
    doc.text(propertyData.description || '', 50, verticalPosition);
    verticalPosition += 10;

    // Location
    doc.text('Location:', 10, verticalPosition);
    doc.text(propertyData.location || '', 50, verticalPosition);
    verticalPosition += 10;

    // Price
    doc.text('Price:', 10, verticalPosition);
    doc.text(propertyData.price.toString() + " Million" || '', 50, verticalPosition);
    verticalPosition += 10;

    // Size
    doc.text('Size:', 10, verticalPosition);
    doc.text(propertyData.size.toString() + " karemeter" || '', 50, verticalPosition);

    // Save the PDF
    doc.save('property_information.pdf');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? propertyData.images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === propertyData.images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${property.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleClose}></div>

      <div className="inline-block bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:max-w-3xl sm:w-full" style={{ maxHeight: '80vh' }}>
        <div className="bg-gray-800 px-4 py-2 rounded-t-lg">
          <button className="p-2 text-white" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="w-full max-h-60 overflow-hidden mb-4">
            <img src={propertyData?.images[currentIndex]} alt={`Property ${currentIndex + 1}`} className="w-full h-auto" />
          </div>
          <div className="flex justify-between items-center w-full mb-4">
            <button onClick={handlePrev} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <FaChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              {propertyData?.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'}`}
                ></div>
              ))}
            </div>
            <button onClick={handleNext} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
              <FaChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            <p className='p-3'>Title: <span className='text-green-500 px-5'>{propertyData?.title || ""}</span></p>
            <p className='p-3'>Description: <span className='text-green-500 px-5'>{propertyData?.description || ""}</span></p>
            <p className='p-3'>Location: <span className='text-green-500 px-5'>{propertyData?.location || ""}</span></p>
            <p className='p-3'>Price: <span className='text-green-500 px-5'>{propertyData?.price + " Million" || ""}</span></p>
            <p className='p-3'>Size: <span className='text-green-500 px-5'>{propertyData?.size + " Karemeter" || ""}</span></p>
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
              <FaPrint size={19} />
            </button>
          </TooltipComponent>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
