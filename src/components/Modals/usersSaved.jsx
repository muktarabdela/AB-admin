import React, { useState, useEffect } from 'react';
import { specificUser } from '../../api/userApi';
import { useStateContext } from '../../contexts/ContextProvider';
import { FaSpinner } from 'react-icons/fa';

const UsersSaved = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { usersSaved, setUsersSaved } = useStateContext();
  const users = usersSaved.users;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsPromises = users.map(async (item) => {
          try {
            const userDetail = await specificUser(item.userId);
            return userDetail;
          } catch (error) {
            console.error(`Error fetching user detail for user ID ${item.userId}:`, error);
            return null;
          }
        });

        const userDetails = await Promise.all(userDetailsPromises);
        const filteredUserDetails = userDetails.filter(user => user !== null);
        setUserDetails(filteredUserDetails);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [users]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setUsersSaved({ isOpen: false })}></div>
  
    <div className="inline-block bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:max-w-md sm:w-full relative"> {/* Added relative positioning */}
      <div className="bg-gray-800 px-4 py-2 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Users ({userDetails.length})</h2>
        <button className="p-2 text-white" onClick={() => setUsersSaved({ isOpen: false })}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-32"> {/* Adjusted height of the loader div */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FaSpinner className="animate-spin text-green-500 h-12 w-12" /> {/* Increased size of the spinner */}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div>
            {userDetails.map((user, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-300 py-2">
                <img src={user.image || ''} alt="User" className="w-12 h-12 rounded-full border-2 border-green-500" />
                <div className="flex flex-col">
                  <p className="font-bold">{user.fullname}</p>
                  <p>{user.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setUsersSaved({ isOpen: false })}
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default UsersSaved;
