const circumventions = new Set()

const obr = component => Object.assign( {}, component, {
  oninit : vnode => {
    if( component.oninit )
      component.oninit.call( vnode.state, vnode )

    if( component.onbeforecreate ){
      const output = component.onbeforecreate.call( vnode.state, vnode )

      if( output === false )
        circumventions.add( vnode )
    }
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

if( typeof module !== 'undefined' ) module[ 'exports' ] = interface
else window.interface = interface
