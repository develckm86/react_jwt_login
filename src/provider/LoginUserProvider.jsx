import {createContext, useContext, useState} from "react";

const UseContext=createContext(null);

//<LoginUserProvider> 의 하위 컴포넌트에서 모두 user와 setUser를 사용할 수 있음
export function LoginUserProvider({children}){
    const [user,setUser]=useState(null);
    return (
        <UseContext.Provider value={[user,setUser]}>
            {children}
        </UseContext.Provider>
    )
};

// 사용할때 마다   useContext를 호출 후   {user,setUser}=useContext(UseContext) 를 사용해야하는데
// 커스텀 훅을 만들면   {user,setUser}=useLoginUser() 로 사용가능
export const useLoginUser=()=> useContext(UseContext);

