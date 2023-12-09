import _ from 'lodash';

import { useEffect } from 'react';
import { pusherClient } from '../../../pusher';

import { Flex } from '@chakra-ui/react';

import SearchBar from './SearchBar';
import ConversationItem from './ConversationItem';

import useChatStore from '../../../hooks/useChatStore';
import requestApi from '../../../utils/fetchData';

export default function ConservationContainer() {
  const userId = localStorage.getItem('userId');
  const currUser = JSON.parse(localStorage.getItem('currUser'));

  let conversations = useChatStore((state) => state.conversations);
  const setConversations = useChatStore((state) => state.setConversations);
  const updateConversations = useChatStore((state) => state.updateConversations);
  const newConversations = useChatStore((state) => state.newConversations);

  const currConversation = useChatStore((state) => state.currConversation);
  const setCurrConversation = useChatStore((state) => state.setCurrConversation);

  const friends = useChatStore((state) => state.friends);

  if (conversations) {
    conversations = _.orderBy(conversations, ['lastMessageAt'], ['desc']);
  }

  useEffect(() => {
    if (!pusherClient) return;
    if (!conversations) return;
    if (!userId) return;

    pusherClient.subscribe(userId);

    pusherClient.bind('conversation:update', async (res) => {
      const resNotSeen = await requestApi(`conversations/not-seen/message`, 'GET');
      const data = { ...res, currUser: currUser, notSeen: resNotSeen.data.metadata };
      updateConversations(data);
      if (data.tag === 'update-info' && data.conversationId === currConversation._id) {
        setCurrConversation({ ...currConversation, name: data.updateInfo.name });
      }
      if (data.tag === 'update-thumb' && data.conversationId === currConversation._id) {
        setCurrConversation({ ...currConversation, thumb: data.imageUrl });
      }
      if (data.tag === 'update-admins' && data.conversationId === currConversation._id) {
        setCurrConversation({
          ...currConversation,
          admins: data.admins
        });
      }
      if (data.tag === 'remove-members' && data.conversationId === currConversation._id) {
        const nemMembers = currConversation.members.filter((m) => data.members.includes(m._id));
        setCurrConversation({
          ...currConversation,
          members: nemMembers
        });
      }
      if (data.tag === 'is-leave-conversation' && data.conversationId === currConversation._id) {
        setCurrConversation(conversations[0]);
      }
      if (data.tag === 'add-members' && data.conversationId === currConversation._id) {
        const newMembers = data.members.map((m) => {
          const friend = friends.find((f) => f._id === m);
          if (friend === undefined) return data.currUser;
          return friend;
        });
        setCurrConversation({
          ...currConversation,
          members: [...currConversation.members, ...newMembers]
        });
      }
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
