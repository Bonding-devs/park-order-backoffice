import { useEffect, useState } from 'react';
import { fetchQrCode } from '../../../api/locationsApi';
import { toast } from 'react-toastify';
import { QRComponent } from '../../../components/QR/QRComponent';

interface LocationQrCodeProps {
  id: string;
}

export const LocationQrCode: React.FC<LocationQrCodeProps> = ({ id }) => {
  const [qrCode, setQrCode] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const loadQrCode = async () => {
    setIsLoading(true);
    try {
      const qr = await fetchQrCode(id);
      setQrCode(qr);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!qrCode) {
      loadQrCode();
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <div className="h-25 w-25 bg-gray flex items-center justify-center rounded-lg">
          <p className="text-gray-600 ">Loading...</p>
        </div>
      ) : qrCode ? (
        <QRComponent base64String={qrCode} />
      ) : error ? (
        <div>error </div>
      ) : null}
    </>
  );
};
