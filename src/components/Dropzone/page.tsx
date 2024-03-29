"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  className: string;
}

interface ExtendedFile extends File {
  preview: string;
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const [files, setFiles] = useState<ExtendedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form>
      <div {...getRootProps({ className: props.className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.name}
            <Image src={file.preview} alt="" width={100} height={100} />
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Dropzone;
