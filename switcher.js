const store = new Map()
const dud   = document.createTextNode( '' )

const stash = ( key, vnode ) => {
  const substitute = document.createDocumentFragment()
  const contents   = document.createDocumentFragment()
  const { dom, domSize } = vnode

  dom.parentNode.insertBefore( substitute, dom )

  while( domSize-- ){
    substitute.appendChild( document.cloneNode( dud ) )

    contents.appendChild( dom )

    dom = dom.nextSibling
  }

  store.set( key, contents )
}

const pop = ( key ) => {
  const contents = store.get( key )

  store.delete( key )

  return contents
}

if( typeof module !== 'undefined' ) module[ 'exports' ] = { stash, pop }
else window.switch = { stash, pop }
