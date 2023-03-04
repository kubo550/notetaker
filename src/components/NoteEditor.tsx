import type { Note } from "@prisma/client";
import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export type CreateNote = Pick<Note, "title" | "content">;

interface NoteEditorProps {
  onSave: (note: CreateNote) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={content}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setContent(value)}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          onClick={() => {
            onSave({
              title,
              content,
            });
            setContent("");
            setTitle("");
          }}
          className="btn-primary btn"
          disabled={title.trim().length === 0 || content.trim().length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};
