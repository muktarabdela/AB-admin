import { createSlice } from '@reduxjs/toolkit';

export const propertySlice = createSlice({
    name: 'property',
    initialState: {
        properties: [],
        selectedProperty: null
    },
    reducers: {
        setProperties: (state, action) => {
            state.properties = action.payload;
        },
        setSelectedProperty: (state, action) => {
            state.selectedProperty = action.payload;
        },
        addProperty: (state, action) => {
            state.properties.push(action.payload);
        },
        updateProperty: (state, action) => {
            const { id, updatedProperty } = action.payload;
            const index = state.properties.findIndex(property => property.id === id);
            if (index !== -1) {
                state.properties[index] = updatedProperty;
            }
        },
        deleteProperty: (state, action) => {
            const id = action.payload;
            state.properties = state.properties.filter(property => property.id !== id);
            if (state.selectedProperty && state.selectedProperty.id === id) {
                state.selectedProperty = null;
            }
        }
    }
});

export const { setProperties, setSelectedProperty, addProperty, updateProperty, deleteProperty } = propertySlice.actions;

export default propertySlice.reducer;
