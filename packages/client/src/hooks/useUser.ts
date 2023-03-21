import { User } from "@/store/types/auth";
import { useSelector } from "@store";

export const useUser = () => useSelector((state) => state.auth.user);

export const useAuthor = (inputUser: User) => {
  const user = useUser()!;
  return user.id === inputUser.id;
};
