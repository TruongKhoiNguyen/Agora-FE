import { Flex } from '@chakra-ui/react';

import useChatStore from '../../../../../hooks/useChatStore';
import MemberComp from './MemberComp';

export default function ConversationMember() {
  const currConv = useChatStore((state) => state.currConversation);

  return (
    <Flex flexDir="column" gap={2} flex="1" textAlign="left">
      {currConv.members.map((member, index) => (
        <MemberComp key={index} member={member} />
      ))}
    </Flex>
  );
}
