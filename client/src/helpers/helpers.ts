export function extractDateTime(isoString: string): { date: string; time: string } {
  const date = new Date(isoString);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format local de ora

  return {
    date: dateString,
    time: timeString,
  };
}
