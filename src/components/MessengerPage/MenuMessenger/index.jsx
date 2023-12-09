import React, { useEffect, useState } from 'react';

import { Flex, Image, Badge } from '@chakra-ui/react';

const LOGO_URL =
  'https://res.cloudinary.com/dp9bf5rvm/image/upload/v1697422644/assets/kf7uo6bn0stt4lwpmwkw.png';

import useChatStore from '../../../hooks/useChatStore';

import requestApi from '../../../utils/fetchData';

const styles = {
  icon: {
    cursor: 'pointer',
    _hover: {
      color: 'primary.600',
      transition: '0.4s ease-out'
    }
  },
  badge: {
    pos: 'absolute',
    variant: 'solid',
    bgColor: 'red.200',
    rounded: '100%',
    right: 0,
    top: 4
  }
};

export default function MenuMessenger() {
  const conversations = useChatStore((state) => state.conversations);

  const [notiCount, setNotiCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await requestApi('conversations/not-seen/message', 'GET');
      setNotiCount(res.data.metadata.length);
    };

    fetch();
  }, [conversations]);

  return (
    <Flex
      flexDir="column"
      bg="white"
      h="100vh"
      minW="3rem"
      alignItems="center"
      position="relative"
      boxShadow="xl">
      <Flex>
        <Image mt={4} src={LOGO_URL} h={12} w={12} />
        <Badge sx={styles.badge}>{notiCount > 0 ? notiCount : null}</Badge>
      </Flex>
    </Flex>
  );
}
