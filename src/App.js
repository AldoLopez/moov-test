import './App.css';
import { MoovDrops } from './moov';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await axios.get('/.netlify/functions/moovToken');
        console.log(token);
        setToken(token.data);
      } catch (e) {
        console.log('an error occurred');
        console.log(e);
      }
    };
    getToken();
  }, []);

  if (!token) {
    return <div>loading ...</div>
  }
  return (
    <div className="App">
      <MoovDrops
        accountId={token.body.accountId}
        onCancel={() => alert('canceled')}
        onSuccess={() => alert('success')}
        token={token.body.token}
      />
    </div>
  );
}

export default App;
