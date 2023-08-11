import { useState } from 'react';

export const useHandleResponse = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleResponse = (response) => {
    if (response.status === 200) {
      setIsSuccess(true);
    } else if (response.status === 400) {
      setIsError(true);
    }
  }

  return {isSuccess, isError, handleResponse}
};
