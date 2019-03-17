import React, { useState } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import ListSlots from './ListSlots'
import { API_ENDPOINT } from '../config'

function ModalConfirmation(props) {
  const [modalOpen, setModal] = useState(false)
  const { setBooked, isOpen } = props

  const closingHandler = () => {
    setModal(false)
    setBooked({ booked: false })
  }
  return (
    <Modal
      open={isOpen || modalOpen}
      onClose={() => setModal(false)}
      basic
      size="small"
    >
      <Header icon="browser" content="Appointment confirmed" />
      <Modal.Content>
        <h3>You have successfully booked your appointment</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={closingHandler} inverted>
          <Icon name="checkmark" /> Got it
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

ModalConfirmation.propTypes = {
  setBooked: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
}

function NewAppointment(props) {
  const {
    slots,
    type = 'GP appointment',
    firstName,
    lastName,
    avatar,
    id: userId,
  } = props
  const [selectedDate, setDate] = useState(null)
  const [notes, setNotes] = useState('')
  const [isBooked, setBooked] = useState({ booked: false, error: null })

  const bookAppointment = () => {
    fetch(`${API_ENDPOINT}/appointments`, {
      method: 'post',
      body: {
        userId,
        dateTime: selectedDate,
        notes,
        type,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText)
        }
        return res.json()
      })
      .then(
        () => {
          setBooked({ booked: true })
          setNotes('')
          setDate(null)
        },
        error => {
          setBooked({ booked: false, error })
        }
      )
  }

  const { booked, error } = isBooked

  return (
    <div className={'newapp-container'}>
      <div className={'big-title'}>New Appointment</div>
      <div className={'personal-details'}>
        <div className={'avatar'}>
          <img
            src={`${avatar}`}
            className={'img-avatar'}
            height={100}
            width={100}
            alt=""
          />
          {firstName && lastName ? (
            <div className={'full-name'}>{`${firstName} ${lastName}`}</div>
          ) : null}
        </div>
        <div className={'change-family-member-button'}>Change</div>
      </div>
      {firstName && lastName ? <div className={'divider'} /> : null}
      <div className={'row'}>
        <Icon name={'clock outline'} />
        <span className={'title'}>Date & Time</span>
      </div>
      <ListSlots slots={slots} setDate={setDate} selectedDate={selectedDate} />
      <div className={'row'}>
        <Icon name="conversation" />
        <span className={'title'}>Notes</span>
      </div>
      <textarea
        onChange={e => setNotes(e.target.value)}
        value={notes}
        className={'notes'}
        placeholder={'Describe your symptoms...'}
      />
      <button
        disabled={!selectedDate}
        className={'book-button'}
        onClick={bookAppointment}
      >
        Book
      </button>
      <ModalConfirmation isOpen={booked} setBooked={setBooked} />
      {error && error.message}
    </div>
  )
}

NewAppointment.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  id: PropTypes.number,
}

export default NewAppointment
