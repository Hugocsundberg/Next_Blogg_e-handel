import { useEffect, useState } from "react";
import client from "../client";
import { PostLight, Product } from "../generalTypes";

const useLazyLoad = (
  query: string | undefined,
  incrementBy: number,
  initialResult?: Array<Product> | Array<PostLight>
) => {
  const [result, setResult] = useState<Array<Product> | Array<PostLight> | []>(
    initialResult ?? []
  );
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Array<Error>>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (hasMore && query) {
      setLoading(true);
      client
        .fetch(query)
        .then((data: Array<Product> | Array<PostLight>) => {
          // IncrementBy is currently one bigger than the number we want so that we can check if there are more. Function could be made cleaner by using tagged template strings for query increments.
          if (data.length > incrementBy) {
            setHasMore(true);
            // pops the last item if more items available.
            data.pop();
          } else {
            setHasMore(false);
          }

          setResult((prevData): Array<Product> | Array<PostLight> => {
            // Make sure arrays are of the same type
            if (prevData.length === 0 || data.length === 0) {
              return [...prevData, ...data] as Array<any>;
            }
            if (
              "lastReservedAt" in prevData[0] &&
              "lastReservedAt" in data[0]
            ) {
              return [...prevData, ...data] as Array<Product>;
            }
            if (
              !("lastReservedAt" in prevData[0]) &&
              !("lastReservedAt" in data[0])
            ) {
              return [...prevData, ...data] as Array<PostLight>;
            }
            const ErrorArray: Array<Error> = [...errors];
            ErrorArray.push(new Error("Multiple types in Array"));
            setErrors(ErrorArray);
            return [];
          });
          setLoading(false);
        })
        .catch((e: Error) => {
          const ErrorArray: Array<Error> = [...errors];
          ErrorArray.push(e);
          setErrors(ErrorArray);
        });
    }
  }, [query]);

  useEffect(() => {
    if (errors.length > 0) console.error(errors);
  }, [errors]);

  return { result, loading, hasMore, setResult };
};

export default useLazyLoad;
