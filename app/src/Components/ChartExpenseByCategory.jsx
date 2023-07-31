import * as echarts from 'echarts'
import { useEffect } from 'react'

export function ChartExpenseByCategory () {

    useEffect(() => {
        var myChart = echarts.init(document.getElementById('test'));

        // Draw the chart
        myChart.setOption({
        title: {
            text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        xAxis: {
            data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
        },
        yAxis: {},
        series: [
            {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
            }
        ]
        });
    }, [])

    return (
        <article id='test' style={{width:'500px', height:'500px'}}>
        
        </article>
    )

}