import React from 'react'

const MainModal = ( {listing, toggleListing, filterArray, canModify, getDayOfWeek, toggleEdit, deleteEvent} ) => {
  return(
    <div className={`modal animated ${listing ? ' bounceInRight is-active' : ' '}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Whos drinking here?</p>
          <button className="delete" aria-label="close" onClick={toggleListing}></button>
        </header>
        <section className="modal-card-body">
          {listing && filterArray().map(listing =>
            <div key={listing.id}>
              <div className='level'>
                <div className='level-left'>
                  <h2 className='subtitle'>{listing.date},</h2>
                </div>
                <div className='level-right'>
                  {canModify(listing.created_by.id) && <button className='button is-primary' onClick={toggleEdit} value={listing.id}>Edit</button>}
                  {canModify(listing.created_by.id) && <button className='button is-danger'onClick={deleteEvent} value={listing.id}>Delete</button>}
                  {!canModify(listing.created_by.id) && <button className='button'>Attending</button>}
                </div>
              </div>
              <div>
                {getDayOfWeek(listing.date)} - {listing.start} & {listing.end},<br/> Created by {listing.created_by.username} <hr/>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default MainModal
