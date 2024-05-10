import { createSlice } from '@reduxjs/toolkit';

export const informationSlice = createSlice({
    name: 'information',
    initialState: {
        informationList: [],
        selectedInformation: null
    },
    reducers: {
        setInformationList: (state, action) => {
            state.informationList = action.payload;
        },
        setSelectedInformation: (state, action) => {
            state.selectedInformation = action.payload;
        },
        addInformation: (state, action) => {
            state.informationList.push(action.payload);
        },
        updateInformation: (state, action) => {
            // Implementation for updating information
        },
        deleteInformation: (state, action) => {
            // Implementation for deleting information
        }
    }
});

export const { setInformationList, setSelectedInformation, addInformation, updateInformation, deleteInformation } = informationSlice.actions;

export default informationSlice.reducer;
