const isConvAdmin = (conv, member) => {
  if (conv.admins) {
    return conv.admins.includes(member._id);
  }
  return false;
};

export default isConvAdmin;
