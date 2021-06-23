import React from 'react'

const PostBody = ({message, username, moment}) => {
    return (
        <div className="Border">
          <p>{message}...</p>
          <div className="FlexAlign justify-between mt-2">
            <p>{username}</p>
            <small>{moment}</small>
          </div>
        </div>
    )
}

export default PostBody
