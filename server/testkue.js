var kue = require('kue')
  , queue = kue.createQueue();

  var job = queue.create('email', {
    title: 'welcome email for tj'
  , to: 'bayuanggaraharles@gmail.com'
  , template: 'welcome-email'
}).save( function(err){
   if( !err ) console.log( job.id );
});