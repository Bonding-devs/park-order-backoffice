import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Datepicker from 'react-tailwindcss-datepicker';
import { getDataByRange, TimeRange } from '../../utils/dateUtils';
import { useGetWOReportSummary } from '../../modules/Reports/useGetWOReportSummary';
import {
  PrincipalButton,
  SizeButton,
} from '../../components/CustomButtons/PrincipalButton';
import { ButtonsGroup } from '../../components/ButtonsGroup/ButtonsGroup';
import { enumToArray } from '../../utils/arrayHelper';
import Legend, { LegendItem } from '../../components/Legend/Legend';

const timeRanges = enumToArray(TimeRange);

const OrdersSummary: React.FC = () => {
  const [timeRange, setTimeRange] = useState(TimeRange.Day);
  const { data, date, today, handleDateChange, isLoading, error, reload } =
    useGetWOReportSummary();
  const { categories, createdOrdersSeries, finishedOrdersSeries } =
    getDataByRange(data, timeRange);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 300,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: Math.max(...createdOrdersSeries, ...finishedOrdersSeries) + 10,
    },
  };
  const legendItems: LegendItem[] = [
    {
      color: 'bg-primary',
      label: 'Created Orders',
      borderColor: 'border-primary',
      textColor: 'text-primary',
    },
    {
      color: 'bg-secondary',
      label: 'Finished Orders',
      borderColor: 'border-secondary',
      textColor: 'text-secondary',
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Created vs Finished
        </h4>
        <div className="w-100">
          <Datepicker
            value={date}
            onChange={handleDateChange}
            required={true}
            maxDate={today}
          />
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <ButtonsGroup
            values={timeRanges}
            handleClicked={(value: TimeRange) => setTimeRange(value)}
            selectedValue={timeRange}
          />
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={[
              {
                name: 'Created Orders',
                data: createdOrdersSeries,
              },
              {
                name: 'Finished Orders',
                data: finishedOrdersSeries,
              },
            ]}
            type="area"
            height={300}
          />
        </div>
        <Legend items={legendItems} />
        {isLoading && <div className="flex justify-center">Loading...</div>}
        {error && (
          <div className="flex items-center justify-center">
            <p className="mr-3">Error fetching data</p>
            <PrincipalButton
              onClick={reload}
              bgColor="bg-red"
              size={SizeButton.Small}
            >
              Retry
            </PrincipalButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersSummary;
