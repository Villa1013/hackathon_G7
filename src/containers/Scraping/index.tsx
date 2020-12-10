import React from "react";
import { get } from '../../services/api';
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import { Row, Col } from "../../components/Grid";
import ModalFilter from "./component/modal-welcome";
import ResultTable from "./component/result-table";
import FilterList from "./component/filter-list";
import jumboIco from '../../assets/images/jumbo-ico.png';
import frubanaIco from '../../assets/images/frubana-ico.jpeg';
import chiperIco from '../../assets/images/chiper-ico.png';
import './styles.sass'

const Home = () => {
    const [ loading, setLoading ] = React.useState(true)
    const [ filterConfig, setFilterConfig ] = React.useState(false)
    const [ dataScraping, setDataScraping ] = React.useState([])
    const [ countryId, setCountryId ] = React.useState()
    const [ scrapingId, setScrapingId ] = React.useState([])
    const [ source, setSource ] = React.useState()
    // const [ piriod, setPiriod ] = React.useState()

    const newFilter = () => {
        setLoading(true)
        setFilterConfig(false)
    }

    const postScraping = async (countryId:number, scrapingResultsId:number) => {
		try {
            const resp =  await get(`scraping/scraping-result-detail-by-resultid?countryId=${countryId}&scrapingResultsId=${scrapingResultsId}`)
            setDataScraping(resp.data.data)
            setTimeout(function(){ 
                setLoading(false) 
            }, 3000);
		} catch (error) {
            return error
		}
    }

    return (
        <>  
            {!filterConfig &&(
                <ModalFilter 
                    setFilterConfig={setFilterConfig} 
                    postScraping={postScraping}
                    countryId={countryId}
                    setCountryId={setCountryId}
                    scrapingId={scrapingId}
                    setScrapingId={setScrapingId}
                    setSource={setSource}
                />
            )}
            
            <Header />

            {loading &&(<Loader />)}
            
            {!loading &&(
            <>
                <Wrapper className="w-full" style={{ marginTop: 30, marginBottom: 30 }}>

                    <Row className="w-full">
                        <Col xl={4} lg={4} md={12} xs={12}>
                            <div className="card">
                                <div className="text-center card-body">
                                    <div className="flex">
                                        <div className="h-full border-box p-5 bg-gray-100">
                                            <i className="iconsminds-basket-coins"></i>
                                        </div>
                                        <div className="info px-3">
                                            <h4 className="card-text font-weight-semibold mb-0 font-black mt-3 text-lg">Chiper</h4>
                                            <p className="card-text font-weight-semibold mb-0 text-sm text-gray-600 font-semibold">Colombia</p>
                                            <span className="tag-nice">Mejor precio en: 32 Ref.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={12} xs={12}>
                            <div className="card">
                                <div className="text-center card-body">
                                    <div className="flex">
                                        <div className="h-full border-box p-5 bg-gray-100">
                                            <i className="iconsminds-basket-coins"></i>
                                        </div>
                                        <div className="info px-3">
                                            <h4 className="card-text font-weight-semibold mb-0 font-black mt-3 text-lg">Frubana</h4>
                                            <p className="card-text font-weight-semibold mb-0 text-sm text-gray-600 font-semibold">Colombia</p>
                                            <span className="tag-discount">Mejor precio en: 44 Ref.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={12} xs={12}>
                            <div className="card">
                                <div className="text-center card-body">
                                    <div className="flex">
                                        <div className="h-full border-box p-5 bg-gray-100">
                                            <i className="iconsminds-basket-coins"></i>
                                        </div>
                                        <div className="info px-3">
                                            <h4 className="card-text font-weight-semibold mb-0 font-black mt-3 text-lg">Jumbo</h4>
                                            <p className="card-text font-weight-semibold mb-0 text-sm text-gray-600 font-semibold">Colombia</p>
                                            <span className="tag-discount">Mejor precio en: 12 Ref.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <h1 className="card-title mt-6 mb-5 grid grid-cols-2 border-b border-gray-300">
                        <span>Results Scraping</span>
                        <div className="active-filter flex items-center justify-end">
                            <h5 className="text-sm mr-2">Hace 1 mes - <span className="text-gray-700 capitalize">({source || 'Chiper'})</span></h5>
                            <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden border border-gray-300">
                                <img src={source === 'jumbo' ? jumboIco : source === 'frubana' ? frubanaIco : chiperIco} />
                            </div>
                        </div>
                    </h1>

                    <FilterList 
                        scrapingId={scrapingId}
                        countryId={countryId}
                        newFilter={newFilter}
                        setDataScraping={setDataScraping}
                    />
                    
                    <ResultTable 
                        dataScraping={dataScraping}
                    />
                </Wrapper>
            </>
            )}
        </>
    );
};

export default Home;
