import React, { useState } from 'react';
import User from './user';
import { fetchUser } from './service/fetchUser';
import { UserDataType } from './types';


const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [user, setUser] = useState<UserDataType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!input) return;
    setLoading(true);
    const userData = await fetchUser(input);
    setUser(userData);
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // const handleMore = () => {
  //   if (user) {
  //     navigate(`/more/${user.id}`); // Using navigate() instead of history.push()
  //   }
  // };

  return (
    <div className='App'>
      <>
        <h1>GitHub Account Finder</h1>
        <input
          type='text'
          value={input}
          placeholder='Enter a GitHub username'
          onChange={handleInputChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className='search-button' onClick={handleSearch}>
          Search
        </button>
        <button onClick={() => setInput('')}>Clear</button>
      </>
      {loading && <p>Loading...</p>}
      {user && <User user={user} />}
    </div>
  );
};

export default App;
