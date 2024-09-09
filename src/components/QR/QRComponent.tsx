import QRCode from 'react-qr-code';

interface QRComponentProps{
    base64String: string
    size?: number
} 

export const QRComponent: React.FC<QRComponentProps> = ({base64String,size = 150}) => {
  
  return (
    <QRCode
      value={base64String}
      size={size}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
    />
  );
};
