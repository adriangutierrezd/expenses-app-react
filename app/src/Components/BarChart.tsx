import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { ExpenseByCategory } from '../types'

interface Props{
    chartTitle: string,
    seriesName: string,
    data: Array<ExpenseByCategory>
}

export function BarChart ({ chartTitle, data, seriesName } : Props) {

    const chartRef = useRef(null);

    useEffect(() => {


        if (chartRef.current) {
            // Destruir la instancia anterior antes de inicializar una nueva
            echarts.dispose(chartRef.current);
          }

        
        const myChart = echarts.init(chartRef.current);
    
        const dataValues = data.map(d => {
            
            return {
                value: d.amount, 
                itemStyle: {
                    color: d.color
                }
            }

        })

        myChart.setOption({
            title: {
                text: chartTitle
            },
            tooltip: {},
            xAxis: {
                data: data.map(d => d.category)
            },
            yAxis: {},
            series: [
                {
                    name: seriesName,
                    type: 'bar',
                    data: dataValues
                }
            ]
        });
    }, [data])



    return (
        <article ref={chartRef} className='rounded aspect-video w-full my-4 p-2 border border-slate-200' style={{height:'500px'}}>
        
        </article>
    )

}

