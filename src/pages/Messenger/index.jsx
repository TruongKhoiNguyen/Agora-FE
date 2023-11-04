import React from 'react';
import { Flex } from '@chakra-ui/react';
import MenuMessenger from '../../components/MenuMessenger';
import ConservationContainer from '../../components/ConversationContainer';
import MessageContainer from '../../components/MessageContainer';

export default function Messenger() {
  return (
    <Flex w="100vw" h="100vh" bg="gray.200">
      <MenuMessenger />
      <ConservationContainer />
      <MessageContainer />
    </Flex>
  );
}
