import React from 'react'
import GenericPacketViewer from '../GenericPacketViewer/GenericPacketViewer'
import IlpPaymentViewer from '../IlpPaymentViewer/IlpPaymentViewer'
import './PacketViewer.css'

const TYPE_NAMES = [null, 'ILP Payment']

const TYPE_ILP_PAYMENT = 1

export default ({ packet }) => {
  try {
    const packetData = Buffer.from(packet, 'base64')
    const type = packetData[0]

    let viewer
    switch (type) {
      case TYPE_ILP_PAYMENT:
        viewer = <IlpPaymentViewer packet={packetData}/>
        break;
      default:
        viewer = <GenericPacketViewer packet={packetData}/>
        break;
    }

    return (
      <div className="layer layer-detail layer-interledger">
        <h3>{TYPE_NAMES[packetData[0]] || ('Unknown (' + packetData[0] + ')')}</h3>
        <div className="layer-inner">
          {viewer}
        </div>
      </div>
    )
  } catch (err) {
    console.error(err)
    return <div/>
  }
}
