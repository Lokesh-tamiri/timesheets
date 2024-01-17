import React, { useEffect, useState } from 'react'
import Presentation from './Presentation'
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, menuEndPoints, methods } from '../../constants';

const Container = () => {
    const [items, setItems] = useState([])
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            return;
        }
        apiCall(menuEndPoints.getMenuItems, methods.get, null, user.token)
            .then((data) => {
                console.log(data);
                setItems(data.data);
                dispatch(setLoading(false));
            })
            .catch((err) => console.log(err));
    }, [user]);
    return (
        <div>
            <Presentation items={items}/>
        </div>
    )
}

export default Container
