import React from 'react'

const PostHeader = ({src}) => {
    return (
        <div className="-mt-10 Border">
          <img src={src} alt="" className="rounded-lg shadow-lg Border" />
        </div>
        // <div className="w-full h-full flex items-center justify-center absolute top-0 -mt-4 border">
        // <div className="text-center">
        //   <h1>
        //     <i className="fab fa-react mb-2" />
        //   </h1>
        //   <h3>{post.title}</h3>
        // </div>
        // </div> 
    )
}

export default PostHeader
