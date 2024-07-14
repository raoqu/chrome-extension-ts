import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import MessageUtil from "./lib/message_util";
import OptionsUtil, { IExtensionOptions } from './lib/option_util'


const Options = () => {

  const [status, setStatus] = useState<string>("");

  /**** options ******/
  const [color, setColor] = useState<string>("");
  const [showDock, setShowDock] = useState<boolean>(false);

  const saveOptions = (options: IExtensionOptions) => {
    OptionsUtil.Save(options, () => {
      setStatus('Options saved.')
      const id = setTimeout(() => {
        setStatus("");
      }, 1000);
      return () => clearTimeout(id);
    })
  }

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    OptionsUtil.Get((options: IExtensionOptions) => {
      options = {
        ...OptionsUtil.DEFAULT_OPTIONS,
        ...options
      }
      setShowDock(options.showDock!);
    })
  }, []);

  const onSaveOptions = () => {
    // Saves options to chrome.storage.sync.
    saveOptions({
      showDock: showDock,
    })
  };

  return (
    <>
      <div>
        <label>
          <input type="checkbox" checked={showDock} onChange={(event) => setShowDock(event.target.checked)} />在页面中显示配置入口
        </label>
      </div>
      <button onClick={onSaveOptions}>Save</button>
      <div style={{ backgroundColor: '#efe', width: '100%', minWidth:'300px',margin:'5px 0 5px 0'}}>{status}</div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
