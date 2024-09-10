import { useEffect, useState } from 'react';
import { fetchQrCode } from '../../../api/locationsApi';
import { toast } from 'react-toastify';
import { QRComponent } from '../../../components/QR/QRComponent';
import { PreviewModal } from '../../../components/Common/PreviewModal';

interface LocationQrCodeProps {
  id: string;
}

export const LocationQrCode: React.FC<LocationQrCodeProps> = ({ id }) => {
  const [qrCode, setQrCode] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

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

  const onHandleClick = () => {
    setIsQrOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-37.5 w-37.5 items-center justify-center rounded-lg bg-gray">
          <p className="text-gray-600 ">Loading...</p>
        </div>
      ) : qrCode ? (
        <div onClick={onHandleClick}>
          <QRComponent base64String={qrCode} />
        </div>
      ) : error ? (
        <div>error </div>
      ) : null}

      {isQrOpen && qrCode && (
        <PreviewModal modalOpen={isQrOpen} setModalOpen={setIsQrOpen} title='QR Code'>
            <QRComponent base64String={qrCode} size={500} />
          </PreviewModal>
        
      )}
    </>
  );
};
