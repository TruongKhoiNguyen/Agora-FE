/* eslint-disable react/prop-types */
import { AvatarGroup, Flex, Avatar } from '@chakra-ui/react';
import CurrUserMessage from './CurrUserMessage';
import OtherUserMessage from './OtherUserMessage';
import NotificationMessage from './NotificationMessage';

export default function Messages({ messages, bottomRef }) {
  const userId = localStorage.getItem('userId');

  return (
    <Flex
      flex={1}
      flexDir="column"
      w="full"
      overflowY="auto"
      bg="white"
      borderRadius="xl"
      my={1}
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
      {messages?.map((message, index) => {
        if (
          message.type === 'UP_INFO' ||
          message.type === 'UP_THUMB' ||
          message.type === 'ADD_ADMIN'
        )
          return <NotificationMessage key={index} message={message} />;
        if (message.sender._id === userId) return <CurrUserMessage key={index} message={message} />;

        let isNextMsg = index === 0 || false;
        if (index > 0 && messages[index - 1].sender._id === message.sender._id) {
          isNextMsg = true;
        } else {
          isNextMsg = false;
        }

        return <OtherUserMessage isNextMsg={isNextMsg} key={index} message={message} />;
      })}
      <AvatarGroup my={2} size="sm" max={4} mr={4} alignSelf="flex-end">
        {messages &&
          messages[messages.length - 1]?.seenUsers.map((user) => {
            return user._id !== userId && <Avatar key={user._id} name={user.firstName} />;
          })}
      </AvatarGroup>
      <Flex ref={bottomRef} my={4} />
    </Flex>
  );
}
