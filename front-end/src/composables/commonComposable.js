export const useCommon = () => {
  const findSenderById = (room) => {
    const user = JSON.parse(
      localStorage.getItem(import.meta.env.VITE_STORAGE_USER)
    );
    if (!user || !room) return;
    const { members } = room;
    return members.find((member) => member.id !== user.id);
  };

  const convertName = (name) => {
    if (!name) return;
    const arr = name.split(" ");
    return arr.slice(arr.length - Math.ceil(arr.length / 2)).join(" ");
  };
  return { findSenderById, convertName };
};
