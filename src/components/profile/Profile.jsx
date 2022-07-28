import "../profile/profile.css"
import userImage from "../../assets/user.jpg"
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { auth} from '../../firebase/firebase_Configue'
import { signOut } from 'firebase/auth'
import { getUserDetails } from '../../features/userAuthenticationSlice/userAuthSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)

  const userLogout = async() => {
    await signOut(auth)
    await localStorage.clear()
    await window.location.reload()
  }
  console.log(user == null);

  return (
    <div className='profile'>
      <div className="profile-header">
        <h3>Hello, <span>{user?.name}</span></h3>
        <p>What do you want today</p>
      </div>
      <div className="profile-image">
        <img src={user === "" || user === null ? userImage : user?.photo} alt="userimage" />
        { user !== null ?<button className='btn-main' onClick={userLogout}>logout</button> : <button className='btn-main' onClick={()=> dispatch(getUserDetails())}>login</button> }
      </div>
    </div>
  )
}

export default Profile
