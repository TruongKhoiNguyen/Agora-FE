import { create } from 'zustand';

const useChatStore = create((set) => ({
  conversations: null,
  currConversation: null,
  friends: null,
  movedToMsgId: null,
  setMovedToMsgId: (movedToMsgId) => set({ movedToMsgId }),
  setConversations: (conversations) => set({ conversations }),
  setCurrConversation: (currConversation) => {
    return set({ currConversation });
  },
  setFriends: (friends) => set({ friends }),
  updateConversations: (data) => {
    if (data.tag === 'update-info') {
      return set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c._id === data.conversationId) {
            return {
              ...c,
              name: data.updateInfo.name
            };
          }
          return c;
        })
      }));
    }

    if (data.tag === 'update-thumb') {
      return set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c._id === data.conversationId) {
            return {
              ...c,
              thumb: data.imageUrl
            };
          }
          return c;
        })
      }));
    }

    if (data.tag === 'update-admins') {
      return set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c._id === data.conversationId) {
            return {
              ...c,
              admins: data.admins
            };
          }
          return c;
        })
      }));
    }

    if (data.tag === 'remove-members') {
      return set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c._id === data.conversationId) {
            const nemMembers = c.members.filter((m) => data.members.includes(m._id));
            return {
              ...c,
              members: nemMembers
            };
          }
          return c;
        })
      }));
    }

    if (data.tag === 'is-leave-conversation') {
      return set((state) => ({
        conversations: state.conversations.filter((c) => c._id !== data.conversationId)
      }));
    }

    if (data.tag === 'add-members') {
      return set((state) => ({
        conversations: state.conversations.map((c) => {
          if (c._id === data.conversationId) {
            const newMembers = data.members.map((m) => {
              const friend = state.friends.find((f) => f._id === m);
              if (friend === undefined) return data.currUser;
              return friend;
            });

            return {
              ...c,
              members: [...c.members, ...newMembers.filter((m) => m !== undefined)]
            };
          }
          return c;
        })
      }));
    }

    return set((state) => ({
      conversations: state.conversations.map((c) => {
        if (c._id === data.conversationId) {
          if (data.tag === 'seen') {
            c.messages[c.messages.length - 1] = data.lastMessage;
            return {
              ...c,
              messages: c.messages
            };
          }
          return {
            ...c,
            lastMessageAt: data.lastMessage.createdAt,
            messages: [...c.messages, data.lastMessage]
          };
        }

        return c;
      })
    }));
  },
  newConversations: (conversation) =>
    set((state) => {
      if (!state.conversations) {
        return [conversation];
      }
      if (state.conversations.find((c) => c._id === conversation._id)) {
        return state.conversations;
      }
      return {
        conversations: [conversation, ...state.conversations]
      };
    })
}));

export default useChatStore;
