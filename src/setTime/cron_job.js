const  cron = require('node-cron')

const  start_time = cron.schedule(
  '* * * * *',
  () => {
    console.log('stopped start_time')
  },
  {
    scheduled: false
  }
)

start_time.start()


const  end_time = cron.schedule('* * * * *', () => {
  console.log('will not execute anymore, nor be able to restart')
})

end_time.destroy()