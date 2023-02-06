import React from 'react'

export default function ({ gotoPrevPage, gotoNextPage}) {
  return (
    <div>
        {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
