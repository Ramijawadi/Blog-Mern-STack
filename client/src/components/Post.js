import React from 'react'

const Post = () => {
  return (
    <div className='post'>
    <div className="image">
   <img  src='https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/actu/firefox_logo_03.jpg' alt='foto' />
   </div>
  
  <div className="texts"> 
  <h2>Mozilla downsizes as it refocuses on Firefox and AI</h2>
  
  <p className="info">
  
   <a className="author">Rami Jawadi</a>
   <time>28/02/2024  18:02</time>
  
  </p>
  <p className="summary">After installing a new interim CEO earlier this month, Mozilla, the organization behind the Firefox browser, is making some major changes to its product strategy, TechCrunch has learned.</p>
  </div>
  </div>
  )
}

export default Post