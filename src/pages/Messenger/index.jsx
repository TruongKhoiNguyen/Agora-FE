import { useEffect } from 'react';
import _ from 'lodash';

import { Flex } from '@chakra-ui/react';

import MenuMessenger from '../../components/MessengerPage/MenuMessenger';
import ConservationContainer from '../../components/MessengerPage/ConversationContainer';
import MessageContainer from '../../components/MessengerPage/MessageContainer';
import ActiveStatus from '../../components/MessengerPage/ActiveStatus';

import useChatStore from '../../hooks/useChatStore';

import requestApi from '../../utils/fetchData';

export default function Messenger() {
  const setConversations = useChatStore((state) => state.setConversations);
  const setFriends = useChatStore((state) => state.setFriends);
  const setCurrConversation = useChatStore((state) => state.setCurrConversation);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchConversation = async () => {
      const response = await requestApi('conversations', 'GET');
      const currConv = JSON.parse(localStorage.getItem('currConv'));
      if (currConv) {
        setCurrConversation(currConv);
      } else {
        let currConv = _.orderBy(response.data.metadata, ['lastMessageAt'], ['desc']).at(0);
        setCurrConversation(currConv);
      }
      setConversations(response.data.metadata);
    };
    const fetchUsers = async () => {
      const response = await requestApi('users', 'GET');
      setFriends(response.data.filter((user) => user._id !== userId));
    };
    fetchConversation();
    fetchUsers();
  }, []);

  return (
    <Flex w="100vw" h="100vh" bg="gray.200">
      <ActiveStatus />
      <MenuMessenger />
      <ConservationContainer />
      <MessageContainer />
    </Flex>
  );
}
