import React, {useState, useEffect} from 'react'
import millify from 'millify'
import {Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'


import {useGetCryptosQuery} from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10:100;
  const {data:cryptosList} = useGetCryptosQuery(count);
  const [cryptos, setcryptos]=useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  // if(isFetching) return "Loading..."
   
  

  useEffect(() => {
    setcryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setcryptos(filteredData);
  }, [cryptosList, searchTerm]);

  // console.log(cryptos)
  return (
   <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
   
     <Row gutter={[32, 32]} className="crypto-card-container">

     {cryptos?.map((currency) =>(

       <Col xs={24}  sm={12} lg={6} className="crypto-card" key={currency.uuid}>
         <Link to={`/crypto/${currency.uuid}`} key={currency.uuid}>
           <Card
             title={`${currency.rank}. ${currency.name}`}
             extra={<img className="crypto-image" src={currency.iconUrl} alt="crypto" />}
             hoverable
           >
             <p>Price: {millify(currency.price)}</p>
             <p>Market Cap: {millify(currency.marketCap)}</p>
             <p>Daily Change: {currency.change}%</p>
           </Card>
           </Link>
         </Col>
     ))}
     </Row> 

     
    
   </>
  )
}

export default Cryptocurrencies 