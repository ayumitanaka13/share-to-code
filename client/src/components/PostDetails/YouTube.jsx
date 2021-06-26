import React from 'react'

const YouTube = ({youtube}) => {
    return (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtube.split("=")[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="RoundShadow"
        ></iframe>
    )
}

export default YouTube
