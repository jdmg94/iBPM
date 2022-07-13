import { useState, useEffect } from "react";
import { captureAudioSample, determineBPM } from "../../AudioService";

export enum Status {
  IDLE,
  RECORDING,
  PROCESSING,
  DONE,
  ERROR,
}

export default function useRecorder(duration: number = 5000) {
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    switch (status) {
      case Status.IDLE:
        setMessage("");
        break;
      case Status.RECORDING:
        setMessage("Capturing Audio Sample");
        captureAudioSample(duration).then(({ sound }) => {
          determineBPM(sound)
            .then((bpm) => {
              setResult(bpm);
              setStatus(Status.DONE);
            })
            .catch(() => {
              setStatus(Status.IDLE);
            });
          setStatus(Status.PROCESSING);
        });
        break;
      case Status.PROCESSING:
        setMessage("Calculating Beats");
        break;
      case Status.DONE:
        setMessage(" Approximately:");
        break;
    }
  }, [status]);

  return {
    status,
    setStatus,
    message,
    result,
  };
}
