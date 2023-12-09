/* eslint-disable react/prop-types */
import { useMemo } from 'react';

import { Flex, Avatar, Heading, Text, AvatarBadge } from '@chakra-ui/react';

import useChatStore from '../../../../hooks/useChatStore';
import useActiveStore from '../../../../hooks/useActiveStore';

import moment from 'moment';

export default function Conversation({ conversation }) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  const setCurrConv = useChatStore((state) => state.setCurrConversation);
  const currConv = useChatStore((state) => state.currConversation);

  const userId = localStorage.getItem('userId');

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seenUsers || [];

    if (!userId) return false;
    if (lastMessage.sender._id === userId) return true;

    return seenArray.findIndex((user) => user._id === userId) !== -1;
  }, [lastMessage, userId]);

  if (!conversation.isGroup) {
    const otherUser = conversation.members.find((member) => member._id !== userId);
    conversation.name = otherUser.firstName;
  }

  const handleOnClick = () => {
    setCurrConv(conversation);
  };

  const handleTime = () => {
    const time = moment(conversation.messages[conversation.messages.length - 1]?.createdAt).format(
      'LT'
    );
    return time.toString();
  };

  const onlineUsers = useActiveStore((state) => state.members);
  const checkIsOnlineUser = () => {
    const otherUser = conversation.members.find((member) => member._id !== userId);
    if (onlineUsers.includes(otherUser._id)) return true;
    return false;
  };

  return (
    <Flex
      w="full"
      p={2}
      onClick={() => handleOnClick()}
      gap={4}
      cursor="pointer"
      borderRadius="2xl"
      boxShadow="sm"
      bg={currConv?._id === conversation._id ? 'gray.400' : 'white'}
      position="relative"
      _hover={{
        bg: 'gray.200'
      }}>
      <Avatar size="md" src={conversation.thumb} name={conversation.name}>
        {!conversation.isGroup && checkIsOnlineUser() && (
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        )}
      </Avatar>
      <Flex flexDir="column" justifyContent="center" gap={2} w="full">
        <Heading size="sm">{conversation.name}</Heading>
        {conversation.messages.length === 0 ? (
          <Flex justifyContent="space-between" w="full">
            <Text fontSize="xs" color={'#1A202C'}>
              Start a conversation
            </Text>
            {conversation.messages.length !== 0 && <Text fontSize="xs">{handleTime()}</Text>}
          </Flex>
        ) : (
          <Flex justifyContent="space-between" w="full">
            <Text fontSize="xs" color={hasSeen ? '#adb5bd' : '#1A202C'}>
              {lastMessage &&
                lastMessage.sender.displayName.substring(0, 12) +
                  '...' +
                  ': ' +
                  lastMessage?.content.substring(0, 8) +
                  (lastMessage?.content.length > 8 ? '...' : '')}
              {!lastMessage && 'Start a conversation'}
            </Text>
            {conversation.messages.length !== 0 && <Text fontSize="xs">{handleTime()}</Text>}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
