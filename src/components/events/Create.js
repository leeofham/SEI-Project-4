import React from 'react'

const Create = ({ handleChange, handleSubmit, pubId }) => {
  return(
    <section className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                className="input"
                name="date"
                placeholder="12/9/2019"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Venue</label>
            <div className="control">
              <h1 className="subtitle">{pubId} </h1>
            </div>
          </div>
          <button className="button is-primary">Create an event</button>
        </form>
      </div>
    </section>
  )
}

export default Create
