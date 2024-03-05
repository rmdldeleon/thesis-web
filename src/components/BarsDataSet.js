import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  // yAxis: [
  //   {
  //     label: 'rainfall (mm)',
  //   },
  // ],

  sx: {
    // [`.${axisClasses.left} .${axisClasses.label}`]: {
    //   transform: 'translate(-20px, 0)',
    // },

  },

};

const options = {
  legend: {
    display: false
  }
};

const dataset = [
  {
    SMS: 100,
    a: 'TreeList',
  },
  {
    SMS: 100,
    a: 'DoublyList',
  },
  {
    SMS: 100,
    c: 'CircularList',
  },
  {
    SMS: 100,
    d: 'DynamicArray',
  },
  {
    SMS: 100,
    e: 'TraditionalArray',
  },
];

const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[
        { scaleType: 'band', dataKey: 'a' },
        { scaleType: 'band', dataKey: 'b' },
        { scaleType: 'band', dataKey: 'c' },
        { scaleType: 'band', dataKey: 'd' },
        { scaleType: 'band', dataKey: 'e' },
      ]}

      series={[
        { dataKey: 'SMS', label: 'qwe', valueFormatter },
      ]}

      {...chartSetting}
    />
  );
}