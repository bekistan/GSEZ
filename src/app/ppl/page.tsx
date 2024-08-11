import React from 'react'; // Import React
import { NextPage } from 'next';
import Donate from '@/components/paypalbutton';

const Home: NextPage = () => {
  return (
    <div>
      
      <Donate />
    </div>
  );
};

export default Home;
