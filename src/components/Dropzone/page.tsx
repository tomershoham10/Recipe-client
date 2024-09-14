'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useDroppable } from '@dnd-kit/core';
// import Button, { ButtonColors, ButtonTypes } from '../Button/page';

interface DropZoneProps {
  onFilesChanged: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = (props) => {
  const { onFilesChanged } = props;
  const { setNodeRef } = useDroppable({ id: 'file-drop-zone' });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFiles([...event.target.files]);
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFiles((prev) => [...prev, ...event.dataTransfer.files]);
    }
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    onFilesChanged(files);
  }, [files, onFilesChanged]);

  return (
    <section
      ref={setNodeRef}
      className='flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-recipeGray-dark bg-recipeGray-light p-4'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <section className='text-recipeBrown-dark text-8xl'>
        <FaCloudUploadAlt />
      </section>
      <p className='font-bold'>Drag & Drop your files here</p>
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
        multiple
      />
    </section>
  );
};

export default DropZone;
