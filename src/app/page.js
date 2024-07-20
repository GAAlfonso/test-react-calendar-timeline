'use client'
import { useState, useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import NewTimelineComponent from './NewTimelineComponent';

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <main>
      {isClient ? 
      <div>
        
        <NewTimelineComponent />
        
      </div>
      : 'Prerendered'}
    </main>
  )
}
