import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuillEditor = ({ value, onChange }) => (
  <ReactQuill
    theme="snow"
    value={value}
    onChange={onChange}
    placeholder="Explanation"
    modules={{
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    }}
  />
);

export default ReactQuillEditor;
