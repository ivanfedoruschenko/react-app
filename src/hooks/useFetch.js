import {useEffect, useRef, useState} from "react";

export function useFetch(url) {
  const [defaultUrl, setDefaultUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setIsData] = useState([])
  const [error, setError] = useState(false)
  const countLimit = useRef(0)

  function getFetch(url) {
    setIsLoading(true)
    setError(false)
    fetch(url)
      .then((res) =>{
        return res.json()
      })
      .then((res) => {
        return setIsData(res)
      })
      .catch((err) => {
        setError(true)
        console.log("Error:", err)
      })
      .finally(() => setIsLoading(false))
  }

    function refetch(params) {
      if(countLimit.current < params.params._limit) {
        countLimit.current += 1;
        getFetch(defaultUrl);
        refetch(params);
      }
      else if(countLimit.current === params.params._limit) return countLimit.current = 0
    }

  useEffect(() => {
    getFetch(defaultUrl)
  }, [])

return {
  isLoading,
  data,
  error,
  refetch
}
}