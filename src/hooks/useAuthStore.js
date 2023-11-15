import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: '',
  refreshToken: '',
  userId: '',
  initLogin: (loginData) => {
    return set({
      accessToken: loginData.accessToken,
      refreshToken: loginData.refreshToken,
      userId: loginData.userId
    });
  }
}));

export default useAuthStore;
