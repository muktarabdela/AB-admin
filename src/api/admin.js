import axiosInstance from './axios';

// define api for register
export const registerAdmin = async (adminData) => {
    try {
        const response = await axiosInstance.post('/admin/register', adminData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}
// define api for login
export const loginAdmin = async (adminData) => {
    try {
        const response = await axiosInstance.post('/admin/login', adminData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// define api for admin protect
export const AdminProtect = async () => {
    try {
        // Make a request to the server to check if the user is authenticated as an admin
        const response = await axiosInstance.get('/admin/profile', {
            headers: {
                'Authorization': 'Bearer <KEY>'
            }
        });
        // If the response indicates that the user is an admin, return true
        // You might need to adjust this based on your server response
        return response.data.isAdmin === true;
    } catch (error) {
        // Handle error if the request fails
        console.error('Error checking admin status:', error);
        return false; // Return false by default if there's an error
    }
};

// Function to retrieve token from localStorage
export const getToken = () => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    return token;
};
