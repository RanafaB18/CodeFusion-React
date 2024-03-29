import { useContext, useState } from "react";
import OutputWindow from "./OutputWindow";
import { Buffer } from "buffer";
import axios from "axios";
import CustomInput from "./CustomInput";
import { YjsContext } from "../context/YjsContext";
const Compiler = ({ ytext }) => {
  const { language } = useContext(YjsContext)
  const [outputDetails, setOutputDetails] = useState(null)
  const [customInput, setCustomInput] = useState('')
  const [processing, setProcessing] = useState(null);

  const handleCompile = () => {
    if (!/\S/.test(ytext.toString())) {
      ytext.applyDelta([{ insert: "Enter some code"}])
      setTimeout(() => {
        ytext.delete(0, ytext.length)
      }, 1000);
      return
    }
    setProcessing(true)
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: Buffer.from(ytext.toString()).toString("base64"),
      stdin: Buffer.from(customInput).toString("base64"),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
    setCustomInput("");
  };
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: import.meta.env.VITE_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputDetails(response.data);
        setProcessing(false)
        return;
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="flex flex-col p-1 text-red-700">
      <div className="flex items-center justify-between mx-4">
        <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
          Output
        </h1>
        <button
          className="font-bold text-lg bg-[#1e293b] text-white py-1 px-4 rounded mb-2"
          onClick={handleCompile}
          disabled={processing}
        >
          {processing === true ? "Processing" : "Compile & Execute"}
        </button>
      </div>
      <div className="grid grid-flow-row md:grid-cols-3 mx-1 gap-1">
        <OutputWindow outputDetails={outputDetails} />
        <CustomInput customInput={customInput} setCustomInput={setCustomInput}/>
      </div>
    </div>
  );
};

export default Compiler;
