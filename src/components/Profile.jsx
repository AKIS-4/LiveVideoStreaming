import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [tag, setTag] = useState('');
    useEffect(() => {
        setUsername(localStorage.getItem('name'))
    }, [])
    return (
        <>
            <div className="p-4 bg-violet-200 rounded-full shadow-2xl mb-32">
                <div className="flex items-center justify-center">
                    <div className="ml-4">
                        <h2 className="text-5xl font-bold text-center">{username}</h2>
                    </div>
                </div>
            </div>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Add tag to Video</h1>
            <div className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
            <div className="w-full max-w-2xl p-8 rounded-lg ">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="w-full max-w-2xl p-8 rounded-lg">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className='w-full max-w-2xl p-8 rounded-lg'>
            <button
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 rounded-full shadow-sm  bg-pink-900 text-white font-extrabold italic "
                    >
                        Add
                    </button>
            </div>
            </div>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Add tag to User</h1>
            <div className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
            <div className="w-full max-w-2xl p-8 rounded-lg ">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="w-full max-w-2xl p-8 rounded-lg">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className='w-full max-w-2xl p-8 rounded-lg'>
            <button
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 rounded-full shadow-sm  bg-pink-900 text-white font-extrabold italic "
                    >
                        Add
                    </button>
            </div>
            </div>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Remove tag from Video</h1>
            <div className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
            <div className="w-full max-w-2xl p-8 rounded-lg ">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="w-full max-w-2xl p-8 rounded-lg">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className='w-full max-w-2xl p-8 rounded-lg'>
            <button
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 rounded-full shadow-sm  bg-pink-900 text-white font-extrabold italic "
                    >
                        Add
                    </button>
            </div>
            </div>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Remove tag from User</h1>
            <div className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
            <div className="w-full max-w-2xl p-8 rounded-lg ">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="w-full max-w-2xl p-8 rounded-lg">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className='w-full max-w-2xl p-8 rounded-lg'>
            <button
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 rounded-full shadow-sm  bg-pink-900 text-white font-extrabold italic "
                    >
                        Add
                    </button>
            </div>
            </div>
        </>
    );
};

export default Profile;
