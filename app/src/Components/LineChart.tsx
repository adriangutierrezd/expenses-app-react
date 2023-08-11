import * as echarts from 'echarts'
import { useEffect } from 'react'
import { ExpensesByMonth } from '../types'

interface Props{
  chartTitle: string,
  chartId: string,
  data: Array<ExpensesByMonth>,
  headings: Array<string>
}

export function LineChart({chartId, data, headings, chartTitle} : Props){

      useEffect(() => {

        const myChart = echarts.init(document.getElementById(chartId))
        myChart.setOption({
            title: {
              text: chartTitle
          },
            xAxis: {
              type: 'category',
              data: headings
            },
            yAxis: {
              type: 'value'
            },
            tooltip: {},
            series: [
              {
                data,
                type: 'line',
                name: headings
              }
            ]
          })
      }, [headings, data, chartTitle, chartId])

      return (
        <article className='rounded aspect-video w-full my-4 p-2 border border-slate-200' id={chartId} style={{height:'500px'}}>
        
        </article>
    )

}