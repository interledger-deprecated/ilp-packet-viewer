import React from 'react'
import { deserializeIlpPayment } from 'ilp-packet'
import { isPsk } from '../../lib/psk'
import PskViewer from '../PskViewer/PskViewer'
import './IlpPaymentViewer.css'

export default ({ packet }) => {
  const { amount, account, data } = deserializeIlpPayment(packet)
  const dataBuffer = Buffer.from(data, 'base64')

  return (
    <div className="IlpPaymentViewer-main">
      <dl>
        <dt>Amount:</dt>
        <dd>{amount}</dd>
        <dt>Account:</dt>
        <dd>{account}</dd>
      </dl>
      <div className="IlpPaymentViewer-datahead">Data:</div>
      { isPsk(dataBuffer) && (
        <div className="layer layer-detail layer-transport">
          <h3>PSK/1.0</h3>
          <div className="layer-inner"><PskViewer data={dataBuffer}/></div>
        </div>
      )}
    </div>
  )
}
