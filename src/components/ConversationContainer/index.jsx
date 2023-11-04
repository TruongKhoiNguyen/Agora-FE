import { Flex } from '@chakra-ui/react';
import React from 'react';
import SearchBar from './SearchBar';
import ConservationItem from './ConservationItem';

export default function ConservationContainer() {
  return (
    <Flex h="100vh" bg="gray.100" w="24rem" alignItems="center" flexDir="column" gap={1}>
      <SearchBar />
      <Flex
        w="98%"
        maxH="full"
        h="full"
        overflowY="auto"
        bg="white"
        mb={1}
        p={2}
        boxShadow="sm"
        borderRadius="xl"
        flexDir="column"
        gap={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#89CFF0',
            borderRadius: '24px'
          }
        }}>
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
        <ConservationItem />
      </Flex>
    </Flex>
  );
}
