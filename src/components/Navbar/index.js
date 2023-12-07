import React from 'react';

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Center,
  Box,
  Avatar,
  Heading
} from '@chakra-ui/react';

import {
  AiFillFacebook,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineBell
} from 'react-icons/ai';
import { BsMoon, BsGrid } from 'react-icons/bs';
import { SearchIcon } from '@chakra-ui/icons';

const Navbar = () => {
  return (
    <>
      <Flex w="100%" h="4rem" bg="white">
        <Flex alignItems="center" w="4%" justifyContent="center">
          <AiFillFacebook color="blue" size={80} />
        </Flex>
        <Flex alignItems="center" justifyContent="space-evenly" w="21%">
          <Box
            _hover={{
              cursor: 'pointer',
              color: 'blue'
            }}>
            <AiOutlineHome size={28} />
          </Box>
          <Box
            _hover={{
              cursor: 'pointer',
              color: 'blue'
            }}>
            <BsMoon size={26} />
          </Box>
          <Box
            _hover={{
              cursor: 'pointer',
              color: 'blue'
            }}>
            <BsGrid size={26} />
          </Box>
        </Flex>
        <Center alignItems="center" w="50%">
          <InputGroup justifyContent="center" width="75%">
            <InputLeftAddon pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftAddon>
            <Input borderRadius="0.4rem" placeholder="Search" w="44rem" />
          </InputGroup>
        </Center>
        <Flex alignItems="center" justifyContent="space-around" w="12%">
          <AiOutlineUser size={20} />
          <AiOutlineMail size={20} />
          <AiOutlineBell size={20} />
        </Flex>
        <Flex alignItems="center" justifyContent="space-evenly" w="13%">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Heading size="md">quyhoang</Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
