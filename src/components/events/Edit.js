import React from 'react'

const Edit = ({ handleChangeEdit, handleSubmitEdit, pubId, pubEvent }) => {
  return(
    <section className="section">
      <div className="container">
        <form onSubmit={handleSubmitEdit}>
          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                className="input"
                name="date"
                placeholder="12/9/2019"
                onChange={handleChangeEdit}
                defaultValue={pubEvent.date || ''}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Start time</label>
            <div className="control">
              <input
                className="input"
                name="start"
                placeholder="eg: 17:00"
                onChange={handleChangeEdit}
                defaultValue={pubEvent.start || ''}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">End time</label>
            <div className="control">
              <input
                className="input"
                name="end"
                placeholder="eg: 21:00"
                onChange={handleChangeEdit}
                defaultValue={pubEvent.end || ''}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Venue</label>
            <div className="control">
              <h1 className="subtitle">{pubId} </h1>
            </div>
          </div>
          <button className="button is-primary">Update your event</button>
        </form>
      </div>
    </section>
  )
}

export default Edit
