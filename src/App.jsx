import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import Spinner from './components/Spinner';
import Alert from './components/Alert';

function App() {
  // state
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // call to api
  const fetchData = async () => {
    // show loader
    setLoading(true);

    try {
      // url api
      const url = `https://api.github.com/users/${username}/repos`;

      const response = await fetch(url);
      const json = await response.json();

      if (json.length === 0) {
        // show error
        setError('User not found, try another...');

        // delete error and state repos
        setTimeout(() => {
          setError('');
          setRepos([]);
        }, 4000);
      } else {
        // set data from api
        setRepos(json);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // delete loader
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <main className="mb-10">
      <Header />

      <Search
        username={username}
        setUsername={setUsername}
        fetchData={fetchData}
        setRepos={setRepos}
        setError={setError}
      />

      <div className="grid place-content-center place-items-center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {error ? (
              <Alert error={error} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {repos.map((repo) => (
                  <Card key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
