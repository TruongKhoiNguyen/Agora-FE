/* eslint-disable react/prop-types */
import { Flex, Avatar, AvatarBadge, Heading, Text, IconButton } from '@chakra-ui/react';

import useChatStore from '../../../../hooks/useChatStore';
import useActiveStore from '../../../../hooks/useActiveStore';

import { AiFillPhone, AiFillVideoCamera } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi';

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

  return (
    <Flex
      bg="white"
      w="full"
      h={16}
      borderRadius="xl"
      alignItems="center"
      p={2}
      gap={4}
      pos="relative">
      <Avatar ml={2} size="md" name={handleConversationName()} cursor="pointer">
        {!currConv?.isGroup && checkIsOnlineUser() && <AvatarBadge boxSize={4} bg="green.500" />}
      </Avatar>
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
