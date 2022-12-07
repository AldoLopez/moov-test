import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadMoov } from '@moovio/moov-js';


export const MoovDrops = ({ accountId, onCancel, onSuccess, token }) => {
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const [moov, setMoov] = useState(null);
  const moovRef = useRef(null);

  useEffect(() => {
    const getMoov = async () => {
      try {
        const moov = await loadMoov(token);
        setMoov(moov);
      } catch (e) {
        setError('Something went wrong. Please try again.');
      }
    };
    getMoov();
  }, [token]);

  const cancel = useCallback(() => {
    setError(null);
    setShow(false);
    onCancel();
  }, [onCancel]);

  const created = useCallback(() => {
    onSuccess();
    cancel();
  }, [cancel, onSuccess]);

  useEffect(() => {
    if (moov && moovRef) {
      const node = moovRef.current;
      node.token = token;
      node.accountID = accountId;
      node.open = show;
      node.onCancel = cancel;
      node.onSuccess = created;
      node.paymentMethodTypes = ['card'];
      node.onResourceCreated = created;
    }
  }, [moov, moovRef, accountId, cancel, created, show]);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!moov) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      {/** @ts-ignore */}
      <moov-payment-methods ref={moovRef} token={token}>
        {/** @ts-ignore */}
      </moov-payment-methods>
    </>
  );
};
