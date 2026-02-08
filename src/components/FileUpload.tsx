"use client";

import { useCallback, useRef, useState } from "react";
import { UploadedFile } from "@/types";

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  acceptedTypes?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({
  files,
  onFilesChange,
  acceptedTypes = ".pdf,.doc,.docx,.txt,.pptx,.xlsx",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      if (file.type === "text/plain") {
        reader.onload = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            content: reader.result as string,
          });
        };
        reader.readAsText(file);
      } else {
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1] || "";
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            content: base64,
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      const newFiles: UploadedFile[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const processed = await processFile(fileList[i]);
        newFiles.push(processed);
      }
      onFilesChange([...files, ...newFiles]);
    },
    [files, onFilesChange, processFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleRemove = useCallback(
    (index: number) => {
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange]
  );

  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Carica documenti (opzionale)
      </label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
          className="hidden"
        />
        <svg
          className="w-8 h-8 mx-auto text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm text-gray-500">
          Trascina i file qui o{" "}
          <span className="text-indigo-600 font-medium">sfoglia</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PDF, DOC, DOCX, TXT, PPTX, XLSX
        </p>
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200"
            >
              <div className="flex items-center gap-2 min-w-0">
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-700 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
