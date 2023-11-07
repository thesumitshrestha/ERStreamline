import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
    <>
      <div className='bg-primary py-medium'>
        <div className='container mx-auto text-white px-5  flex flex-row items-center justify-between'>
          <h2 className='text-5xl'>ERStreamline</h2>
          <div className='px-4 py-2 bg-secondary border-2 border-secondary hover:shadow-lg hover:shadow-secondary-500/50 text-white rounded-full text-base transition-colors'>
            {/* <a className='' href='/homepage/login'>Login</a> */}
          </div>
        </div>
      </div>
    </>
  )
  }
}
