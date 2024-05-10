import axiosInstance from './axios';

// Defining API endpoint for fetching appointments
export const appointmentListings = async () => {
    try {
        const response = await axiosInstance.get('/appointments');
        return response.data.appointments;
    } catch (error) {
        console.error('Error Fetching appointments:', error);
        throw error;
    }
}

// Defining API endpoint for updating appointment
export const updateAppointment = async (id, body) => {
    try {
        const response = await axiosInstance.patch(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error Updating appointment:', error);
        throw error;
    }
}


// Defining API endpoint for deleting appointment
export const deleteAppointment = async (id) => {
    try {
        const response = await axiosInstance.delete(`/appointments/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error Updating appointment:', error);
        throw error;
    }
}