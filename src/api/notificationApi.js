import axiosInstance from './axios';

// Defining API endpoints for send ad notifications
export const senNotification = async (body) => {
    try {
        const response = await axiosInstance.post('/adNotification', body);
        return response.data;
    } catch (error) {
        console.error('Error sending notification to all users:', error);
        throw error;
    }
}