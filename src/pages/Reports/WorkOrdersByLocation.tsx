import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useGetWOByLocation } from '../../modules/Reports/useGetWOByLocation';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  PrincipalButton,
  SizeButton,
} from '../../components/CustomButtons/PrincipalButton';

const WorkOrdersByLocation: React.FC = () => {
  const { data, date, handleDateChange, today, isLoading, error, reload } =
    useGetWOByLocation();

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      fontFamily: 'Satoshi, sans-serif',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '10%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '10%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.locations.map((location) => location.locationName),
    },
    colors: ['#3C50E0', '#80CAEE', '#FF4560'],
    fill: {
      opacity: 1,
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },

    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        radius: 99,
      },
    },
  };

  const series = [
    {
      name: 'Count',
      data: data.locations.map((location) => location.count),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-4 flex justify-between ">
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Work orders by location
          </h4>
        </div>
        <div className="w-100">
          <Datepicker
            value={date}
            onChange={handleDateChange}
            required={true}
            maxDate={today}
          />
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      </div>
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
  );
};

export default WorkOrdersByLocation;
