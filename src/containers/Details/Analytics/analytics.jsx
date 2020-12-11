/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { postMap } from '../../../utils/requests/postMap';

const Analytics = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    postMap(334250, 117, 3).then((dataMap) => {
      const serieFormat = dataMap.map((item,index) => ({
        name: item.date.value,
        y: item.orderRate,
        drilldown: item.storeReference,
      }))
      console.log(serieFormat)
      setData(serieFormat);
    });
  }, []);

  const LineOne = {
    chart: {
      type: 'column'
    },
    title: 'dsdsds',
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: null
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },
    tooltip: {
      borderRadius: 6,
			borderWidth: 0,
			padding: 10,
			backgroundColor: '#FFFFFF',
			style: {
				color: '#363636',
				fontFamily: "avenir",
				fontSize: '11px',
			},
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> pedidos<br/>'
    },
    series: [
      {
        name: "Fecha:",
        colorByPoint: true,
        data: data
      }
    ]
  };

  return (
    <div className="clearflex p-6">
      <HighchartsReact highcharts={Highcharts} options={LineOne} />
    </div>
  );
};
export default Analytics;
