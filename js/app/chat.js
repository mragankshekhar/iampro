/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
  // It indicates conversation flag
         var conversationStarted = false;
         // Here initiliaze the messages
         var myMessages = myApp.messages('.messages', {
            autoLayout:true
         });
         getAllchat();
         
         // Initiliaze the messagebar
         var myMessagebar = myApp.messagebar('.messagebar');
         // Displays the text after clicking the button
         $$('.messagebar .link').on('click', function () {
            // specifies the message text
            var messageText = myMessagebar.value().trim();
            // If there is no message, then exit from there
            if (messageText.length === 0) return;
            // Specifies the empty messagebar
            myMessagebar.clear()
            // Defines the random message type
            // Provides the avatar and name for the received message
            var avatar="uploads/avatar/"+myDetail.avatar, name=myDetail.fullname;
            // It adds the message
            myMessages.addMessage ({
               // It provides the message text
               text: messageText,
               // It displays the random message type
               type: 'sent',
               // Specifies the avatar and name of the sender
               avatar: avatar,
               name: name,
               // Displays the day, date and time of the message
               day: !conversationStarted ? 'Today' : false,
               time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            })
            var recieverId=$("#uid").val();
            $.post("api/user.php",{"type":"saveChat","uid":recieverId,"msg":messageText},function(){});
            // Here you can update the conversation flag
            conversationStarted = true;
         });
setInterval(function(){ 
    var recieverId=$("#uid").val();
    $.getJSON("api/user.php",{"type":"checkNewChat","lang":lang,"uid":recieverId},function(datas){
        if(datas.status=="success"){
            $.each(datas.list,function(kay,val){
             myMessages.addMessage ({
               // It provides the message text
               text: val.msg,
               // It displays the random message type
               type: val.messageType,
               // Specifies the avatar and name of the sender
               avatar: val.avatar,
               name: val.ufrom,
               // Displays the day, date and time of the message
               day:  val.udate
            });
        });
        }
    });
}, 3000);
function getAllchat(){
    var recieverId=$("#uid").val();
    $.getJSON("api/user.php",{"type":"fetchChat","lang":lang,"uid":recieverId},function(data){
        if(data.status=="success"){
            $.each(data.list,function(kay,val){
                myMessages.addMessage ({
                    // It provides the message text
                    text: val.msg,
                    // It displays the random message type
                    type: val.messageType,
                    // Specifies the avatar and name of the sender
                    avatar: val.avatar,
                    name: val.ufrom,
                    // Displays the day, date and time of the message
                    day: ! val.udate ? 'Today' : false,
                    time: !val.udate ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
                 });
            });
        }
    });
}
