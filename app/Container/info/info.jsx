import React from 'react';

import InfoElement from './infoElement/InfoElement.jsx';

export default class Info extends React.Component {
   constructor(props) {
      super(props)
   }
   render() {
      let toShow = (this.props.pageInfo === 1) ? <div style={{ display: 'flex' }}>
         <div >
            <InfoElement elInfo={'cImj'} />
            <br />
            <InfoElement elInfo={'pythonImj'} />
         </div>
         <div>
            <InfoElement elInfo={'jsImj'} />
            <br />
            <InfoElement elInfo={'haskellImj'} />
         </div>
      </div> :
         <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex' }}>
               <div>
                  <InfoElement elInfo={'javaImj'} />
               </div>
               <div>
                  <InfoElement elInfo={'cPlusImj'} />
               </div>
            </div>
            <InfoElement elInfo={'rubyImj'} />
         </div>
      return toShow
   }
}
