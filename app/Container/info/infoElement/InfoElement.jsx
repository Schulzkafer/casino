import React from 'react';

import './infoElement.scss';

import cImj from '../../../static/imgs/c.png'
import jsImj from '../../../static/imgs/js.png';
import pythonImj from '../../../static/imgs/python.png';
import haskellImj from '../../../static/imgs/haskell.png';
import javaImj from '../../../static/imgs/java.png';
import cPlusImj from '../../../static/imgs/Cplus.png';
import rubyImj from '../../../static/imgs/ruby.png';

const obj = {
   'cImj': {
      src: cImj,
      prize: 3
   },
   'jsImj': {
      src: jsImj,
      prize: 4
   },
   'pythonImj': {
      src: pythonImj,
      prize: 5
   },
   'haskellImj': {
      src: haskellImj,
      prize: 6
   },
   'javaImj': {
      src: javaImj,
      prize: 7
   },
   'cPlusImj': {
      src: cPlusImj,
      prize: 8
   },
   'rubyImj': {
      src: rubyImj,
      prize: 9
   }
}

export default class InfoElement extends React.Component {
   constructor(props) {
      super(props)
   }
   render() {
      return <table className='infoElement' style={{ display: 'inline-block' }}>
         {
            (this.props.elInfo !== 'rubyImj') ?
               <tbody>
                  <tr><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td className='numInfo'>{obj[this.props.elInfo].prize}</td></tr>
                  <tr><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td><img src={rubyImj} alt='rubyImj' /></td><td className='numInfo'>{obj[this.props.elInfo].prize}</td></tr>
                  <tr><td><img src={obj[this.props.elInfo].src} alt={this.props.elInfo} /></td><td><img src={rubyImj} alt='rubyImj' /></td><td><img src={rubyImj} alt='rubyImj' /></td><td className='numInfo'>{obj[this.props.elInfo].prize}</td></tr>
               </tbody>
               :
               <tbody>
                  <tr><td><img src={rubyImj} alt='rubyImj' /></td><td><img src={rubyImj} alt='rubyImj' /></td><td><img src={rubyImj} alt='rubyImj' /></td><td className='numInfo'>{obj[this.props.elInfo].prize}</td></tr>
               </tbody>
         }
      </table>
   }
}