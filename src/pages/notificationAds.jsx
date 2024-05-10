import React, { useState } from 'react';
import { senNotification } from '../api/notificationApi'
import { ResultModal } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { FaSpinner } from 'react-icons/fa6';
import axios from 'axios';

const Notification_ads = () => {
  const { result, setResult } = useStateContext()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here

    // Check if formData.image is present
    if (!formData.image) {
      setResult({ isOpen: true, msg: "No image selected!", status: "error" });
      return;
    }

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', formData.image);
    formDataCloudinary.append('upload_preset', 'images');

    try {
      setIsLoading(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/do7kscbrk/image/upload', formDataCloudinary);
      setIsLoading(false);

      // Check if the response contains the secure URL of the uploaded image
      if (response.data && response.data.secure_url) {
        const uploadedImageUrl = response.data.secure_url;

        const formDataWithImageUrls = {
          ...formData,
          image: uploadedImageUrl
        };

        // Continue with your notification sending logic
        if (formData.title !== "" && formData.body !== "") {
          const notificationResponse = await senNotification(formDataWithImageUrls);
          setResult({ isOpen: true, msg: "Notification Sent!", status: "success" });
        } else {
          setResult({ isOpen: true, msg: "Fill all Fields!", status: "error" });
        }
      } else {
        setResult({ isOpen: true, msg: "Image upload failed!", status: "error" });
      }
    } catch (error) {
      setIsLoading(false);
      setResult({ isOpen: true, msg: "Something Went Wrong!", status: "error" });
      console.log(error);
    }
  };


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {<ResultModal status={result.status} msg={result.msg} />}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="title" className="text-lg font-semibold">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter title..."
        />

        <label htmlFor="body" className="text-lg font-semibold">Body:</label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter body..."
          rows="4"
        ></textarea>

        <label htmlFor="image" className="text-lg font-semibold">Image URL:</label>
        <div className="w-full  px-3 mb-6 md:mb-0">
          <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
          <input type="file" id="images" name="images" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple />
        </div>
        <button
          type="submit"
          className="relative w-20 h-12 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="animate-spin text-white" />
            </div>
          )}
          {!isLoading && "Submit"}
        </button>

      </form>
    </div>
  );
};

export default Notification_ads;
