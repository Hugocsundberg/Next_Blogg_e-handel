import { useEffect, useState } from "react";
import client from "../client";
import { PostLight, Product } from "../generalTypes";

const useLazyLoad = <T>(
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
          // IncrementBy is currently one bigger than the number we want so that we can check if there are more. Can probably get better by using tagged template string.
          if (data.length > incrementBy) {
            setHasMore(true);
            // pops the last check=item
            data.pop();
          } else {
            setHasMore(false);
          }

          setResult((prevData): Array<Product> | Array<PostLight> => {
            console.log({ prevData, data });
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
            console.log("error");
            const ErrorArray: Array<Error> = [...errors];
            ErrorArray.push(new Error("Multiple types in Array"));
            setErrors(ErrorArray);
            return [];
          });
          setLoading(false);
        })
        .catch((e: Error) => {
          const ErrorArray: Array<Error> = [...errors];
          ErrorArray.push(new Error("Multiple types in Array"));
          setErrors(ErrorArray);
        });
    }
  }, [query]);

  useEffect(() => {
    if (errors.length > 0) console.error(errors);
  }, [errors]);

  return { result, loading, errors, hasMore, setResult };
};

export default useLazyLoad;
