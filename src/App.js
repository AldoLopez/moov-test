import './App.css';
import { MoovDrops } from './moov';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [addingPayment, setAddingPayment] = useState(false);

  const add = () => {
    console.log('adding');
    setAddingPayment(true);
  };

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
      <button onClick={add}>add payment</button>
      {addingPayment && (
        <MoovDrops
          accountId={token.accountId}
          onCancel={() => setAddingPayment(false)}
          onSuccess={() => setAddingPayment(false)}
          token={token.token}
        />
      )}
    </div>
  );
}

export default App;
