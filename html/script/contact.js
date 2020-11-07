//WHAT TODAY IS DAY
const today= new Date();
const dayOfWeek = today.getDay();

$('.d'+ dayOfWeek).css('background-color', 'rgba(206, 29, 29, 0.6)');