import {
  Flex,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useToast
} from '@chakra-ui/react';

import isConvAdmin from '../../../../../helpers/isConvAdmin';

import { BsThreeDots } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

import Proptypes from 'prop-types';
MemberComp.propTypes = {
  member: Proptypes.object
};

import useChatStore from '../../../../../hooks/useChatStore';

import requestApi from '../../../../../utils/fetchData';

export default function MemberComp({ member }) {
  const toast = useToast();
  const currConv = useChatStore((state) => state.currConversation);
  const currUserId = localStorage.getItem('userId');

  //   const handleRemoveAdminRole = async () => {
  //     try {
  //       const res = await requestApi(`conversations/add-admin/${currConv._id}`, 'PATCH', {
  //         memberId: member._id
  //       });
  //       console.log(res);
  //     } catch (err) {
  //       toast({
  //         title: 'Error',
  //         description: err.response.data.message,
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true
  //       });
  //     }
  //   };

  const handleAddAdminRole = async () => {
    try {
      const res = await requestApi(`conversations/add-admin/${currConv._id}`, 'PATCH', {
        memberId: member._id
      });
      toast({
        title: 'Success',
        description: res.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  const handleRemoveFromConv = async () => {
    try {
      const res = await requestApi(`conversations/remove-member/${currConv._id}`, 'PATCH', {
        memberId: member._id
      });
      toast({
        title: 'Success',
        description: res.data.message,
        status: 'success',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  return (
    <Flex alignItems="center" gap={2} w="full">
      <Avatar size="sm" src={member.avatar} name={member.displayName} />
      <Flex flex={1} flexDir="column">
        <Text fontSize="sm">{member.displayName}</Text>
        <Text fontWeight="light" fontSize="sm">
          {isConvAdmin(currConv, member) ? 'Admin' : 'Member'}
        </Text>
      </Flex>
      {member._id === currUserId || (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDots />}
            variant="unstyled"
          />
          <MenuList>
            <MenuItem icon={<FaRegCommentDots />}>Send message</MenuItem>
            {isConvAdmin(currConv, member) ? (
              <MenuItem icon={<MdOutlineAdminPanelSettings />}>Remove admin role</MenuItem>
            ) : (
              <MenuItem onClick={handleAddAdminRole} icon={<MdOutlineAdminPanelSettings />}>
                Add as admin
              </MenuItem>
            )}
            {isConvAdmin(currConv, { _id: currUserId }) && !isConvAdmin(currConv, member) && (
              <MenuItem onClick={handleRemoveFromConv} icon={<MdOutlineAdminPanelSettings />}>
                Remove from conversation
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
