
$(function(){
    $("#connect").click(function () {
        connect();
    })

    $("#n6").click(function () {
        alert(0)
        connect();
    })

    $("#disconnect").click(function () {
        disconnect();
    })

    $("#send").click(function () {
        sendName();
    })


})

var stompClient=null;
function setConnecte(connected) {
    $("#connect").prop("disabled",connected);
    $("#disconnect").prop("disabled",!connected);

    if(connected){
        $("#conversation").show();
        $("#chat").show();
    }else {
        $("#conversation").hide();
        $("#chat").hide();
    }
    $("#greetings").html("");
}

function connect() {
    if(!$("#n5").val()){
        return;
    }
    var socket=new SockJS('/chat');
    stompClient=Stomp.over(socket);
    stompClient.connect({},function (frame) {
        setConnecte(true);
        stompClient.subscribe('/topic/greetings',function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        })
    })
}
function disconnect() {
    if(stompClient!==null){
        stompClient.disconnect();
    }
    setConnecte(false);
}

function sendName() {
    stompClient.send("/app/hello",{},JSON.stringify({
        'name':$("#name").val(),
        'content':$("#content").val()
    }))
}
function showGreeting(message) {
    $("#greetings").append("<div>"+message.name+":"+message.content+"</div>")
}

