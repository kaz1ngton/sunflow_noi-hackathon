import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div>
            <h3>Page not found</h3>
            <p style={{ textAlign: 'center' }}>
                <Link to="/">Go to Home </Link>
            </p>
        </div>
    )
}
