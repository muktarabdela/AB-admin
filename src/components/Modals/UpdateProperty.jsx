import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import ConfirmationBox from './confirmationBox';
import Axios from 'axios';

const UpdateProperty = () => {
    const { PropertyModal, setPropertyModal, setConfirm, confirm } = useStateContext()
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        description: '',
        location: '',
        price: 0,
        size: 0,
        amenities: [],
        images: [], // Updated to be an array
        virtualTour: '',
        financing: '',
        details: {
            floorPlans: [],
            bedRooms: 0,
            restRooms: 0,
            nearby: {
                schools: [],
                transportOptions: [],
                shopsAndSupermarkets: []
            }
        },
        geolocation: {
            latitude: 0,
            longitude: 0
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadedImageUrls = [];
        for (let i = 0; i < formData.images.length; i++) {
            const formDataCloudinary = new FormData();
            formDataCloudinary.append('file', formData.images[i]);
            formDataCloudinary.append('upload_preset', 'images');
            const response = await Axios.post('https://api.cloudinary.com/v1_1/do7kscbrk/image/upload', formDataCloudinary);
            // console.log(response);
            uploadedImageUrls.push(response.data.secure_url);
        }
        const formDataWithImageUrls = {
            ...formData,
            images: uploadedImageUrls
        };
        //submission logic 
        setPropertyModal({ isOpen: false })
        setPropertyModal({ updateBody: formDataWithImageUrls })
        setConfirm({ modalIsOpen: true, action: "Update", modalType: "property", id: confirm.id })
    };


    return (
        <>
            <div className=" fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
                <div className="mt-[65em] lg:mt-[6em] relative bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">properties Details</h2>
                        <button onClick={() => setPropertyModal({ isOpen: false })} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='property type' />
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className='w-full px-3'>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">

                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Location</label>
                                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>


                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Price</label>
                                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Size</label>
                                <input type="number" id="size" name="size" value={formData.size} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="amenities" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
                                <input type="text" id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                                <input type="file" id="images" name="images" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple />
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="virtualTour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Virtual Tour URL</label>
                                <input type="text" id="virtualTour" name="virtualTour" value={formData.virtualTour} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="financing" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Financing</label>
                                <input type="text" id="financing" name="financing" value={formData.financing} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="floorPlans" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Floor Plans </label>
                                <input type="text" id="floorPlans" name="floorPlans" value={formData.floorPlans} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="bedRooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bedrooms</label>
                                <input type="number" id="bedRooms" name="bedRooms" value={formData.bedRooms} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="restRooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Restrooms</label>
                                <input type="number" id="restRooms" name="restRooms" value={formData.restRooms} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="nearbySchools" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nearby Schools</label>
                                <input type="text" id="nearbySchools" name="nearbySchools" value={formData.nearbySchools} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="nearbyTransportOptions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nearby Transport Options</label>
                                <input type="text" id="nearbyTransportOptions" name="nearbyTransportOptions" value={formData.nearbyTransportOptions} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="nearbyShopsAndSupermarkets" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nearby Shops and Supermarkets</label>
                            <input type="text" id="nearbyShopsAndSupermarkets" name="nearbyShopsAndSupermarkets" value={formData.nearbyShopsAndSupermarkets} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className="flex justify-end">
                            <button type="button" onClick={() => setPropertyModal({ isOpen: false })} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{confirm.action}</button>
                        </div>
                    </form >
                </div>
            </div >
        </>

    );
};

export default UpdateProperty;