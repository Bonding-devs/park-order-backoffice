import React from 'react';
import { Control, FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import Loader from '../../common/LoaderPage';
import { optionStatusWorkOrders } from '../../modules/Order/configuration';
import WorkOrdersForm from '../../modules/Order/OrderWorkForm';
import WorkOrdersView from '../../modules/Order/OrderWorkView';
import { WorkOrderView } from '../../modules/Order/useWorkOrder';

interface WorkOrderDetailProps {
    showView: WorkOrderView;
    register: UseFormRegister<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    onSubmitWorkOrders: (data: any) => Promise<void>;
    control: Control<FieldValues>;
    errors: FieldErrors;
    workOrderDetail: any;
}

const WorkOrderDetail: React.FC<WorkOrderDetailProps> = ({
    showView,
    register,
    handleSubmit,
    onSubmitWorkOrders,
    control,
    errors,
    workOrderDetail,
}) => {
    switch (showView) {
        case WorkOrderView.Loading:
            return <Loader />;
        case WorkOrderView.Form:
            return (
                <WorkOrdersForm
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmitWorkOrders={onSubmitWorkOrders}
                    control={control}
                    errors={errors}
                />
            );
        case WorkOrderView.View:
            return (
                <WorkOrdersView
                    data={workOrderDetail}
                    status={optionStatusWorkOrders}
                />
            );
        default:
            return <></>;
    }
};

export default WorkOrderDetail;
