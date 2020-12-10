/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Analytics = () => {

	const LineOne = {
		chart: {
			type: 'area',
			height: '380px',
		},
		title: null,
		legend: {
			align: 'right',
			verticalAlign: 'top',
			borderWidth: 0,
			itemStyle: {
				color: '#363636',
				fontWeight: 'normal',
				fontSize: '11px',
			},
		},
		yAxis: {
			title: {
				text: null,
			},
		},
		plotOptions: {
			area: {
				fillOpacity: 0,
				showInLegend: false,
			},
		},
		tooltip: {
			borderRadius: 6,
			borderWidth: 0,
			padding: 10,
			backgroundColor: '#FFFFFF',
			style: {
				color: '#363636',
				fontSize: '11px',
			},
			useHTML: true
		},
		series: [{
			name: 'Tienda 3º',
			data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
		}, {
			name: 'Tienda 2º',
			data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
		}, {
			name: 'My Orders',
			data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
		}]
	}

	return (
		<div className="clearflex p-6">
			<HighchartsReact highcharts={Highcharts} options={LineOne} />
		</div>
	)
}
export default Analytics
