
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface PaymentMethodFormProps {
  closeModal: () => void;
  reFetchData: () => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

  }




  return (
    <div className="flex flex-col gap-9">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form className="Form" onSubmit={handleSubmit}>
          {/* <ToastContainer /> */}
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">

                {error && (
                  <div className="text-red-500 mb-4">{error.message}</div>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray text-white hover:bg-opacity-90"
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
}



export default PaymentMethodForm;
