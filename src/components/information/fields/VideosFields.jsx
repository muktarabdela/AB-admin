import React from 'react'

const VideosFields = ({ formData, handleChange }) => {
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
            <div className="mb-4">
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">videoUrl</label>
                <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="videoUrl"
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

export default VideosFields