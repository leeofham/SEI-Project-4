import React from 'react'

import Create from '../events/Create'

const CreateModal = ({ create, toggleCreate, handleChangeCreate, handleSubmitCreate, marker, errors }) => {
  return (
    <div className={`modal animated ${create ? ' bounceInRight is-active ' : ' '}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Plan your next beer</p>
          <button className="delete" aria-label="close" onClick={toggleCreate}></button>
        </header>
        <section className="modal-card-body">
          <Create
            handleChangeCreate={handleChangeCreate}
            handleSubmitCreate={handleSubmitCreate}
            pubId={marker.name}
            errors={errors}
          />
        </section>
      </div>
    </div>
  )
}

export default CreateModal
