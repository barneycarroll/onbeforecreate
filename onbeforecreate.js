const circumventions = new Set()

const obc = component => Object.assign( {}, component, {
  oninit : vnode => {
    let shouldcreate

    if( component.onbeforecreate )
      shouldcreate = component.onbeforecreate.call( vnode.state, vnode )

    if( shouldcreate === false )
      circumventions.add( vnode )

    else if( component.oninit )
      component.oninit.call( vnode.state, vnode )
  },

  view : vnode =>
    !circumventions.has( vnode ) && component.view.call( vnode.state, vnode ),

  oncreate : vnode => {
    if( !circumventions.has( vnode ) )
      component.oncreate.call( vnode.state, vnode )

    else {
      vnode.instance = component.view.call( vnode.state, vnode )

      circumventions.delete( vnode )
    }
  }
} )

if( typeof module !== 'undefined' ) module[ 'exports' ] = obc
else window.obc = obc
