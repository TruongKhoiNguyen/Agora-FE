import React from 'react';
import CreatePost from '../../components/CreatePost';
import LeftSideBar from '../../components/LeftSideBar';
import RightSideBar from '../../components/RightSideBar';

import Navbar from '../../components/Navbar';
import { Box, Flex } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box>
      <Navbar />
      <LeftSideBar />
      <RightSideBar />
      <Flex mt={16} flexDirection="column" justifyContent="center" w="40%" mx="auto">
        <CreatePost />
      </Flex>
    </Box>
  );
}
