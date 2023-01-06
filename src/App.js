import React from 'react';
import Webcam from "react-webcam";

import './App.css';
// import { MoovDrops } from './moov';
import { useState } from 'react';
// import axios from 'axios';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = () => {
  const [images, setImages] = useState([]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
              setImages([...images, imageSrc]);
            }}
          >
            Capture photo
          </button>
        )}
      </Webcam>
      {images.map((b64) => {
        return (
          <div><img src={b64} /></div>
        );
      })}
    </>
  )
};

function App() {
  // const [token, setToken] = useState(null);
  // const [addingPayment, setAddingPayment] = useState(false);

  // const add = () => {
  //   console.log('adding');
  //   setAddingPayment(true);
  // };

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await axios.get('/.netlify/functions/moovToken');
  //       console.log(token);
  //       setToken(token.data);
  //     } catch (e) {
  //       console.log('an error occurred');
  //       console.log(e);
  //     }
  //   };
  //   getToken();
  // }, []);

  // if (!token) {
  //   return <div>loading ...</div>
  // }
  return (
    <div className="App">
      {/* <button onClick={add}>add payment</button>
      {addingPayment && ( */
        // <MoovDrops
        //   accountId={token.accountId}
        //   onCancel={() => setAddingPayment(false)}
        //   onSuccess={() => setAddingPayment(false)}
        //   token={token.token}
        // />
        // )}
      }
      <WebcamCapture />
    </div>
  );
}

export default App;
