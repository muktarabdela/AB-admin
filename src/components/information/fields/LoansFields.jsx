import React from 'react'

const LoansFields = ({ formData, handleChange, handleImageChange }) => {
    return (
        <div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Body"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
                <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                <input type="file" id="images" name="images" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple />
            </div>
            <div className="mb-4">
                <label htmlFor="sources" className="block text-sm font-medium text-gray-700">Sources</label>
                <input
                    type="text"
                    name="sources"
                    value={formData.sources}
                    onChange={handleChange}
                    placeholder="Sources"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">interestRate</label>
                <input
                    type="text"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    placeholder="InterestRate"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="terms" className="block text-sm font-medium text-gray-700">Terms</label>
                <input
                    type="text"
                    name="terms"
                    value={formData.terms}
                    onChange={handleChange}
                    placeholder="Terms"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="detailsRequiremnts" className="block text-sm font-medium text-gray-700">details Requiremnts</label>
                <input
                    type="text"
                    name="detailsRequiremnts"
                    value={formData.detailsRequiremnts}
                    onChange={handleChange}
                    placeholder="details Requiremnts"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="reviewsYebalemuyawochi" className="block text-sm font-medium text-gray-700"> reviews Yebalemuyawochi</label>
                <input
                    type="text"
                    name="reviewsYebalemuyawochi"
                    value={formData.reviewsYebalemuyawochi}
                    onChange={handleChange}
                    placeholder="reviewsYebalemuyawochi "
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="postDate" className="block text-sm font-medium text-gray-700">Post Date</label>
                <input
                    type="date"
                    name="postDate"
                    value={formData.postDate}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    )
}

export default LoansFields