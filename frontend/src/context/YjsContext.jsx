import { createContext, useContext, useEffect } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { RoomContext } from "./RoomContext";

export const YjsContext = createContext(null);

let ydoc;
let provider;
export const YJSProvider = ({ children }) => {
  const { room } = useContext(RoomContext);
  useEffect(() => {
      ydoc = new Y.Doc();
      provider = new WebrtcProvider(room, ydoc);
      return () => {
          ydoc.destroy()
          provider.disconnect()
      }
    }, []);
    console.log("JS context", room, ydoc, provider);
  return (
    <YjsContext.Provider value={{ ydoc, provider }}>
      {children}
    </YjsContext.Provider>
  );
};
