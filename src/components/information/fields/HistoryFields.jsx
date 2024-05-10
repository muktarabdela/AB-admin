import React from 'react'

const HistoryFields = ({ formData, handleChange, handleImageChange }) => {
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
                <label htmlFor="ourPerspective" className="block text-sm font-medium text-gray-700">our Perspective</label>
                <input
                    type="text"
                    name="ourPerspective"
                    value={formData.ourPerspective}
                    onChange={handleChange}
                    placeholder="our Perspective"
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    )
}

export default HistoryFields