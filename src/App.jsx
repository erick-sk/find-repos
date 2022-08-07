import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import Spinner from './components/Spinner';
import Alert from './components/Alert';

function App() {
  // state
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // call to api
  const fetchData = async () => {
    setLoading(true);

    try {
      const url = `https://api.github.com/users/${username}/repos`;

      const response = await fetch(url);
      const json = await response.json();

      if (json.length === 0) {
        setError('User not found, try another...');

        setTimeout(() => {
          setError('');
          setData([]);
        }, 4000);
      } else {
        setData(json);
      }
    } catch (error) {
      console.log(error);
    } finally {
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
                {data.map((info) => (
                  <Card key={info.id} info={info} />
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
