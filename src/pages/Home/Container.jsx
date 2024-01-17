import { useSelector } from 'react-redux';
import Presentation from './Presentation'


const Container = () => {
  const user = useSelector(state => state.authReducer.user);
  
  return (
    <div>
      <Presentation user={user}/>
    </div>
  )
}

export default Container
