import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'typeface-titillium-web'
import 'typeface-droid-sans-mono'
import {exampleIlpPayment} from '../../examples'
import PacketViewer from '../PacketViewer/PacketViewer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: window.location.hash && window.location.hash.substr(1) || ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleExampleClick = this.handleExampleClick.bind(this)
  }

  setValue(value) {
    window.location.hash = value
    this.setState({value})
  }

  handleChange(event) {
    this.setValue(event.target.value)
  }

  handleExampleClick(example) {
    return () => {
      this.setValue(example)
    }
  }

  render() {
    return (
      <div className="App">
        <h2 className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          ILP Packet Parser
        </h2>
        <div className="App-intro clearfix">
          <div className="App-legend">
            <div className="layer layer-app">Application</div>
            <div className="layer layer-transport">Transport</div>
            <div className="layer layer-interledger">Interledger</div>
            <div className="layer layer-ledger">Ledger</div>
          </div>
          <p>This tool can parse ILP packets.</p>
          <p>ILP uses a layered architecture. If an ILP packet contains data which matches the PSK transport layer protocol spec, this tool will parse both layers.</p>
        </div>
        {this.state.value && <PacketViewer packet={this.state.value}/>}
        <h3>Paste your ILP packet as Base64 or Base64Url:</h3>
        <textarea className="App-textarea" value={this.state.value} onChange={this.handleChange}/>
        <hr/>
        <p>
          Examples:&nbsp;
          <button onClick={this.handleExampleClick(exampleIlpPayment)}>ILP Payment</button>
        </p>
      </div>
    )
  }
}

export default App
