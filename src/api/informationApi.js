import axiosInstance from './axios';

// Define API endpoint for creating information
export const createInformation = async (informationData) => {
    try {
        const response = await axiosInstance.post('/informations', informationData);
        return response.data;
    } catch (error) {
        console.error('Error creating information:', error);
        throw error;
    }
}

// Define API endpoint for getting information
export const getInformation = async (contentType, title, postDate) => {
    try {
        const response = await axiosInstance.get('/informations', {
            params: {
                contentType,
                title,
                postDate
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting information:', error);
        throw error;
    }

}
export const specificInfo = async (id) => {
    try {
        const response = await axiosInstance.get(`/informations/${id}`);
        return response.data
    } catch (error) {
        console.error('Error fetching specific property:', error);
        throw error
    }
}
// Define API endpoint for updating information
export const updateInformation = async (informationData, informationId) => {
    try {
        const response = await axiosInstance.patch(`/informations/${informationId}`, informationData,);;
        return response.data;
    } catch (error) {
        console.error('Error updating information:', error);
        throw error;
    }
}
// Define API endpoint for deleting information
export const deleteInformation = async (informationId) => {
    try {
        const response = await axiosInstance.delete(`/informations/${informationId}`,);
        return response.data;
    } catch (error) {
        console.error('Error deleting information:', error);
        throw error;
    }
}