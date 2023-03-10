import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {

    return (
        <>
            {gotoPrevPage && <button className='blue-square-ui' onClick={gotoPrevPage}>Previous</button>}
            {gotoNextPage && <button className='blue-square-ui' onClick={gotoNextPage}>Next</button>}
        </>
    )

}