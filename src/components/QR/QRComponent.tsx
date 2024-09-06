import { QRCode } from 'react-qrcode-logo';

interface QRComponentProps{
    base64String: string
} 

export const QRComponent: React.FC<QRComponentProps> = ({base64String}) => {
  return (
    <QRCode
      value={base64String}
      size={100}
      bgColor={'#ffffff'}
      fgColor={'#000000'}
      qrStyle="squares"
      eyeRadius={10}
    />
  );
};
