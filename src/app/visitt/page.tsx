// pages/virtual-tour.tsx

import React from 'react';

const VirtualTourPage: React.FC = () => {
  const embedCode = `
    <style>
      .my360Tour {
        width: 100%;
        height: calc(100vh - 20px); /* Adjust 20px according to your layout */
      }
      
      /* Hide the bottom images */
      .my360Tour .bottom-images {
        display: none;
      }
    </style>
    <iframe src="https://www.koala360.com/tour?id=9024&preview=true" style="border:none;" 
    class="my360Tour" name="my360Tour" scrolling="no" allow="vr; xr; accelerometer;
    magnetometer; gyroscope; webvr; webxr;" frameborder="0" allowfullscreen 
    webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
  `;

  return (
    <div>
      {/* Use dangerouslySetInnerHTML to embed the code */}
      <div dangerouslySetInnerHTML={{ __html: embedCode }} />
    </div>
  );
};

export default VirtualTourPage;
