export interface Profile{
  username:string;
  password:string;
}

export function createProfile(username:string,password:string): Profile {
  return {
    username,
    password
    }
}
