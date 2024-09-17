import React, { useState } from 'react';
import userEmpty from '../../images/user/user-empty.jpg';

interface ImageWithPlaceholderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    size?:number
}


const ImageWithPlaceholder: React.FC <ImageWithPlaceholderProps> = ({ src, alt , size = 10, ...props}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(userEmpty);
  };

  return (
    <img 
      src={imgSrc || userEmpty} 
      alt={alt} 
      onError={handleError}
      className={`w-${size} h-${size} object-cover rounded-full`}
      {...props}
    />
  );
};

export default ImageWithPlaceholder;
