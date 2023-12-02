import { Flex, Avatar, AvatarBadge, Heading, Text, IconButton } from '@chakra-ui/react';

import useChatStore from '../../../../hooks/useChatStore';
import useActiveStore from '../../../../hooks/useActiveStore';

import { AiFillPhone, AiFillVideoCamera } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';

import Proptypes from 'prop-types';
InfomationContainer.propTypes = {
  handleShowInformationSideBar: Proptypes.func
};

export default function InfomationContainer({ handleShowInformationSideBar }) {
  const currUserId = localStorage.getItem('userId');
  const currConv = useChatStore((state) => state.currConversation);

  const handleConversationName = () => {
    if (!currConv) return;
    if (!currConv.isGroup) {
      const otherUser = currConv.members.find((member) => member._id !== currUserId);
      return otherUser.firstName;
    } else {
      return currConv.name;
    }
  };

  const onlineUsers = useActiveStore((state) => state.members);
  const checkIsOnlineUser = () => {
    if (!currConv) return false;
    if (onlineUsers) {
      const otherUser = currConv.members.find((member) => member._id !== currUserId);
      if (onlineUsers.includes(otherUser._id)) return true;
      return false;
    }
    return false;
  };

  return !currConv ? null : (
    <Flex
      bg="white"
      w="full"
      h={16}
      borderRadius="xl"
      alignItems="center"
      p={2}
      gap={4}
      pos="relative">
      {currConv.isGroup ? (
        <Avatar
          ml={2}
          src={currConv.thumb}
          size="md"
          name={handleConversationName()}
          cursor="pointer"
        />
      ) : (
        <Avatar
          ml={2}
          colorScheme="facebook"
          size="md"
          name={handleConversationName()}
          cursor="pointer">
          <AvatarBadge
            boxSize="1.25em"
            bg={checkIsOnlineUser() ? 'green.500' : 'gray.500'}
            borderColor="white"
          />
        </Avatar>
      )}
      <Flex flexDir="column">
        <Heading size="md">{handleConversationName()}</Heading>
        {currConv?.isGroup ? null : checkIsOnlineUser() ? (
          <Text fontWeight="md" color="gray.600">
            Online
          </Text>
        ) : (
          <Text fontWeight="md" color="gray.600">
            Offline
          </Text>
        )}
      </Flex>
      <Flex gap={1} pos="absolute" right={4}>
        <IconButton
          bgColor="gray.200"
          borderRadius="full"
          color="blue.500"
          icon={<AiFillPhone size={26} />}
        />
        <IconButton
          bgColor="gray.200"
          borderRadius="full"
          color="blue.500"
          icon={<AiFillVideoCamera size={26} />}
        />
        <IconButton
          bgColor="gray.200"
          borderRadius="full"
          color="blue.500"
          onClick={handleShowInformationSideBar}
          icon={<HiInformationCircle size={26} />}
        />
      </Flex>
    </Flex>
  );
}
