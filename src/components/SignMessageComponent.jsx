import React, { useState } from 'react';
import Wallet from "sats-connect";

const SignMessageComponent = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState(null);
  const [messageHash, setMessageHash] = useState(null);
  const [error, setError] = useState(null);

  const handleSignMessage = async () => {
    try {
      const response = await Wallet.request('signMessage', { address, message });
      if (response.status === 'success') {
        setSignature(response.signature);
        setMessageHash(response.messageHash);
        setError(null);
      } else {
        if (response.error.code === RpcErrorCode.USER_REJECTION) {
          setError('User cancelled the request.');
        } else {
          setError('Error signing message: ' + response.error.message);
        }
      }
    } catch (err) {
      setError('Something went wrong: ' + err.message);
    }
  };

  return (
    <div className="sign-message">
    <h1>Sign a Message</h1>
    <input
      type="text"
      placeholder="Enter Bitcoin Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
    <textarea
      placeholder="Enter Message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button onClick={handleSignMessage}>Sign Message</button>
  
    {signature && (
      <div>
        <h2>Signature</h2>
        <p>{signature}</p>
        <h2>Message Hash</h2>
        <p>{messageHash}</p>
      </div>
    )}
  
    {error && <p className="error">{error}</p>}
  </div>
  );
};

export default SignMessageComponent;
