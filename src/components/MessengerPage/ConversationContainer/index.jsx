/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import React from 'react';
import SearchBar from './SearchBar';
import ConservationItem from './ConservationItem';

export default function ConservationContainer({
  conversations,
  setCurrConversation,
  currConversation
}) {
  return (
    <Flex h="100vh" bg="gray.100" minW="18rem" alignItems="center" flexDir="column" gap={1}>
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
            width: '1px'
          },
          '&::-webkit-scrollbar-track': {
            width: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#89CFF0',
            borderRadius: 'full'
          }
        }}>
        {conversations.map((conversation) => (
          <ConservationItem
            setCurrConversation={setCurrConversation}
            key={conversation._id}
            conversation={conversation}
            currConversation={currConversation}
          />
        ))}
      </Flex>
    </Flex>
  );
}
