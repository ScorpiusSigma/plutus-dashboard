'use client';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Home = (): JSX.Element => {
  const router = useRouter();

  const handleRoute = (): void => {
    router.push('/overview');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleRoute}>Click me</Button>
    </Box>
  );
};

export default Home;
