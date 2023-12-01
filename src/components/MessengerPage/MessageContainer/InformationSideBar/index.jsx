import { useEffect, useState } from 'react';

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
  Link
} from '@chakra-ui/react';

import { AiOutlineEdit } from 'react-icons/ai';
import requestApi from '../../../../utils/fetchData';
import useChatStore from '../../../../hooks/useChatStore';

export default function InformationSideBar() {
  const currConv = useChatStore((state) => state.currConversation);

  const [convImgs, setConvImgs] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);

  const [convLinks, setConvLinks] = useState([]);
  const [loadingLink, setLoadingLink] = useState(false);

  useEffect(() => {
    const fetchImgData = async () => {
      setLoadingImg(true);
      const res = await requestApi(`conversations/images/${currConv._id}`, 'GET');
      setConvImgs(res.data.metadata);
      setLoadingImg(false);
    };
    const fetchLinkData = async () => {
      setLoadingLink(true);
      const res2 = await requestApi(`conversations/links/${currConv._id}`, 'GET');
      console.log(res2.data.metadata);
      setConvLinks(res2.data.metadata);
      setLoadingLink(false);
    };
    fetchImgData();
    fetchLinkData();
  }, [currConv]);

  return (
    <Flex
      h="99vh"
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
        <Avatar m="auto" size="xl" name={currConv.name} cursor="pointer" />
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
            <Button w="full" leftIcon={<AiOutlineEdit />}>
              Change conservation name
            </Button>
            <Button mt={2} w="full" leftIcon={<AiOutlineEdit />}>
              Change conservation image
            </Button>
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
          <AccordionPanel pb={4}>
            <Button colorScheme="blue">Invite</Button>
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
                convImgs.map((image) => (
                  <Flex key={image.id}>
                    <Image maxBlockSize={40} src={image.imageUrl} alt="conversationImage" />
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
          <AccordionPanel pb={4}>
            {loadingLink ||
              convLinks.map((link, index) => (
                <Flex key={index}>
                  <Link>{link.link}</Link>
                </Flex>
              ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
