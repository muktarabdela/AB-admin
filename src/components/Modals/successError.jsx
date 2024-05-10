import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useStateContext } from '../../contexts/ContextProvider';

const ResultModal = ({ msg, status }) => {
  const { result, setResult } = useStateContext();
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult({ isOpen: false }); // Close the modal after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, [result.isOpen]); // Listen for changes in result.isOpen

  useEffect(() => {
    if (status === 'success') {
      setAnimation('animate-success');
    } else if (status === 'error') {
      setAnimation('animate-error');
    }
  }, [status]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-y-auto ${result.isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <div className={`inline-block bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full ${animation} animate__animated animate__bounceIn`}>
        <div className="p-6 flex flex-col items-center justify-center">
          {status === 'success' ? (
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          ) : (
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
          )}
          <div className="text-xl font-bold">{msg}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
