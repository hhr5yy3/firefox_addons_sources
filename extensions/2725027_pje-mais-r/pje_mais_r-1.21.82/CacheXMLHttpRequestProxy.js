const send_ = window.XMLHttpRequest.prototype.send
const cacheMap = new Map()
const mapAPI = [
  'cargos',
  'orgaosJulgadores',
  'orgaosJulgadoresColegiado',
  'aplicacaoSistema',
  'tiposAudiencia',
  'especialidades',
  'tiposProcessoDocumento',
  'pje:title:icone:liminar',
  'pje:label:filtro:liminar'
]

window.XMLHttpRequest.prototype.send = new Proxy(window.XMLHttpRequest.prototype.send, {
  apply: function (_, thisArg, args) {
    const reqURL = thisArg.__zone_symbol__xhrURL ?? ''

    const mapTarget = mapAPI.find(api => reqURL.endsWith(api))
    if (!mapTarget) return send_.apply(thisArg, args)

    const cachedResponse = cacheMap.get(reqURL)
    if (!cacheMap.has(reqURL)) {
      thisArg.onreadystatechange = () => {
        if (thisArg.readyState === 4 && thisArg.status === 200) {
          cacheMap.set(reqURL, thisArg.response)
        }
      }
    } else if (cachedResponse || mapTarget === 'pje:title:icone:liminar') {
      Object.defineProperties(thisArg, {
        response: { value: cachedResponse ? cachedResponse : '' },
        responseText: { value: cachedResponse ? cachedResponse : '' },
        status: { value: 200 },
        statusText: { value: 'OK' },
        readyState: { value: 4 }
      })
      thisArg.dispatchEvent(new Event('readystatechange'))
      thisArg.dispatchEvent(new Event('load'))
      thisArg.dispatchEvent(new Event('loadend'))
      return
    }
    return send_.apply(thisArg, args)
  }
})
