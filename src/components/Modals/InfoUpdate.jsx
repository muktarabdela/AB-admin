import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import ConfirmationBox from './confirmationBox';
import NewsFields from '../information/fields/NewsFields';
import LawsFields from '../information/fields/LawsFields';
import LoansFields from '../information/fields/LoansFields';
import VideosFields from '../information/fields/VideosFields';
import HistoryFields from '../information/fields/HistoryFields';
import Axios from 'axios';

const InfoUpdate = () => {
    const { setInfoModal, setConfirm, confirm } = useStateContext()
    console.log(confirm.data.contentType)
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
        setInfoModal({ isOpen: false })
        setInfoModal({ updateBody: formDataWithImageUrls })
        setConfirm({ modalIsOpen: true, action: "Update", modalType: "information", id: confirm.id })
    };


    return (
        <>
            <div className=" fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-black bg-opacity-50">
                <div className="mt-[65em] lg:mt-[6em] relative bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg font-semibold">Information Details</h2>
                        <button onClick={() => setInfoModal({ isOpen: false })} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {confirm.data.contentType === 'news' && <NewsFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                        {confirm.data.contentType === 'laws' && <LawsFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                        {confirm.data.contentType === 'loans' && <LoansFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                        {confirm.data.contentType === 'videos' && <VideosFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                        {confirm.data.contentType === 'history' && <HistoryFields formData={formData} handleImageChange={handleImageChange} handleChange={handleChange} />}
                        <div className="flex justify-end">
                            <button type="button" onClick={() => setInfoModal({ isOpen: false })} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{confirm.action}</button>
                        </div>
                    </form >
                </div>
            </div >
        </>

    );
};

export default InfoUpdate;