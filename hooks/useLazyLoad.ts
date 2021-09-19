import { useEffect, useState } from "react";
import client from "../client";

const useLazyLoad = <resultType>(query:string) => {
    const [result, setResult] = useState<Array<resultType>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(()=>{
        if(hasMore) {
            setLoading(true)
            client.fetch(query)
            .then((data:Array<resultType>) => {
                setHasMore(data.length !== 0)
                setResult(prevData => [...prevData, ...data])
                setLoading(true)
            }).catch((e:Error)=>setError(e))
        }
    }, [query])
    
    return {result, loading, error, hasMore, setResult}
}

export default useLazyLoad;
