import React, { useState } from 'react';
import { addPropertyApi } from '../../api/propertyApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextProvider';

const AddProperty = () => {
    const navigate = useNavigate();
    const { setAddPropertyModal, setConfirm } = useStateContext();
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
        setFormData({ ...formData, [name]: value });
    };
    const handleImageChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadedImageUrls = [];
            for (let i = 0; i < formData.images.length; i++) {
                const formDataCloudinary = new FormData();
                formDataCloudinary.append('file', formData.images[i]);
                formDataCloudinary.append('upload_preset', 'user_images');

                const response = await axios.post('https://api.cloudinary.com/v1_1/dczvebr3j/image/upload', formDataCloudinary);

                console.log(response);
                uploadedImageUrls.push(response.data.secure_url);
            }
            const formDataWithImageUrls = {
                ...formData,
                images: uploadedImageUrls
            };
            setAddPropertyModal({ isOpen: false });
            setAddPropertyModal({ addBody: formDataWithImageUrls });
            setConfirm({ modalIsOpen: true, action: "ADD", modalType: "property" })
            navigate('/properties');
        } catch (error) {
            console.error('Error adding property:', error);
        }
    };
    return (
        <div className="lg:mx-auto mt-20 max-w-2xl mb-[2em] mx-5">
            <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
            <form class="w-full" onSubmit={handleSubmit}>
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

                <div className='my-5'>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                </div>
            </form >
        </div >
    );

}

export default AddProperty