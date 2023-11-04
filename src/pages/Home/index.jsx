import React from 'react';
import CreatePost from '../../components/CreatePost';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';

import Navbar from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box bg={'gray.100'} h="100vh">
      <Navbar />
      <LeftSideBar />
      <RightSideBar />
      <Flex flexDirection="column" justifyContent="center" w="40%" mx="auto">
        <CreatePost />
      </Flex>
    </Box>
  );
}
