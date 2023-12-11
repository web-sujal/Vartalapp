import { createContext, useContext, useReducer } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { UserInfoType } from "../components/ChatList";

type StateType = {
  chatId: string;
  user: UserInfoType | null;
};

type ActionType = {
  type: "CHANGE_USER";
  payload: UserInfoType;
};

const INITIAL_STATE = {
  chatId: "",
  user: null,
};

export const ChatContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useContext(AuthContext) as AuthContextType;

  const chatReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser && currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + (currentUser && currentUser.uid),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
