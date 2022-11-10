import React from 'react'

function Overview({props}) {
  return (
    <div className='home'>
      {
        props.users.map((info, idx) => (
          <div key={idx}>
              <p>{info.firstname}</p>
          </div>
        ))
      }
      </div>
  )
}

export default Overview