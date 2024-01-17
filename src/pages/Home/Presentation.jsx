import React from 'react';
import AdminHome from '../../components/AdminHome';
import UserHome from '../../components/UserHome'
const Presentation = (props) => {
  const {
    user
  } = props
  if (user?.user_id === 1)
    return (
      <AdminHome />
    )
  else
    return (
      <UserHome />
    )
}

export default Presentation
