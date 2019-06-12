function generateAppointmentsDay(year, month, day, startHour, quantity = 8){
  const appointmentArray = [];
  for(let i=0; i<=quantity; i++){
   appointmentArray.push(
    {
      time: new Date(year,month,day,startHour+i).toISOString(),
      duration: 45
    }
   )
  }
  return appointmentArray
}

module.exports = generateAppointmentsDay;
