import axiosInstance from './axios';

// Request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Define API endpoints for add property
export const addPropertyApi = async (propertyData) => {
    try {
        const response = await axiosInstance.post('/properties', propertyData);
        return response.data;
    } catch (error) {
        console.error('Error adding property:', error);
        throw error;
    }
}

// Define API endpoints for add listing property
export const getPropertyListings = async () => {
    try {
        const response = await axiosInstance.get('/properties');
        return response.data;
    } catch (error) {
        console.error('Error getting property listings:', error);
        throw error;
    }
}

// Define API endpoints for updateProperty
export const updateProperty = async (propertyData, propertyId) => {
    try {
        const response = await axiosInstance.patch(`/properties/${propertyId}`, propertyData,);
        return response.data;
    } catch (error) {
        console.error('Error updating property:', error);
        throw error;
    }
}

// Define API endpoints for deleteProperty
export const deleteProperty = async (propertyId) => {
    try {
        const response = await axiosInstance.delete(`/properties/${propertyId}`);

        return response.data.property;
    } catch (error) {
        console.error('Error deleting property:', error);
        throw error;
    }
}

export const specificProperty = async (id) => {
    try {
        const response = await axiosInstance.get(`/properties/${id}`);

        return response.data
    } catch (error) {
        console.error('Error fetching specific property:', error);
        throw error
    }
}