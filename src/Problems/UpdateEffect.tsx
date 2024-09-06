import { useEffect, useState } from "react";
import { useUpdateEffect } from "../hooks";

export const UpdateEffect = () => {
  const [customEffectCount, setCustomEffectCount] = useState(0);
  const [reactCount, setReactCount] = useState(0);
  const incCustomEffectCount = () => setCustomEffectCount((prev) => prev + 1);
  const incReactCount = () => setReactCount((prev) => prev + 1);

  useUpdateEffect(() => {
    console.log("useUpdateEffectRan : ", customEffectCount);
    return () => {
      console.log("cleanup useUpdateEffect");
    };
  }, [customEffectCount]);

  useEffect(() => {
    console.log("useEffectRan : ", reactCount);
    return () => {
      console.log("cleanup useEffect");
    };
  }, [reactCount]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <p>Custom Effect Counter : {customEffectCount}</p>
      <button onClick={incCustomEffectCount}>Increment counter</button>

      <p>React Effect Counter : {reactCount}</p>
      <button onClick={incReactCount}>Increment counter</button>
    </div>
  );
};
