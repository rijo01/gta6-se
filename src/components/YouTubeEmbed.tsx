'use client'
import { useState } from 'react'

interface Props {
  videoId: string
  title: string
}

export default function YouTubeEmbed({ videoId, title }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%',
        background: '#07040A',
        border: '1px solid rgba(255,45,123,0.3)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 0 40px rgba(255,45,123,0.35), 0 0 80px rgba(255,107,26,0.15)'
          : '0 0 20px rgba(255,45,123,0.1)',
        transition: 'box-shadow 0.35s ease',
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </div>
  )
}
