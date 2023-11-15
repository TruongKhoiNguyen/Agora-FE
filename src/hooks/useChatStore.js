import { create } from 'zustand';

const useChatStore = create((set) => ({
  conversations: null,
  currConversation: null,
  friends: null,
  setConversations: (conversations) => set({ conversations }),
  setCurrConversation: (currConversation) => {
    return set({ currConversation });
  },
  setFriends: (friends) => set({ friends }),
  updateConversations: (data) => {
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
