import { useContext,createContext,useState } from "react";

const MessageContext = createContext();

function MessageProvider({children}) {
    const [isSuccess,setIsSuccess] = useState(false);
    const [isShow,setIsShow] = useState(false);
    const [modalSuccess,setModalSuccess] = useState(false);
    return(
        <MessageContext.Provider value={{isSuccess,setIsSuccess,isShow,setIsShow,modalSuccess,setModalSuccess}}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider;

export const MessageState = () => {
    return useContext(MessageContext);
}