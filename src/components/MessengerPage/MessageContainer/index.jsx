/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { useDebounce } from 'use-debounce';
import { pusherClient } from '../../../pusher';

import { Flex, Input, Box, IconButton, Text } from '@chakra-ui/react';
import { AiOutlineSmile, AiOutlineUpload } from 'react-icons/ai';
import { BiSolidChevronRight } from 'react-icons/bi';

import InfomationContainer from './InfomationContainer';
import InformationSideBar from './InformationSideBar';
import Messages from './Messages';

import useChatStore from '../../../hooks/useChatStore';

import requestApi from '../../../utils/fetchData';

let clearTimerId = null;

export default function MessageContainer() {
  const [showInfomationSideBar, setShowInformationSideBar] = useState(
    localStorage.getItem('showInfomationSideBar') === 'true' || false
  );
  const handleShowInformationSideBar = () => {
    localStorage.setItem('showInfomationSideBar', !showInfomationSideBar);
    setShowInformationSideBar(!showInfomationSideBar);
  };

  const bottomRef = useRef(null);
  const typingRef = useRef(null);

  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState('');

  const inputMsgRef = useRef('');
  const [debMessage] = useDebounce(message, 300);

  const userId = localStorage.getItem('userId');

  const currConv = useChatStore((state) => state.currConversation);
  const setCurrConv = useChatStore((state) => state.setCurrConversation);

  useEffect(() => {
    if (!currConv) return;
    if (debMessage === '') return;
    requestApi('messages/typing', 'POST', { conversationId: currConv._id, userId });
  }, [currConv, userId, debMessage]);

  useEffect(() => {
    if (!currConv) return;

    const fetchMessages = async () => {
      const res = await requestApi(`messages/${currConv._id}`, 'GET', { userId });
      setMessages(res.data.metadata.reverse());
    };

    fetchMessages();
  }, [currConv, userId]);

  // scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  }, [messages]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!inputMsgRef.current.value) return;
    await requestApi('messages', 'POST', {
      conversationId: currConv._id,
      content: inputMsgRef.current.value,
      userId
    });
    inputMsgRef.current.value = '';
  };

  // Seen Message
  useEffect(() => {
    if (!currConv) return;
    requestApi(`conversations/seen/${currConv._id}`, 'POST', { userId });
  }, [currConv, userId, messages]);

  useEffect(() => {
    if (!pusherClient) return;
    if (!currConv) return;

    pusherClient.subscribe(currConv._id);

    const messageHandler = (message) => {
      setMessages((current) => {
        if (find(current, { _id: message._id })) return current;
        return [...current, message];
      });
    };
    const messageUpdateHandler = (data) => {
      const { updatedMessage } = data;
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage._id === updatedMessage._id) return updatedMessage;
          return currentMessage;
        })
      );
    };

    const typingHandler = (data) => {
      if (data.userId === userId) return;
      typingRef.current.innerHTML = `typing...`;
      clearTimeout(clearTimerId);
      clearTimerId = setTimeout(() => {
        typingRef.current.innerHTML = ``;
      }, 900);
    };

    pusherClient.bind('message:new', messageHandler);
    pusherClient.bind('message:update', messageUpdateHandler);
    pusherClient.bind('message:typing', typingHandler);

    return () => {
      pusherClient.unsubscribe(currConv._id);
      pusherClient.unbind('message:new', messageHandler);
      pusherClient.unbind('message:update', messageUpdateHandler);
      pusherClient.unbind('message:typing', typingHandler);

      clearTimeout(clearTimerId);
    };
  }, [currConv, setCurrConv, userId]);

  // handleEmoji
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    let data = inputMsgRef.current.value;
    data += emojiObject.emoji;
    setMessage(data);
    inputMsgRef.current.value = data;
  };

  return (
    <Flex w="full">
      <Flex
        flex={1}
        bg="gray.100"
        h="99vh"
        borderRadius="xl"
        my="auto"
        flexDir="column"
        justifyContent="space-between">
        <InfomationContainer handleShowInformationSideBar={handleShowInformationSideBar} />
        <Messages bottomRef={bottomRef} messages={messages} />
        <Flex
          pos="relative"
          onSubmit={handleOnSubmit}
          as="form"
          bg="white"
          w="full"
          h={16}
          borderRadius="xl"
          alignItems="center"
          p={4}
          gap={4}>
          <Text
            top={-8}
            left={8}
            pos="absolute"
            h="20px"
            bgColor="transparent"
            fontSize="12px"
            ref={typingRef}
          />
          <Input
            onChange={(e) => setMessage(e.target.value)}
            ref={inputMsgRef}
            mx={8}
            bg="gray.100"
            placeholder="Enter message..."
          />
          <Box color="blue.600" cursor="pointer">
            <AiOutlineSmile onClick={handleEmojiPickerHideShow} size={30} />
          </Box>
          <Box color="blue.600" cursor="pointer">
            <AiOutlineUpload size={30} />
          </Box>
          <IconButton
            borderRadius="xl"
            bgColor="blue.600"
            color="white"
            type="submit"
            _hover={{ bgColor: 'blue.600' }}
            icon={<BiSolidChevronRight />}
          />
          <Box dropShadow="md" position="absolute" top={-334} right={4} overflow="clip">
            {showEmojiPicker ? (
              <Picker
                height={320}
                width={320}
                searchDisabled={true}
                onEmojiClick={handleEmojiClick}
              />
            ) : null}
          </Box>
        </Flex>
      </Flex>
      {showInfomationSideBar ? <InformationSideBar /> : null}
    </Flex>
  );
}
