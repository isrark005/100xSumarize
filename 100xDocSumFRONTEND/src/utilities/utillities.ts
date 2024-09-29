export function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const today = new Date();
    
   
    const isToday = date.toDateString() === today.toDateString();
  
    if (isToday) {
      
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      
      return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  }
  

 
  