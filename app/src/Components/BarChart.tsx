import * as echarts from 'echarts'
import { useEffect } from 'react'
import { ExpenseByCategory } from '../types'

interface Props{
    chartTitle: string,
    chartId: string,
    seriesName: string,
    data: Array<ExpenseByCategory>
}

export function BarChart ({ chartTitle, chartId, data, seriesName } : Props) {

    useEffect(() => {

        const myChart = echarts.init(document.getElementById(chartId));

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
    })



    return (
        <article className='rounded aspect-video w-full my-4 p-2 border border-slate-200' id={chartId} style={{height:'500px'}}>
        
        </article>
    )

}

