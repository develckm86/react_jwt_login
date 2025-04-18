import {useQuery} from "@tanstack/react-query";

async function loadUserList(){
    try {
        const response=await authFetch("http://localhost:9999/admin/user/list.do");
        const userList=await response.json();
        return userList;
    }catch (e){
        throw new Error(e);
    }

}

export async function authFetch(url,option={}){
    const jwt=localStorage.getItem("jwt");
    const response=await fetch(url,
        {
            ...option,
            headers:{
                "Authorization":`Bearer ${jwt}`,
                "Content-Type":"application/json",
                ...(option.headers && option.headers)
            }

        });
    if(!response.ok){
        console.log(response.statusText);
        throw new Error(response.status+"")
    }
    return response;
}



export default function AdminUserList(){
    const{error,isLoading,data:users}=useQuery({
        queryFn:loadUserList,
        queryKey:["users"],
        retry:1
    })

    return (
        <div className="container">
            <h1 className="my-5">유저 관리 페이지 </h1>
            {error && <p>{error.toString()}</p>}
            {isLoading && <p>...로딩중</p>}
            {users && users.map(user=><p key={user.id}>{user.id} {user.name}</p>)}
        </div>
    )
}