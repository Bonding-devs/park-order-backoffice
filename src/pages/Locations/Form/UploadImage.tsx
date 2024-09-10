import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { uploadImage } from '../../../api/imagesApi';
import { IoClose } from 'react-icons/io5';
import { ErrorText } from '../../../components/Text/ErrorText';
import { ImageDetails } from '../../../models/image-details';
import axios, { CancelTokenSource } from 'axios';

interface UploadImageProps {
  uploadedFile?: ImageDetails;
  setUploadedFile?: (option: ImageDetails) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  setUploadedFile,
  uploadedFile,
}) => {
  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(50);
  const [showPopUp, setShowPopUp] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);


  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowPopUp(true);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setCancelTokenSource(source);
    try {
      const data = await uploadImage({
        file,
        setUploadProgress,
        cancelTokenSource:source,
      });
      setUploadedFile({ name: file.name, path: data.path, id: data.id });
      setIsUploading(false);
      setShowPopUp(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setShowPopUp(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('file', file);
      clearErrors('file');
      setFilePreview(URL.createObjectURL(file));
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const handleCancel = () => {
    console.log('cancel')
    setShowPopUp(false);
    if (cancelTokenSource) {
      console.log('abort')
      cancelTokenSource.cancel('Upload canceled by the user.');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!uploadedFile ? (
        <div className="block">
          <input
            type="file"
            {...register('file')}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-3  text-white hover:bg-blue-600"
          >
            Choose Image
          </label>
          {errors.file && (
            <div className="mt-3">
              <ErrorText error="Please select an image file to upload." />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <img
            src={filePreview ?? uploadedFile.path}
            alt="Preview"
            className="h-12 w-12 rounded-md object-cover"
          />
          <p className="text-gray-700 break-all">{uploadedFile.name}</p>
          <div className='pr-6'>
          <button
            onClick={removeFile}
            className="text-red-500 hover:text-red-600"
          >
            <IoClose size={24} />
          </button>
          </div>
        </div>
      )}

      {showPopUp && (
        <div className="fixed left-1/2 top-1/2 z-50 w-180 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-6 shadow-lg">
          <h3 className="text-gray-700 text-lg font-semibold">
            Uploading File
          </h3>
          {isUploading ? (
            <div className="flex flex-col">
              <div className="bg-gray-200 mt-2 h-2.5 w-full rounded-full border-red ">
                <div className=" rounded-full border-[1.5px] border-stroke">
                  <div
                    className="h-2.5 rounded-full bg-green-500"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="mt-2 text-sm">{uploadProgress}%</p>
              <button
                onClick={handleCancel}
                className="hover:bg-red-600 mt-4 self-end rounded-md bg-red px-3 py-1 text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-green-600">File uploaded successfully!</p>
          )}
        </div>
      )}
    </div>
  );
};
