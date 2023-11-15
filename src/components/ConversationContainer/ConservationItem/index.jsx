/* eslint-disable react/prop-types */
import { Flex, Avatar, Heading, Text } from '@chakra-ui/react';

import moment from 'moment';

export default function ConservationItem({ conversation, setCurrConversation, currConversation }) {
  const currUserId = localStorage.getItem('userId');
  if (!conversation.isGroup) {
    const otherUser = conversation.members.find((member) => member._id !== currUserId);
    conversation.name = otherUser.firstName;
  }

  const handleTime = () => {
    const time = moment(
      conversation.messages[conversation.messages.length - 1]?.createdAt
    ).fromNow();
    return time;
  };

  return (
    <Flex
      w="full"
      onClick={() => setCurrConversation(conversation)}
      p={2}
      gap={4}
      cursor="pointer"
      borderRadius="2xl"
      boxShadow="sm"
      position="relative"
      bg={conversation === currConversation ? 'blue.100' : null}
      _hover={{
        bg: 'gray.200'
      }}>
      <Avatar size="md" name={conversation.name} />
      <Flex flexDir="column" justifyContent="center" gap={2} w="full">
        <Heading size="sm">{conversation.name}</Heading>
        {conversation.messages.length === 0 ? null : (
          <Flex justifyContent="space-between" w="full">
            <Text fontSize="xs">
              {conversation.messages[conversation.messages.length - 1]?.sender.firstName}:{' '}
              {conversation.messages[conversation.messages.length - 1]?.content}
            </Text>
            <Text fontSize="xs">{handleTime()}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
