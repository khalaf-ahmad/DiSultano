import React from "react";
import User from "./User/User";

const UserList = (props) => {
  return props.users.map(user => (
    <User
      key={user.username}
      changed={user.changed}
      username={user.username}
      role={user.role}
      activated={user.activated}
      name={user.name}
      status_change={(event) =>
        props.handle_status_change(user.username, event.target.checked)
      }
      role_change={(event) =>
        props.handle_role_change(user.username, +event.target.value)
      }
      save_clicked={() => props.handle_update_user(user)}
      delete_clicked={() => props.handle_delete_user(user.id)}
    />
  ));
};

export default UserList;
