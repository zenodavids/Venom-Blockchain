'use client';
import { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import { initVenomConnect } from '../utils/venom-connect/configure';
import Main from '../components/Main';

const Home = () => {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className='text-center'>
      <Main venomConnect={venomConnect} />
    </div>
  );
};

export default Home;
