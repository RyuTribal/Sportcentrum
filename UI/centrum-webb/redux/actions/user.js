export const USER_ADD = "USER_ADD";
export const USER_GET = "USER_GET";
export const USER_REMOVE = "USER_REMOVE";


//Action Creator
export const userAdd = (user) => ({
   type: USER_ADD,
   value: user
});

export const userGet = () => ({
    type: USER_GET,
 });

export const userRemove = () => ({
    type: USER_REMOVE
});