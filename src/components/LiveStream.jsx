import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const LiveStream = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [video, setVideo] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUsername(localStorage.getItem('name'))
      getvideos(localStorage.getItem('name'))
    } else {
      navigate('/')
    }
  }, [])

  const getvideos = async (username) => {
    let response = await fetch(`http://localhost:3000/api/auth/gettag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": username })
    });
    let json = await response.json()
    response = await fetch(`http://localhost:3000/api/tag/getvideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": json })
    });
    json = await response.json()
    if (json) { setVideo(json) }
  }
  return (
    <div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {video.map((video) => {
          return <Link to={`/live-stream/${video.split('_')[0]}`}>
            <li class="col-span-1 divide-y divide-gray-200 rounded-3xl bg-gray-300 shadow">
              <div class="flex w-full items-center justify-between space-x-6 p-6">
                <div class="flex-1 truncate">
                  <div class="flex items-center space-x-3 justify-center">
                    <h2 class="truncate text-xl font-bold text-black">{video.split('_')[0]}</h2>
                  </div>
                  <i class="font-bold mt-1 truncate text-md text-yellow-600">{video.split('_')[1]}</i>
                </div>
              </div>
            </li></Link>
        })}
      </ul>
    </div>
  );
};

export default LiveStream;
