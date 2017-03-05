import React from 'react'

export default ({ packet }) => {
  return <div>{packet.toString('hex').toUpperCase()}</div>
}
