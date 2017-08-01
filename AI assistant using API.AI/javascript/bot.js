// jQuery
var accessToken = "1f26362a8e744c5a846bfa0d58e1a770",
      baseUrl = "https://api.api.ai/v1/",
      $speechInput,
      $recBtn,
      recognition,
      messageRecording = "Recording...",
      messageCouldntHear = "I couldn't hear you, could you say that again?",
      messageInternalError = "Oh no, there has been an internal server error",
      messageSorry = "I'm sorry, I don't have the answer to that yet.";
	  
	  
	  
	  
$(document).ready(function(){
  var div = document.getElementById('wrapper');
  var top = document.getElementById('top');
  top.style.cursor = 'pointer';

  $('#top').on('click', function() {
    $('#wrapper').toggleClass('clicked');
  });

 /* 
    top.onclick = function() {
      if($bottom == '649px'){
        div.style.transform = "translateY(85)";
     }
    div.style.backgroundColor = '';
    div.style.transform = "translateY(-85%)";

    var $el = $('#wrapper');
    var $bottom = $el.position().top + $el.outerHeight(true);

    alert($bottom);


  };*/



	$("#send").click(function () {
		var data = $("#usermsg").val();
		$("#chatbox").append("<div style=text-align:right>" + data + "</div><br>");
		$("#usermsg").val('');
	});
	
	$("#clear").click(function () {
		$("#chatbox").empty();
	});
	
	$(document).keypress(function(e) {
		var data = $("#usermsg").val();
		if(e.which == 13) {
			send();
			$("#chatbox").append("<div style=text-align:right>" + data + "</div><br>");
			$("#usermsg").val('');
		}
	});
})

function send() {
      var text = $("#usermsg").val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({query: text, lang: "en", sessionId: "yaydevdiner"}),

        success: function(data) {
          prepareResponse(data);
        },
        error: function() {
          respond(messageInternalError);
        }
      });
    }
    function prepareResponse(val) {
      var debugJSON = JSON.stringify(val, undefined, 2),
        spokenResponse = val.result.speech;
		
      respond(spokenResponse);
	  
	  //Insert bot response
	  $("#chatbox").append("<p style=color:'white'>Planty(bot)</p><div>" + spokenResponse + "</div><br>");
  
    }

    function respond(val) {
      if (val == "") {
        val = messageSorry;
      }

      if (val !== "") {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
      }
	}
