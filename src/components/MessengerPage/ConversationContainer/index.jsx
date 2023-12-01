import _ from 'lodash';

import { useEffect } from 'react';
import { pusherClient } from '../../../pusher';

import { Flex } from '@chakra-ui/react';

import SearchBar from './SearchBar';
import ConversationItem from './ConversationItem';

import useChatStore from '../../../hooks/useChatStore';

export default function ConservationContainer() {
  const userId = localStorage.getItem('userId');

  let conversations = useChatStore((state) => state.conversations);
  const setConversations = useChatStore((state) => state.setConversations);
  const updateConversations = useChatStore((state) => state.updateConversations);
  const newConversations = useChatStore((state) => state.newConversations);

  if (conversations) {
    conversations = _.orderBy(conversations, ['lastMessageAt'], ['desc']);
  }

  useEffect(() => {
    if (!pusherClient) return;
    if (!conversations) return;
    if (!userId) return;

    pusherClient.subscribe(userId);

    pusherClient.bind('conversation:update', (data) => {
      updateConversations(data);
    });

    pusherClient.bind('conversation:new', (data) => {
      newConversations(data);
    });

    return () => {
      pusherClient.unsubscribe(userId);
      pusherClient.unbind('conversation:update');
      pusherClient.unbind('conversation:new');
    };
  }, [conversations, setConversations, updateConversations, userId]);

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
        {conversations?.map((conversation, index) => {
          return <ConversationItem key={index} conversation={conversation} />;
        })}
      </Flex>
    </Flex>
  );
}
