import React, { useEffect, useState } from 'react'
import Presentation from './Presentation'
import { apiCall, methods, orderEndpoints } from '../../constants'
import { useSelector } from 'react-redux';

const Container = () => {
  const user = useSelector(state => state.authReducer.user);

  const [tab, setTab] = useState("eatHere")
  const [data, setData] = useState([])
  useEffect(() => {
    apiCall(
      `${orderEndpoints.getOrdersByStatus}/${tab}`,
      methods.get,
      null,
      user.token
    ).then(data => setData(data))
  }, [tab])
  return (
    <Presentation data={data.data} setTab={setTab} tab={tab} />
  )
}

export default Container
