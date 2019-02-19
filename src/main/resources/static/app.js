$(function () {
    $("#connect").click(function () {
        connect();
    });

    $("#disconnect").click(function () {
        disconnect();
    });

    $("#send").click(function () {
        sendName();
    });
});

var stompClient = null;



function getParams(url) {
    var theRequest = {};
    if (!url)
        url = location.href;
    if (url.indexOf("?") !== -1)
    {
        var str = url.substr(url.indexOf("?") + 1) + "&";
        var strs = str.split("&");
        for (var i = 0; i < strs.length - 1; i++)
        {
            var key = strs[i].substring(0, strs[i].indexOf("="));
            theRequest[key] = strs[i].substring(strs[i].indexOf("=") + 1);
        }
    }
    return theRequest;
}

function setConnection(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);

    if (connected) {
        $("#conversation").show();
        $("#chat").show();
    } else {
        $("#conversation").hide();
        $("#chat").hide();
    }
    $("#greetings").html("");
}

function connect() {
    if (!$("#name").val()) {
        return;
    }
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnection(true);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        })
    })
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnection(false);
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify({
        'name': $("#name").val(),
        'content': $("#content").val()
    }));
}

function showGreeting(message) {
    $("#content").val('');
    $("#greetings").append("<p>" + message.name + " : " + message.content + "</p>")
}

