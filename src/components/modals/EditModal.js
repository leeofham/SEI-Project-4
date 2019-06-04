import React from 'react'

import Edit from '../events/Edit'

const EditModal = ( {edit, toggleEdit, handleChangeEdit, handleSubmitEdit, marker, pubEvent} ) => {
  return(
    <div className={`modal animated ${edit ? ' bounceInLeft is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Plan your next beer</p>
          <button className="delete" aria-label="close" onClick={toggleEdit}></button>
        </header>
        <section className="modal-card-body">
          <Edit
            handleChangeEdit={handleChangeEdit}
            handleSubmitEdit={handleSubmitEdit}
            pubId={marker.name}
            pubEvent = {pubEvent}
          />
        </section>
      </div>
    </div>
  )
}

export default EditModal
