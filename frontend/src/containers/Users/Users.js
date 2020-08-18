import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
import UserList from '../../components/UserList/UserList.js';
import { Spinner, Alert } from 'react-bootstrap';


const Users = () => {

    const loading = useSelector((state) => state.users.loading);

    const error = useSelector(state => state.users.error);

    const users = useSelector(state => state.users.users)

    const dispatch = useDispatch();

    const fetch_users = useCallback(() => dispatch(actions.fetch_users_initiate()), [dispatch]);

    const handle_status_change = useCallback((username, activated) => dispatch(actions.update_user_status(username, activated)), [dispatch]);

    const handle_role_change = useCallback((username, role) => dispatch(actions.update_user_role(username, role)), [dispatch]);

    const handle_update_user = useCallback((user) => dispatch(actions.save_user_init(user)), [dispatch]);

    const handle_delete_user = useCallback((userId) => dispatch(actions.delete_user_init(userId)), [dispatch]);

    useEffect(() => {
    fetch_users();
    }, [fetch_users]);
    const content = loading ? (
        <Spinner
            className="m-auto"
            variant="danger"
            animation="grow"
            size="sm"
        />
    ) : (
            error ? <Alert className="m-auto" variant="danger" >{error}</Alert>
                : <UserList
                    users={users}
                    handle_status_change={handle_status_change}
                    handle_role_change={handle_role_change}
                    handle_update_user={handle_update_user}
                    handle_delete_user={handle_delete_user}
        />
    );
    return content;
};


export default  Users;
