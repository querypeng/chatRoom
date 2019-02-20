$(function () {
    $("#connect").click(function () {
        connect();
    });

    $("#disconnect").click(function () {
        disconnect();
    });

    $("#clear").click(function () {
        $("#greetings").html("");
    });

    $("#send").click(function () {
        sendName();
    });

    $("#disconnect").hide();
    $("#clear").hide();
    $("#content").hide();
    $("#send").hide();
});

var stompClient = null;

var style = ["alert-success", " alert-info", "alert-warning", "alert-danger",
    "alert-primary", "alert-secondary", "alert-dark"];


function getParams(url) {
    var theRequest = {};
    if (!url)
        url = location.href;
    if (url.indexOf("?") !== -1) {
        var str = url.substr(url.indexOf("?") + 1) + "&";
        var strs = str.split("&");
        for (var i = 0; i < strs.length - 1; i++) {
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
        // 操作麻烦
        $("#connect").hide();
        $("#name").hide();
        $("#conversation").show();
        $("#chat").show();
        $("#disconnect").show();
        $("#clear").show();
        $("#content").show();
        $("#send").show();
    } else {
        $("#connect").show();
        $("#name").show();
        $("#conversation").hide();
        $("#chat").hide();
        $("#disconnect").hide();
        $("#clear").hide();
        $("#content").hide();
        $("#send").hide();
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
    var index = Math.floor((Math.random() * style.length));
    $("#content").val('');

    var conversation = document.getElementById("greetings");

    var children_length = conversation.childNodes.length;

    if (children_length + 1 > 10) {
        conversation.removeChild(conversation.firstChild);
    }

    $("#greetings").append("<div class=\"alert " + style[index] + "\">" + message.name + " : " + message.content + "</div>")
}
