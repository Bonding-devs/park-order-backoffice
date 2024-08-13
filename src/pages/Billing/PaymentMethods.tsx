import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../common/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import DefaultLayout from '../../layout/DefaultLayout';
import PaymentMethodForm from './PaymentMethodForm';
import { CustomGrid } from '../../components';
import { columnPaymentMethod } from '../../modules/PaymentMethod/configuration';

const PaymentMethodsPage: React.FC = () => {
  const {
    paymentMethods,
    loading,
    error,
    cretePaymentMethodIntent,
    clientSecret,
    reFetchDataPaymentMethods,
  } = usePaymentMethods();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    cretePaymentMethodIntent();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Payment Methods"
          baseName={'Payments'}
          reDirectionUrl="/payments/payment-methods"
        />
        <ToastContainer />
        <div className="">
          <Modal buttonText="Add payment method">
            {({ closeModal }) => (
              <PaymentMethodForm
                clientSecret={clientSecret}
                closeModal={closeModal}
                reFetchData={reFetchDataPaymentMethods}
              />
            )}
          </Modal>

          <CustomGrid
            customData={paymentMethods}
            customColumn={columnPaymentMethod}
            loading={loading}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default PaymentMethodsPage;
