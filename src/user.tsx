import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataType } from './types';

interface Props {
  user: UserDataType;
}

const User: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const handleMore = () => {
    navigate(`/more/${user.login}`);
  };

  
  return (
    <div className='user'>
      <button onClick={() => navigate('/')}>Reset</button>
      <button onClick={handleMore}>More</button>
      <img src={user.avatar_url} alt={user.name} className='avatar' />
      <div className='user-info'>
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>
      
    </div>
  );
};

export default User;
