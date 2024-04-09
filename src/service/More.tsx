import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const More: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>({});
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetch(`https://api.github.com/users/${id}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserData(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${id}/repos`);
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else {
          throw new Error('Failed to fetch repositories');
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchRepos();
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };
  return (
    <div>
        <button onClick={handleBack}>Back</button>
      <h3>User Information:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p><strong>Username:</strong> {userData.login}</p>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Location:</strong> {userData.location}</p>
          <p><strong>Bio:</strong> {userData.bio}</p>
          <p><strong>Public Repositories:</strong> {userData.public_repos}</p>
        </div>
      )}

      <h3>Repositories:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repos.map((repo: any) => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default More;
