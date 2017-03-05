import parseHeaders from 'parse-headers'

const PSK_PREAMBLE_BUFFER = Buffer.from('PSK/1.0\n', 'ascii')
const DOUBLE_NEWLINE_BUFFER = Buffer.from('\n\n', 'ascii')

export const isPsk = (data) => {
  return PSK_PREAMBLE_BUFFER.compare(data, 0, PSK_PREAMBLE_BUFFER.length) === 0
}

export const parsePsk = (data) => {
  if (!isPsk(data)) {
    throw new Error('Data does not start with PSK preamble')
  }

  const endOfHeaders = data.indexOf(DOUBLE_NEWLINE_BUFFER)
  const headersString = data.slice(PSK_PREAMBLE_BUFFER.length, endOfHeaders).toString('utf8')
  console.log('headersString', headersString)
  const headers = parseHeaders(headersString)
  const content = data.slice(endOfHeaders + DOUBLE_NEWLINE_BUFFER.length)

  return { headers, headersString, content }
}
