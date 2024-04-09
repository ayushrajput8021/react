import { UserDataType } from "../types";
export interface UserProps {
      user: UserDataType;
      setUser: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;
    }