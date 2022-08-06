import { useState } from 'react';
import Card from './components/Card';
import Spinner from './components/Spinner';

function App() {
  // state
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // call to api
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://api.github.com/users/${username}/repos`;

      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData();
  };

  return (
    <main className="mb-10">
      <h1 className="my-4 text-4xl font-bold text-center">Find Repos</h1>

      <form className="mx-auto w-full md:w-1/2 mb-4" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by username..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid place-content-center place-items-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((info) => (
              <Card key={info.id} info={info} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
