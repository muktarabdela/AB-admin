import React, { useState } from 'react';
import { createInformation } from '../../api/informationApi';
import { useNavigate } from 'react-router-dom';

import NewsFields from './fields/NewsFields';
import LawsFields from './fields/LawsFields';
import LoansFields from './fields/LoansFields';
import VideosFields from './fields/VideosFields';
import HistoryFields from './fields/HistoryFields';
import axios from 'axios';
import ConfirmationBox from '../Modals/confirmationBox';
import { useStateContext } from '../../contexts/ContextProvider';

const AddInformation = () => {
    const { setAddInfoModal, setConfirm, confirm } = useStateContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contentType: '',
        title: '',
        body: '',
        images: [], // Updated to be an array
        sources: '',
        ourPerspective: '',
        videoUrl: '',
        interestRate: '',
        terms: '',
        booksParagraph: '',
        reviewsYetekabekoch: '',
        detailsRequirements: '',
        reviewsYebalemuyawochi: '',
        detailsRequiremnts: ''
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
                formDataCloudinary.append('upload_preset', 'images');
                const response = await axios.post('https://api.cloudinary.com/v1_1/do7kscbrk/image/upload', formDataCloudinary);
                // console.log(response);
                uploadedImageUrls.push(response.data.secure_url);
            }
            const formDataWithImageUrls = {
                ...formData,
                images: uploadedImageUrls
            };
            if (formData.title !== '' && formData.body !== '') {
                setAddInfoModal({ isOpen: false })
                setAddInfoModal({ addBody: formDataWithImageUrls })
                setConfirm({ modalIsOpen: true, action: "ADD", modalType: "information", id: confirm.id })
            }
        } catch (error) {
            console.error('Error adding information:', error);
        }
    };

    return (
        <div className='mt-20 max-w-2xl lg:mx-auto mb-20 mx-4'>
            <h2 className='text-2xl font-bold mb-4'>Add Information</h2>
            {confirm.modalIsOpen && <ConfirmationBox />}

            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="contentType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content Type</label>
                    <select name="contentType" value={formData.contentType} onChange={handleChange} id="contentType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select Content Type</option>
                        <option value="news">News</option>
                        <option value="laws">Laws</option>
                        <option value="loans">Loans</option>
                        <option value="videos">Videos</option>
                        <option value="history">History</option>
                    </select>
                </div>
                {formData.contentType === 'news' && <NewsFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                {formData.contentType === 'laws' && <LawsFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                {formData.contentType === 'loans' && <LoansFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                {formData.contentType === 'videos' && <VideosFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                {formData.contentType === 'history' && <HistoryFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                <button type="submit" className='bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-10'>Submit</button>
            </form>
        </div>
    );
};

export default AddInformation;
