import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios'

function Calc() {
    
    const [finalGas, setFinalGas] = useState()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [dollar, setDollar] = useState()

    const mintPriceRef = useRef(null)
    const gasLimitRef = useRef(null)
    const maxGasRef = useRef(null)
    const maxPrioRef = useRef(null)
    const result = useRef(null)

    let isMounted = true
    useEffect(() => {

       const getData = async () => {
        try{
            const url ='https://api.etherscan.io/api?module=stats&action=ethprice&apikey=JZP1ZQ7SECZAHT8C4629YMISF2VABZTSEJ'
            const res = await axios.get(url)
            setData(res.data)
            setLoading(false)
        } 
        catch(error) {
            console.log('error');
        }
    }
       if (isMounted) getData()
       return () => {
           isMounted = false
        }
    }, [])

    const calcGas = () => {
        let mintPrice = mintPriceRef?.current.value;
        let gasLimit = gasLimitRef?.current.value;
        let maxGas = maxGasRef?.current.value;
        let maxPrio = maxPrioRef.current.value;
        let gweiCalc = (Number(gasLimit)) * (Number(maxGas) + Number(maxPrio))
        let feeCalc = ((gweiCalc * 10e-10) + Number(mintPrice))
        let price = feeCalc * data.result.ethusd
        setFinalGas(feeCalc.toFixed(5)) //This sets the final gas fee
        setDollar(price.toFixed(2)) //This sets the final gas fee in dollars
        
        feeCalc? result.current.style.display = 'flex': null;x
    }

    return(
    <>
        <main id='main' className='col'>
            <div id='calc' className='col-10 d-flex mx-auto'>
                <div id='card' className='rounded p-2 mx-auto col-sm-7 col-11'>
                    <h2 className='text-center'>
                        Estimated Gas Fee Calculator
                    </h2>
                    <div>
                        {(!loading) && <p className='p-0 m-0 text-center'>ETH: ${data.result.ethusd} </p>}
                    </div>
                    <main className='d-flex flex-wrap justify-content-center'>
                        <div>
                            <p className='m-0 ps-2 fs-5'>Mint Price</p>
                            <input ref={mintPriceRef} className='m-2 w-40 border rounded p-1 border-secondary bg-transparent' type="text" placeholder='Ether' />
                        </div>
                        <div>
                            <p className='m-0 ps-2 fs-5'>Gas Limit</p>
                            <input ref={gasLimitRef} className='m-2 w-40 border rounded p-1 border-secondary bg-transparent' type="text" placeholder='Units of gas' />
                        </div>
                        <div>
                            <p className='m-0 ps-2 fs-5'>Max Gas Fee</p>
                            <input ref={maxGasRef} className='m-2 w-40 border rounded p-1 border-secondary bg-transparent' type="text" placeholder='Gwei' />
                        </div>
                        <div>
                            <p className='m-0 ps-2 fs-5'>Max Priority Fee</p>
                            <input ref={maxPrioRef} className='m-2 w-40 border rounded p-1 border-secondary bg-transparent' type="text" placeholder='Gwei' />
                        </div>
                    </main>

                    <div className='d-flex justify-content-center'>
                        <button onClick={calcGas} className='btn btn-primary text-center'>
                                Calculate
                        </button>
                    </div>

                    <div ref={result} style={{display: 'none'}} className='justify-content-center'>
                        Average Gas Fee: {finalGas} ETH {(finalGas) && <p> (${dollar})</p>}
                    </div>
                </div>
            </div>
        </main>
    </>
    )
}

export default Calc;