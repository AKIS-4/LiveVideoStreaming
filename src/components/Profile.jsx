import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [tag, setTag] = useState('');
    const [video, setVideo] = useState('');
    const [tag2, setTag2] = useState('');
    const [video2, setVideo2] = useState('');
    const [tag3, setTag3] = useState('');
    useEffect(() => {
        setUsername(localStorage.getItem('name'))
        // console.log(import.meta.env.VITE_name)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://${import.meta.env.VITE_name}:3000/api/video/createvideo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username + '_' + video })
        });
        response = await response.json()
        if (response == "done") {
            response = await fetch(`http://${import.meta.env.VITE_name}:3000/api/auth/addtag`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, tag: username + '_' + tag })
            });
            await response.json()
        }
        response = await fetch(`http://${import.meta.env.VITE_name}:3000/api/tag/addintag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username + '_' + tag, tag: username + '_' + video })
        });
        await response.json()
        setVideo('')
        setTag('')
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://${import.meta.env.VITE_name}:3000/api/auth/addtag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user , tag:  username + '_' + tag2 })
        });
        response = await response.json()
        setUser('')
        setTag2('')
    }

    const handleSubmit3 = async (e) => {
        e.preventDefault();
        let response = await fetch(`http://${import.meta.env.VITE_name}:3000/api/auth/addtag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user , tag:  username + '_' + tag2 })
        });
        response = await response.json()
        setUser('')
        setTag2('')
    }
    return (
        <>
            <div className="p-4 bg-violet-200 rounded-full shadow-2xl mb-32">
                <div className="flex items-center justify-center">
                    <div className="ml-4">
                        <h2 className="text-5xl font-bold text-center">{username}</h2>
                    </div>
                </div>
            </div>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Create and Add tag to Video</h1>
            <form onSubmit={handleSubmit} className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
                <div className="w-full max-w-2xl p-8 rounded-lg ">
                    <input
                        type="text"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="w-full max-w-2xl p-8 rounded-lg">
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className='w-full max-w-2xl p-8 rounded-lg'>
                    <button
                        type="submit"
                        className="mt-1 block w-full px-3 py-2 rounded-full shadow-sm  bg-pink-900 text-white font-extrabold italic "
                    >
                        Create/Add
                    </button>
                </div>
            </form>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Add tag to User</h1>
            <form onSubmit={handleSubmit2} className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
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
                        value={tag2}
                        onChange={(e) => setTag2(e.target.value)}
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
            </form>
            <h1 className='text-center font-extrabold text-xl text-gray-700'>Remove tag from Video</h1>
            <form onSubmit={handleSubmit3} className='flex justify-between shadow-2xl mb-10 rounded-3xl'>
                <div className="w-full max-w-2xl p-8 rounded-lg ">
                    <input
                        type="text"
                        value={video2}
                        onChange={(e) => setVideo2(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="w-full max-w-2xl p-8 rounded-lg">
                    <input
                        type="text"
                        value={tag3}
                        onChange={(e) => setTag3(e.target.value)}
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
            </form>
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
