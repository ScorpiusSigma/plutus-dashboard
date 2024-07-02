'use client';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Home = (): JSX.Element => {
  const router = useRouter();

  const handleRoute = (): void => {
    router.push('/instrument-details');
  };

  return (
    <Box className="flex flex-row justify-center content-center">
      <Button onClick={handleRoute}>Click me</Button>
    </Box>
  );
};

export default Home;
