import axiosInstance from './axios';

// Define API endpoints for add property
export const allUsers = async () => {
    try {
        const response = await axiosInstance.get('/users', { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NjA1MzBjYmNkZGY3MDE5ODU5MTY1Y2EiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzExNjE2MzY2LCJleHAiOjE3MTQyMDgzNjZ9.aj8pEARVASF8mppt3Q8xpBPanTXGwFc0b9IGStgPg1w' } });
        return response.data.users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const specificUser = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data.user;
    } catch (error) {
        console.error('Error fetching specific user:', error);
        throw error;
    }
}
