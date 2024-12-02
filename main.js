
const plugInAddr = "https://34.116.195.223:8080";

const exceptions = [
	`${plugInAddr}/short_y_axis`,
	`${plugInAddr}/3D_pie`,
	`${plugInAddr}/bright_colours_no_scale`,
	`${plugInAddr}/trend_hiding_by_stacking`,
	`${plugInAddr}/two_Y_axes`,
];

if(!exceptions.includes(window.location.href)){

	var imgs = document.getElementsByTagName("img")

	const mouseOverBorder = "4px dashed blue"
	const processingPhotoBorder = "4px dashed gray"
	const successNoManiPhotoBorder = "4px dashed green"
	const successManiPhotoBorder = "4px dashed red"
	const buttonSendBorder = "1px solid black"
	const containerId = "containerId"
	const buttonSendId = "buttonSendId"

	for(var i = 0; i < imgs.length; ++i) {

		const container = document.createElement("div")
		container.setAttribute("id", containerId)
		container.setAttribute("class", "container")
		container.style.position = "relative"
		container.style.margin = "auto"
		container.style.display = "flex"
		container.style.justifyContent = "center"
		container.style.alignItems = "center"

		const buttonSend = document.createElement("button")
		buttonSend.setAttribute("id", buttonSendId)
		buttonSend.style.position = "absolute"
		buttonSend.style.margin = "auto"
		buttonSend.style.fontSize = "16px"

		container.appendChild(buttonSend)

		const img = imgs[i]
		const imgParent = img.parentNode

		imgs[i].addEventListener("mouseover", function(e) {
			if(container.style.border === ""){
				buttonSend.removeAttribute("disabled")
				buttonSend.innerHTML = "Kliknij aby sprawdzić pod kątem manipulacji." //"Click here image to check for tampering."
				imgParent.replaceChild(container, e.target)
				container.appendChild(img)
				container.style.border = mouseOverBorder
			}
		})

		container.addEventListener("mouseleave", function(e) {
			if(container.style.border === mouseOverBorder){
				container.style.border = ""
				container.removeChild(img)
				imgParent.replaceChild(img, e.target)
			}
		})

		buttonSend.addEventListener("click", async function(e){

			if (container.style.border !== processingPhotoBorder) {

				let dotCount = 0; // Initialize dot counter
				// Function to animate dots
				const animateDots = () => {
					const dots = ".".repeat(dotCount % 4); // Add dots (0-3)
					e.target.innerHTML = `Przetwarzam obraz, proszę czekać${dots}`; // Update button text
					dotCount++; // Increment counter
				};

				// Set the border to indicate processing
				container.style.border = processingPhotoBorder;
				e.target.setAttribute("disabled", "disabled"); // Disable the button

				// Start the dots animation
				const dotsInterval = setInterval(animateDots, 256); // Update every 500ms

				const response = await fetch(img.src);

				console.log(img.src)

				const blob = await response.blob();

				var myHeaders = new Headers();
				myHeaders.append("Connection", "keep-alive");
				myHeaders.append("Accept", "*/*");
				myHeaders.append("Accept-Encoding", "gzip, deflate, br");
				myHeaders.append("Access-Control-Allow-Origin", "*");


				const formdata = new FormData()
				formdata.append('image', blob, makeid(16) + '.jpg')

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: formdata,
					credentials: 'same-origin'
				}

				await fetch(plugInAddr + "/process_img", requestOptions)
					.then(response => response.text())
					.then(result => {
						const results = result.split("|")
						const example = results[1]
						e.target.innerHTML = results[0]
						clearInterval(dotsInterval); // Stop dots animation
						e.target.removeAttribute("disabled")
						e.target.removeEventListener("click", arguments.callee, false);
						if(example === void 0) {
							container.style.border = successNoManiPhotoBorder
							e.target.setAttribute("onclick", "style.display = 'none'")
						} else {
							container.style.border = successManiPhotoBorder
							e.target.removeEventListener("click", arguments.callee, false);
							e.target.addEventListener("click", function(e) {
								window.open(`${plugInAddr}${example}`, "_blank")
							})
						}
					})
					.catch(error => {
						alert("Wystąpił problem :(")
						container.style.border = ""
						container.removeChild(img)
						imgParent.replaceChild(img, container)
					})

			}
		})
	}
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}