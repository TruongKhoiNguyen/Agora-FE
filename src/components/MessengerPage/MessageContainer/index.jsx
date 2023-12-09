/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { useDebounce } from 'use-debounce';
import { pusherClient } from '../../../pusher';

import { Flex, Input, Box, IconButton, Text, Image, Button } from '@chakra-ui/react';
import { AiOutlineSmile, AiOutlineUpload } from 'react-icons/ai';
import { BiSolidChevronRight } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { AiOutlineEdit } from 'react-icons/ai';

import InfomationContainer from './InfomationContainer';
import InformationSideBar from './InformationSideBar';
import Messages from './Messages';

import useChatStore from '../../../hooks/useChatStore';

import requestApi from '../../../utils/fetchData';

let clearTimerId = null;

import ImageUploading from 'react-images-uploading';

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
      const res = await requestApi(`messages/${currConv._id}?limit=100`, 'GET', { userId });
      setMessages(res.data.metadata.reverse());
    };

    fetchMessages();
  }, [currConv, userId]);

  // scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      bottomRef?.current?.scrollIntoView({});
    }, 100);
  }, [messages]);

  const movedToMsgId = useChatStore((state) => state.movedToMsgId);
  const setMovedToMsgId = useChatStore((state) => state.setMovedToMsgId);
  useEffect(() => {
    if (!movedToMsgId) return;
    setMessages(messages);
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    setMovedToMsgId(null);
  }, [movedToMsgId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!inputMsgRef.current.value) return;
    const imgFile = images.map((image) => image.file);
    const form = new FormData();
    form.append('content', inputMsgRef.current.value);
    form.append('conversationId', currConv._id);
    form.append('userId', userId);
    imgFile.forEach((file) => {
      form.append('chats', file);
    });
    await requestApi('messages', 'POST', form);
    setImages([]);
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

  //handleImage
  const [images, setImages] = useState([]);
  const maxNumber = 4;
  const onChangeImagesData = (imageList) => {
    setImages(imageList);
    inputMsgRef.current.focus();
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
        <ImageUploading
          multiple
          value={images}
          onChange={onChangeImagesData}
          maxNumber={maxNumber}
          dataURLKey="data_url">
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove, dragProps }) => (
            <Flex w="full" flexDir="column">
              {imageList.length > 0 && (
                <Flex
                  gap={4}
                  justifyContent="center"
                  bg="white"
                  w="full"
                  borderRadius="xl"
                  alignItems="center"
                  p={1}>
                  {imageList.map((image, index) => (
                    <Flex
                      justifyItems="center"
                      alignItems="center"
                      flexDirection="column"
                      key={index}
                      p={1}
                      border="1px"
                      borderRadius="md"
                      borderColor="gray.300">
                      <Image src={image['data_url']} alt="" boxSize="100" />
                      <Flex mt={1} gap={2} justifyContent="space-evenly">
                        <Button size="sm" onClick={() => onImageUpdate(index)}>
                          <AiOutlineEdit />
                        </Button>
                        <Button size="sm" onClick={() => onImageRemove(index)}>
                          <GrClose />
                        </Button>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              )}
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
                <Box onClick={onImageUpload} {...dragProps} color="blue.600" cursor="pointer">
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
          )}
        </ImageUploading>
      </Flex>
      {showInfomationSideBar ? <InformationSideBar /> : null}
    </Flex>
  );
}
