import React from 'react'
import PropTypes from 'prop-types'

function ListSlots({ slots, setDate, selectedDate }) {
  const today = new Date().toISOString().split('T')[0]
  const sorted = slots.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  const sortedSlots = sorted.reduce((accum, item) => {
    const [date, time] = item.split('T')
    if (!accum[date]) {
      accum[date] = []
      accum[date].push({ id: item, time: time.slice(0, 5) })
    } else {
      accum[date].push({ id: item, time: time.slice(0, 5) })
    }
    return accum
  }, {})

  const mappedDates = Object.entries(sortedSlots).map(([key, values]) => {
    return (
      <li key={key} className="date-display">
        <div>{key === today ? 'Today' : key}:</div>
        <div>
          {values.map(slot => (
            <button
              key={slot.id}
              className={`available-slot ${
                selectedDate === slot.id ? 'slot' : 'unselected-slot'
              }`}
              onClick={() => setDate(slot.id)}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </li>
    )
  })

  return <ul>{mappedDates}</ul>
}

ListSlots.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.string),
  setDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
}

export default ListSlots
