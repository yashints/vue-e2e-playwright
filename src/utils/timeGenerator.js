const generateTimes = () => {
  let d = new Date(); //get a date object
  d.setHours(10, 0, 0, 0); //reassign it to today's midnight

  let date = d.getDate();
  let timeArr = [];
  while (date == d.getDate()) {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    hours = hours == 0 ? 12 : hours; //if it is 0, then make it 12
    let ampm = 'am';
    ampm = hours > 12 ? 'pm' : 'am';
    hours = hours > 12 ? hours - 12 : hours; //if more than 12, reduce 12 and set am/pm flag
    hours = ('0' + hours).slice(-2); //pad with 0
    let minute = ('0' + minutes).slice(-2); //pad with 0
    timeArr.push({ time: hours + ':' + minute, ampm, completeTime: `${hours + ':' + minute} ${ampm}` });
    d.setMinutes(minutes + 60); //increment by 5 minutes
  }

  return timeArr;
};

export { generateTimes };
