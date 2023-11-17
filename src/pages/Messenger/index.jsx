import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import MenuMessenger from '../../components/MessengerPage/MenuMessenger';
import ConservationContainer from '../../components/MessengerPage/ConversationContainer';
import MessageContainer from '../../components/MessengerPage/MessageContainer';
import ActiveStatus from '../../components/MessengerPage/ActiveStatus';

import useChatStore from '../../hooks/useChatStore';
import useAuthStore from '../../hooks/useAuthStore';

import { getDataAPI } from '../../utils/fetchData';

export default function Messenger() {
  const setConversations = useChatStore((state) => state.setConversations);
  const setFriends = useChatStore((state) => state.setFriends);
  const setCurrConversation = useChatStore((state) => state.setCurrConversation);

  const initLogin = useAuthStore((state) => state.initLogin);

  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!accessToken || !userId) return;
    const fetchConversation = async () => {
      const response = await getDataAPI('conversations', accessToken, { userId });
      setCurrConversation(response.metadata[0]);
      setConversations(response.metadata);
    };
    const fetchUsers = async () => {
      const response = await getDataAPI('users', accessToken, { userId });
      setFriends(response.filter((user) => user._id !== userId));
    };
    fetchConversation();
    fetchUsers();
  }, [accessToken, setConversations, setCurrConversation, setFriends, userId]);

  if (!accessToken || !userId) return <Navigate to={'/'} />;

  initLogin({
    accessToken,
    userId,
    refreshToken
  });

  return (
    <Flex w="100vw" h="100vh" bg="gray.200">
      <ActiveStatus />
      <MenuMessenger />
      <ConservationContainer />
      <MessageContainer />
    </Flex>
  );
}
