import React, { useEffect, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  SingleAxisComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

export interface IBarChart {
  name: string;
  value: number;
}

interface IProps {
  title?: string;
  height?: number;
  color?: string[];
  chartData: IBarChart[];
}

const MyBarChart: React.FC<IProps> = (props) => {
  const { height = 400, chartData, color = ['#29a2ed'] } = props;
  const [currentName, setCurrentName] = useState<string[]>([]);
  const [currentVal, setCurrentVal] = useState<number[]>([]);

  const serializeData = () => {
    const name: string[] = [];
    const val: number[] = [];
    const currentData = [...chartData].sort((a, b) => b.value - a.value);
    currentData.forEach((item) => {
      name.push(item.name);
      val.push(item.value);
    });
    setCurrentName(name);
    setCurrentVal(val);
  };

  useEffect(() => {
    if (chartData.length > 0) {
      serializeData();
    }
  }, [chartData]);
  const options = {
    color,
    grid: {
      top: 40,
      left: 0,
      right: 20,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      borderColor: '#dae1f4',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 5,
      textStyle: {
        color: '#333',
        fontSize: 12,
      },
      // eslint-disable-next-line no-restricted-syntax
      formatter(params: any) {
        return `<div>
          ${params.name}
          <div>
            <span style=background-color:${params.color}></span>
            XX数量: ${currentVal[params.dataIndex]}
          </div>
        </div>`;
      },
    },
    xAxis: {
      type: 'category',
      data: currentName,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        formatter: (value: string) => {
          return value;
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          borderRadius: 100,
        },
        data: currentVal,
      },
    ],
  };
  echarts.use([
    BarChart,
    GridComponent,
    TooltipComponent,
    SingleAxisComponent,
    LegendComponent,
    CanvasRenderer,
  ]);

  return (
    <ReactEChartsCore
      option={options}
      lazyUpdate={true}
      echarts={echarts}
      style={{ height, width: '100%' }}
    />
  );
};

export default MyBarChart;
