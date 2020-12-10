import * as React from 'react';
import { locationData } from "../constanst/locations";
import { get } from '../../../services/api';

const FilterList = ({
    countryId,
    newFilter,
    scrapingId,
    setDataScraping
}:{
    countryId: any
    newFilter: any
    scrapingId: any
    setDataScraping: any
}) => {
    const [ category, setCategory ] = React.useState([])
    const [ categoryId, setCategoryId ] = React.useState('')
    const [ cityId, setCityId ] = React.useState('')

    const complementGet = async () => {
        const resp =  await get(`scraping/scraping-categories?scrapingResultsId=${scrapingId}&countryId=${countryId}`)
        const format = resp.data.data.map((item: any, index:any) => ({
			value: index,
			label: item
        }));
        setCategory(format)
    }
    
    const renderCity = (data:any) => {
        const filter = locationData.filter((item: any) => item.countryId === parseInt(data))
        return filter.map((item:any, index: any) => {
            return <option key={index} value={item.value}>{item.name}</option>
        });
    }

    const onChangeCategory = async (event:any) => {
        setCategoryId(event.target.value)
        try {
            const resp =  await get(`scraping/scraping-result-detail-by-resultid?cityId=${cityId}&countryId=${countryId}&scrapingResultsId=${scrapingId}&macroCategoryName=${event.target.value}`)
            setDataScraping(resp.data.data)
		} catch (error) {
            return error
		}
    }
    
    const onChangeCity = async (event:any) => {
        setCityId(event.target.value)
        try {
            const resp =  await get(`scraping/scraping-result-detail-by-resultid?cityId=${event.target.value}&countryId=${countryId}&scrapingResultsId=${scrapingId}&macroCategoryName=${categoryId}`)
            setDataScraping(resp.data.data)
		} catch (error) {
            return error
		}
	}

    React.useEffect(() => {
        complementGet()
	}, [])

	return (
        <div className="w-full border-box grid grid-cols-5 border-b border-gray-300">
            <div className="w-full h-full border-box p-3">
                <div className="relative">
                    <select 
                        onChange={(event) => onChangeCity(event)}
                        className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-sm  h-10"
                    >
                        <option value="">Ciudad</option>
                        {renderCity(countryId)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className="w-full h-full border-box p-3">
                <div className="relative">
                    <select 
                        onChange={(event) => onChangeCategory(event)}
                        className="block cursor-pointer appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500 text-sm  h-10"
                    >
                        <option value="">Categoría</option>
                        {category.map((item:any, index:any) => {
                            return (
                                <option key={index} value={item.label}>{item.label}</option>
                            )
                        })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className="w-full h-full border-box p-3 justify-end"></div>
            <div className="w-full h-full border-box p-3 justify-end"></div>
            <div className="w-full h-full border-box p-3 pr-0 justify-end">
                <button className="btn btn-primary rounded-full p-3 float-right" onClick={() => newFilter()}>
                    <i className="simple-icon-equalizer m-0"></i>
                </button>
            </div>
        </div>
	)
}
export default FilterList
