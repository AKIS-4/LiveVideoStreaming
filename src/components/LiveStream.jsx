import React, { useEffect, useRef } from "react";
import Hls from "hls.js";


const LiveStream = () => {
  
  return (
    <div>
      <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-300 shadow">
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="truncate text-sm font-medium text-gray-900">Shehab Najib</h3>
              </div>
              <p class="mt-1 truncate text-sm text-gray-500">Acount owner</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LiveStream;
