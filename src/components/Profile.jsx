import React from 'react';

const Profile = ({ user }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center">
                <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
