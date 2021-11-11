import { useEffect, useState } from "react";
import client from "../client";
import { Post, Product } from "../generalTypes";

const useLazyLoad = (query:string | undefined, incrementBy: number, initialResult?:(Array<Product> | Array<Post>)) => {
    const [result, setResult] = useState<Array<Product | Post>>(initialResult ?? []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const [hasMore, setHasMore] = useState(true);

    useEffect(()=>{
        if(hasMore && query) {
            setLoading(true)
            client.fetch(query)
            .then((data:Array<Product> | Array<Post>) => {
                // IncrementBy is currently one bigger than the number we want so that we can check if there are more. Can probably get better by using tagged template string. 
                if(data.length > incrementBy) {
                    setHasMore(true)
                    // pops the last check=item
                    data.pop()
                } else {
                    setHasMore(false)
                }
                setResult(prevData => [...prevData, ...data])
                setLoading(false)
            }).catch((e:Error)=>setError(e))
        }
    }, [query])
    
    return {result, loading, error, hasMore, setResult}
}

export default useLazyLoad;
