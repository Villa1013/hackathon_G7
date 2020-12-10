import * as React from 'react';
import moment from 'moment'
import { get } from '../../../services/api';
import frubanaIco from '../../../assets/images/frubana-ico.jpeg';
import jumboIco from '../../../assets/images/jumbo-ico.png';
import CO from '../../../assets/images/co.jpeg';
import MX from '../../../assets/images/mx.jpg';

const ModalWelcome = ({
	setFilterConfig,
	postScraping,
	countryId,
	setCountryId,
	scrapingId,
	setScrapingId,
	setSource
}:{
	setFilterConfig:any
	postScraping: any
	countryId: any
	setCountryId: any
	scrapingId: any
	setScrapingId: any
	setSource: any
}) => {
	const [ steps, setSteps ] = React.useState('tab1')
	const [ scrapingPiriod, setScrapingPiriod ] = React.useState([])

	const closeLoading = () => {
		setFilterConfig(true)
		postScraping(countryId, scrapingId)
	}

	const checkBrand = async (event:any) => {
		setSource(event.target.value)
		const resp =  await get(`scraping/scraping-result-detail?source=${event.target.value}`)
		const format = resp.data.data.map((item: any) => ({
			value: item.id,
			label: item.date
		}));
		setScrapingPiriod(format)
	}

	const onChangeScraping = async (event:any) => {
		setScrapingId(event.target.value)
	}
	
	const checkLocation = async (event:any) => {
		setCountryId(event.target.value)
	}

	React.useEffect(() => {
		setScrapingPiriod([])
		setScrapingId()
		setCountryId()
	  }, [])

	return (
		<div className="modal-bg">
			<div className="container-modal border border-gray-300 rounded-lg text-center p-16">

				{steps === 'tab1' &&(
				<section className="container-step">
					<h2 className="font-black text-black leading-snug text-2xl mb-2">Marca para Scraping</h2>
					<p className="text-gray-700">Seleccione la marca que desea ver en el scraping.</p>

					<div className="checkBrand">
						<div className="item">
							<input type="radio" name="brands" value="jumbo" id="jumbo" onChange={(event) => checkBrand(event)} />
							<label className="container-radio" htmlFor="jumbo">
								<div className="img"><img src={jumboIco} /></div>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="item">
							<input type="radio" name="brands" value="frubana" id="frubana" onChange={(event) => checkBrand(event)} />
							<label className="container-radio" htmlFor="frubana">
								<div className="img"><img src={frubanaIco} /></div>
								<span className="checkmark"></span>
							</label>
						</div>
					</div>

					<button className="btn btn-primary" onClick={() => setSteps('tab2')} disabled={scrapingPiriod.length === 0}>Continuar <i className="simple-icon-arrow-right-circle right"></i></button>
				</section>
				)}

				{steps === 'tab2' &&(
				<section className="container-step">
					<h2 className="font-black text-black leading-snug text-2xl mb-2">Periodo de Scraping</h2>
					<p className="text-gray-700">Selecciona el perido que quieres consultar.</p>

					<div className="w-full flex justify-center mt-16  mb-16">
						<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<div className="relative">
								{scrapingPiriod.length !== 0 && (
								<select 
									onChange={(event) => onChangeScraping(event)}
									className="block cursor-pointer appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								>
									<option value="">Periodo</option>
									{scrapingPiriod.map((item:any, index:any) => {
										return (
											<option key={index} value={item.value}>{moment(item.label).format('DD[-]MM[-]YYYY')}</option>
										)
          							})}
								</select>
								)}
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
								</div>
							</div>
						</div>
					</div>

					<button className="btn btn-primary" onClick={() => setSteps('tab3')} disabled={scrapingId === undefined}>Continuar <i className="simple-icon-arrow-right-circle right"></i></button>
				</section>
				)}

				{steps === 'tab3' &&(
				<section className="container-step">
					<h2 className="font-black text-black leading-snug text-2xl mb-2">País de Scraping</h2>
					<p className="text-gray-700">Elija el país de preferencia.</p>

					<div className="checkBrand">
						<div className="item">
							<input type="radio" name="locations" value="6" id="6" onChange={(event) => checkLocation(event)} />
							<label className="container-radio" htmlFor="6">
								<div className="img"><img src={CO} /></div>
								<span className="checkmark"></span>
							</label>
						</div>
						<div className="item">
							<input type="radio" name="locations" value="7" id="7" onChange={(event) => checkLocation(event)} />
							<label className="container-radio" htmlFor="7">
								<div className="img"><img src={MX} /></div>
								<span className="checkmark"></span>
							</label>
						</div>
					</div>

					<button className="btn btn-primary" onClick={() => closeLoading()} disabled={countryId === undefined}>Iniciar Scraping <i className="simple-icon-control-play right"></i></button>
				</section>
				)}
			</div>
		</div>
	)
}
export default ModalWelcome
