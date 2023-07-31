import '../css/Buttons.css'

export function DateRangeForm(){

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" title='Select a date as beginning of the period' name="intialDate" className='' required />
            <input type="date" title='Select a date as end of the period' name="endDate" className='' required />
            <button className='primaryButton'>Cargar</button>
        </form>
    )
}