'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
  isMultiple: boolean;
  onFilesChanged: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = (props) => {
  const { isMultiple, onFilesChanged } = props;

  const onFilesChangedRef = useRef(onFilesChanged);

  const { setNodeRef } = useDroppable({ id: 'file-drop-zone' });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        setFiles((prev) => {
          if (isMultiple) {
            return [...prev, ...newFiles];
          } else {
            return newFiles;
          }
        });
      }
    },
    [isMultiple]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer.files) {
        const newFiles = Array.from(event.dataTransfer.files);
        setFiles((prev) => {
          if (isMultiple) {
            return [...prev, ...newFiles];
          } else {
            return newFiles;
          }
        });
      }
    },
    [isMultiple]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    onFilesChangedRef.current = onFilesChanged;
  }, [onFilesChanged]);

  useEffect(() => {
    onFilesChangedRef.current(files);
  }, [files]);

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
        multiple={isMultiple}
        accept='image/*'
      />
    </section>
  );
};

export default DropZone;
