import { useEffect, useState } from 'react';
import useActiveStore from './useActiveStore';
import { pusherClient } from '../pusher';

const useActiveChannel = () => {
  const { set, add, remove } = useActiveStore();
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    if (!pusherClient) return;
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe('presence-agora');
      setActiveChannel(channel);
    }

    channel.bind('pusher:subscription_succeeded', (members) => {
      const initialMembers = [];
      members.each((member) => initialMembers.push(member.id));
      set(initialMembers);
    });

    channel.bind('pusher:subscription_error', (error) => {
      console.log('subcription:::error', error);
    });

    channel.bind('pusher:member_added', (member) => {
      console.log('add::', member);
      add(member.id);
    });

    channel.bind('pusher:member_removed', (member) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-agora');
        pusherClient.unbind('pusher:subscription_succeeded');
        pusherClient.unbind('pusher:subscription_error');
        pusherClient.unbind('pusher:member_added');
        pusherClient.unbind('pusher:member_removed');
        setActiveChannel(null);
      }
    };
  }, [activeChannel, add, remove, set]);
};

export default useActiveChannel;
