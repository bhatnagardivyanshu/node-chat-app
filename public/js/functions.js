// create message
function createMessage() {
	
	$('#message-form').on('submit', function(e) {
		
		e.preventDefault();

		const input = $('input[name=\'message\']');
		socket.emit('createMessage', {
			from: 'User', 
			text: input.val(),
		}, (data) => {
			input.val('')
		});
	})
}

// show message
function readMessage() {

	socket.on('newMessage', function(messageObj) {
		const timestamp = moment(messageObj.createdAt).format('h:mm a');
		const messageTemplate = $('#message-template').html();
		const html = Mustache.render(messageTemplate, {
			from: messageObj.from,
			text: messageObj.text,
			createdAt: timestamp
		});
		$('#message-list').append(html);
	});

	socket.on('newLocationMessage', function(messageObj){
		// using .text, .href methods to avoid any malicious behaviour
		const timestamp = moment(messageObj.createdAt).format('h:mm a');
		const locationMessageTemplate = $("#location-message-template").html();
		const html = Mustache.render(locationMessageTemplate, {
			from: messageObj.from,
			url: messageObj.url,
			createdAt: timestamp
		})
		$('#message-list').append(html);
		// const li = $('<li></li>');
		// li.text(`${messageObj.from} ${formattedTimestamp}: `);

		// const a = $(`<a targe='_blank'>My Current Location</a>`)
		// a.href(messageObj.url);

		// li.append(a);
		// $('#message-list').append(li);
	})
}

function sendLocation () {
	const button = $('#send-location');
	$(button).on('click', function () {
		button.attr('disabled', true).text('Sending location...');

		if(!navigator.geolocation) {
			return alert('Geolocation is not supported by your browser.')
		}

		navigator.geolocation.getCurrentPosition(
			
			function(position){

				socket.emit('createLocationMessage', {
					longitude: position.coords.longitude,
					latitude: ProcessingInstruction.coords.longitude
				});
				button.attr('disabled', false).text('Send location');
				
			}, function(err){
				
				console.log('ERROR => ', err);
				socket.emit('createMessage', {
					from:'User', 
					text: 'Tried sending location but failed'
				});
				button.attr('disabled', false).text('Send location');

			}, {
				timeout: 5000,
				maximumAge: Infinity
		});
	});
}

// change page title on new message
// function handlePageTitle (newMessage) {
//   try {
//     clearInterval(changeTitleInterval)
//   } catch (error) {
//     console.error('clear interval', changeTitleInterval)
//   }

//   changeTitleInterval = setInterval(() => {
//     const newTitle = (newMessage.text.length > 5) ? newMessage.text.substr(0, 10) : newMessage.text
//     document.title = (document.title === newMessage.text) ? defaultTitle : newTitle
//   }, 1000)
// }
