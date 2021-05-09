
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/request';

type SeriesData = {
    name:string;
    data:number[];
}

type ChartData = {
    labels:{
        categories:string[];
    };
    series:SeriesData[];
}

function Barchart() {

    const[charData,setChartData]=useState<ChartData>({
        labels:{
            categories:[]
        },
        series:[{
            name:"",
            data:[]
        }]
    });

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };


    useEffect(()=>{
        axios.get(`${BASE_URL}/sales/success-by-seller`)
        .then(response =>{
            const data = response.data as SaleSuccess[];
            const mylabels = data.map(x=> x.sellerName);
            const myseries = data.map(x=>round(100.0*x.deals/x.visited,1));
            
            setChartData ({
                labels:{
                    categories:mylabels
                },
                series:[
                    {
                        name:"% Success",
                        data: myseries
                    }
                ]

            }) ;
            
        });
    },[]);




   /**  const mockData = {
        labels: {
            categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
        },
        series: [
            {
                name: "% Sucesso",
                data: [43.6, 67.1, 67.7, 45.6, 71.1]
            }
        ]
    };

    **/


    return (

        <Chart
            options={{ ...options,xaxis: charData.labels}}
            series={charData.series}   
            type='bar'
            height="240"
        />
       
    );
}

export default Barchart;


