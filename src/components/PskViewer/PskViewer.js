import React from 'react'
import headerCase from 'header-case'
import { parsePsk } from '../../lib/psk'
import './PskViewer.css'

export default ({ data }) => {
  const { headers, content } = parsePsk(data)

  const headersList = Object.keys(headers).map(key => {
    const value = headers[key]
    const headerName = headerCase(key)
    return [
      <dt>{headerName}:</dt>,
      <dd>{value}</dd>
    ]
  })

  return (
    <div>
      <dl>
        {headersList}
      </dl>
      <div className="layer layer-detail layer-app">
        <h3>Application Data (encrypted)</h3>
        <div className="layer-inner">
          <code className="PskViewer-data">{content.toString('hex')}</code>
        </div>
      </div>
    </div>
  )
}
