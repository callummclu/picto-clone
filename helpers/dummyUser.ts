const c_users:any = []

export function join_User(id:string, username:string, room:string){
    const p_user = {id,username,room}

    c_users.push(p_user)
    console.log(c_users, "users")

    return p_user
}

console.log("users", c_users)

export function get_Current_User(id:any) {
    return c_users.find((p_user:any) => p_user.id === id);
  }
  
  // called when the user leaves the chat and its user object deleted from array
export function user_Disconnect(id:string) {
    const index = c_users.findIndex((p_user:any) => p_user.id === id);
  
    if (index !== -1) {
      return c_users.splice(index, 1)[0];
    }
  }
  