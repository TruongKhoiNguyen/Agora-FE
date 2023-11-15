import { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';
import MenuMessenger from '../../components/MenuMessenger';
import ConservationContainer from '../../components/ConversationContainer';
import MessageContainer from '../../components/MessageContainer';

import { getDataAPI } from '../../utils/fetchData';

export default function Messenger() {
  const accessToken = localStorage.getItem('token');
  const currUserId = localStorage.getItem('userId');

  const [conversations, setConversations] = useState([]);
  const [currConversation, setCurrConversation] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await getDataAPI('conversations', accessToken, { currUserId });
      setConversations(res.metadata);
      setCurrConversation(res.metadata[0]);
    };
    fetchConversations();
  }, [accessToken]);

  const handleSetCurrConversation = (conversation) => {
    setCurrConversation(conversation);
    console.log(conversation);
  };

  return (
    <Flex w="100vw" h="100vh" bg="gray.200">
      <MenuMessenger />
      <ConservationContainer
        setCurrConversation={handleSetCurrConversation}
        conversations={conversations}
        currConversation={currConversation}
      />
      <MessageContainer currConversation={currConversation} />
    </Flex>
  );
}
