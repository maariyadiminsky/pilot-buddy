import { ChangeEvent, useState } from 'react';

const DEFAULT_MAX_FILE_SIZE = 1024 * 1024;

const ERROR = {
  CANNOT_READ_FILE: 'Error reading file.',
  FILE_SIZE_EXCEED_ERROR: 'Image size exceeds the 1MB limit. Please choose a smaller image.',
};
export const useImageUpload = (maxFileSize?: number) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState('');

  const readFileAsDataURL = async (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        const result = event.target?.result as string;
        resolve(result);
      };

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException(ERROR.CANNOT_READ_FILE));
      };

      fileReader.readAsDataURL(file);
    });

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.size > (maxFileSize || DEFAULT_MAX_FILE_SIZE)) {
      setFileSizeError(ERROR.FILE_SIZE_EXCEED_ERROR);
      return;
    }

    setFileSizeError('');

    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setImageSrc(dataUrl);
    } else {
      setImageSrc(null);
    }
  };

  return {
    imageSrc,
    fileSizeError,
    setFileSizeError,
    handleImageChange,
  };
};
