import { useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';

import {
  Flex,
  Avatar,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  SimpleGrid,
  Image,
  Link,
  useToast
} from '@chakra-ui/react';

import { RiImageEditLine } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';

import requestApi from '../../../../utils/fetchData';
import useChatStore from '../../../../hooks/useChatStore';
import ChangeConversationName from './ChangeConvName';
import ConversationMember from './ConversationMember';

export default function InformationSideBar() {
  const toast = useToast();
  const currConv = useChatStore((state) => state.currConversation);

  const [convImgs, setConvImgs] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);

  const [convLinks, setConvLinks] = useState([]);
  const [loadingLink, setLoadingLink] = useState(false);

  useEffect(() => {
    if (!currConv) return;

    const fetchImgData = async () => {
      setLoadingImg(true);
      const res = await requestApi(`conversations/images/${currConv._id}`, 'GET');
      setConvImgs(res.data.metadata);
      setLoadingImg(false);
    };
    const fetchLinkData = async () => {
      setLoadingLink(true);
      const res2 = await requestApi(`conversations/links/${currConv._id}`, 'GET');
      setConvLinks(res2.data.metadata);
      setLoadingLink(false);
    };

    fetchImgData();
    fetchLinkData();
  }, [currConv]);

  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChangeImagesData = async (imageList) => {
    setImages(imageList);
    try {
      const form = new FormData();
      form.append('thumb', imageList[0].file);
      await requestApi(`conversations/update-thumb/${currConv._id}`, 'PATCH', form);
      setImages([]);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'You cannot change conversation image.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
      setImages([]);
    }
  };

  const handleLeaveConversation = async () => {
    try {
      await requestApi(`conversations/leave-conversation/${currConv._id}`, 'PATCH');
      toast({
        title: 'Success',
        description: 'You have left this conversation.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'You cannot leave this conversation.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right'
      });
    }
  };

  const setMovedToMsgId = useChatStore((state) => state.setMovedToMsgId);

  return !currConv ? null : (
    <Flex
      h="99vh"
      maxH="99vh"
      overflow="auto"
      bg="white"
      w={400}
      alignItems="center"
      flexDir="column"
      borderRadius="2xl"
      gap={12}
      mx={1}
      p={4}
      my="0.5vh">
      <Flex flexDir="column" gap={2} cursor="pointer">
        <Avatar
          m="auto"
          size="xl"
          src={currConv.isGroup && currConv.thumb}
          name={currConv.name}
          cursor="pointer"
        />
        <Heading size="md" mx="auto">
          {currConv.name}
        </Heading>
      </Flex>
      <Accordion w="full" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex as="span" flex="1" textAlign="left">
                Chat settings
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ChangeConversationName />
            <ImageUploading
              value={images}
              onChange={onChangeImagesData}
              maxNumber={maxNumber}
              dataURLKey="data_url">
              {({ onImageUpload, dragProps }) => (
                <Button
                  isLoading={images.length > 0}
                  mt={2}
                  w="full"
                  leftIcon={<RiImageEditLine />}
                  onClick={onImageUpload}
                  {...dragProps}>
                  Change conversation image
                </Button>
              )}
            </ImageUploading>
            {currConv.isGroup && (
              <Button leftIcon={<IoMdLogOut />} mt={2} w="full" onClick={handleLeaveConversation}>
                Leave Conversation
              </Button>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex as="span" flex="1" textAlign="left">
                Members
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel maxH="200" overflowY="auto" pb={4}>
            <ConversationMember />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex as="span" flex="1" textAlign="left">
                Images
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel maxH={260} overflowY="auto" pb={4}>
            <SimpleGrid gap={1} columns={3}>
              {loadingImg ||
                convImgs.map((image, index) => (
                  <Flex key={index}>
                    <Image
                      onClick={() => setMovedToMsgId(image.messageId)}
                      maxBlockSize={40}
                      src={image.image}
                      alt="conversationImage"
                    />
                  </Flex>
                ))}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex as="span" flex="1" textAlign="left">
                Links
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel maxH={260} overflowY="auto" pb={4}>
            {loadingLink ||
              convLinks.map((link, index) => (
                <Flex my={1} key={index}>
                  <Link onClick={() => setMovedToMsgId(link.messageId)} color="linkedin.400">
                    {link.link}
                  </Link>
                </Flex>
              ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
