"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

const AuthScreen: FC<PropsWithChildren> = ({ children }) => {
  const [api_key, setApiKey] = useLocalStorage("api_key");
  const [value, setValue] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = () => {
    setApiKey(value);
  };

  if (!mounted) return null;

  if (api_key) return children;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <input
        type="text"
        placeholder="api_key"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type={"button"} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AuthScreen;
