import { useEffect, useState } from 'react';
import { AuthService } from '../../../services/auth.services';

export const RequestInfo = () => {
  const [info, setInfo] = useState<unknown>();
  useEffect(() => {
    AuthService.infoAuthPrivate()
      .then((response) => {
        setInfo(response);
      })
      .catch((error) => {
        setInfo(error);
      });
}, [])

  return (
    <>
      <h2>Information</h2>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  )
}
