import _ from 'lodash';

export const checkConvExisted = (convs, friendId, currUserId) => {
  const array = [currUserId, friendId];
  if (!convs)
    return {
      isExisted: false,
      conv: null
    };

  for (let i = 0; i < convs.length; i++) {
    if (convs[i].isGroup) continue;

    const memberIds = convs[i].members.map((member) => member._id);

    const isExisted = _.isEqual(memberIds.sort(), array.sort());
    if (isExisted)
      return {
        isExisted: true,
        conv: convs[i]
      };
  }

  return {
    isExisted: false,
    conv: null
  };
};
