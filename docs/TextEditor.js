import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import "./style_note.css";
import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() { 
  const { id: documentId } = useParams();
  const [socketState, setSocket] = useState(null);
  const [quillState, setQuill] = useState(null);

  // Set up socket connection
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  // Load document when socket and quill are ready
  useEffect(() => {
    if (socketState == null || quillState == null) return;

    socketState.once("load-document", document => {
      try {
        const parsedDocument = JSON.parse(document); // JSON 문자열을 객체로 변환
        quillState.setContents(parsedDocument);
        quillState.enable();
      } catch (error) {
        console.error("Error parsing document data:", error);
      }
    });

    socketState.emit("get-document", documentId);
  }, [socketState, quillState, documentId]);

  // Save document periodically
  useEffect(() => {
    if (socketState == null || quillState == null) return;

    const interval = setInterval(() => {
      const contents = quillState.getContents();
      socketState.emit("save-document", JSON.stringify(contents)); // Delta 객체를 JSON 문자열로 변환
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socketState, quillState]);

  // Receive changes from other clients
  useEffect(() => {
    if (socketState == null || quillState == null) return;

    const handler = delta => {
      quillState.updateContents(delta);
    };
    socketState.on("receive-changes", handler);

    return () => {
      socketState.off("receive-changes", handler);
    };
  }, [socketState, quillState]);

  // Send changes to other clients
  useEffect(() => {
    if (socketState == null || quillState == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socketState.emit("send-changes", delta);
    };
    quillState.on("text-change", handler);

    return () => {
      quillState.off("text-change", handler);
    };
  }, [socketState, quillState]);

  // Initialize Quill editor
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quill.disable();
    quill.setText("Loading...");
    setQuill(quill);
  }, []);

  return (
    <div className="notebook">
      <div id="container" ref={wrapperRef}>TextEditor</div>
    </div>
  );
}
