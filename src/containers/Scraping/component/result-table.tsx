import * as React from 'react';
import { locationData } from "../constanst/locations";

const ResultTable = ({
	dataScraping
}:{
	dataScraping: any
}) => {
	
	const filterLocation = (id:any) => {
		const filter = locationData.filter((item: any) => item.value === id)
		return filter[0].name;
	}

	const formatterCO = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
	})

	return (
        <section className="table-divided w-full">
			<table className="chiper-table">
				<thead>
					<tr>
						<th>Ciudad</th>
						<th>Macro Categoria</th>
						<th>Reference</th>
						<th>Promotional</th>
						<th>Cheque de Precio</th>
					</tr>
				</thead>
				<tbody>
					{dataScraping.length > 0 ? (
					dataScraping.map((item: any, index:any) => {
						return (
						<tr key={index}>
							<td>{filterLocation(item.cityId)}</td>
							<td>{item.macroCategoryName}</td>
							<td>{item.name}</td>
							<td>{item.hasDiscount ? 'Si':'No'}</td>
							<td>{formatterCO.format(item.price || '0.00')}</td>
						</tr>
						)
					})
					) : (
						<tr className="no-results">
							<td className="error-result" colSpan={6}>
								<p><i className="iconsminds-sand-watch-2"></i> No hay datos...</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	)
}
export default ResultTable
