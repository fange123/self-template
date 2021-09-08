import { useUserInfo } from '@/hooks';
import React from 'react';

interface IProps {}

const Home: React.FC<IProps> = (props) => {
  const { username } = useUserInfo();
  return <div>home</div>;
};

export default Home;
