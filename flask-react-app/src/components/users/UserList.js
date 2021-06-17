const UserList = (props) => {
  const users_list = props.users.map((user) => {
    return <li key={user.username}>{user.username}</li>;
  });

  return <ul>{users_list}</ul>;
};

export default UserList;
