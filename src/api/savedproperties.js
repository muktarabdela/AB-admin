import axiosInstance from './axios';

// Defining API endpoints for to fetch all saved properties
export const savedProperties = async () => {
    try {
        const response = await axiosInstance.get('/favourites');
        return response.data;
    } catch (error) {
        console.error('Error fetching all saved properties:', error);
        throw error;
    }
}