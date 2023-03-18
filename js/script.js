const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

const input = document.getElementById('link-input')
const linkForm = document.getElementById('link-form')
const errMsg = document.getElementById('err-msg')

const linkContainer = document.getElementById("link-container");

btn.addEventListener('click', navToggle)
linkForm.addEventListener('submit', formSubmit)

// Toggle Mobile Menu
function navToggle() {
  btn.classList.toggle('open')
  menu.classList.toggle('flex')
  menu.classList.toggle('hidden')
}

// Validate a URL
function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!pattern.test(str)
}

function formSubmit(e) {
  e.preventDefault()

  if (input.value === '') {
    errMsg.innerHTML = 'Please enter something'
    input.classList.add('border-red')
  } else if (!validURL(input.value)) {
    errMsg.innerHTML = 'Please enter a valid URL'
    input.classList.add('border-red')
  } else {
    errMsg.innerHTML = ''
    input.classList.remove('border-red')
    alert('Success')
  }
}



const btnShortEnd = (() => {
  // console.log(input.value);
  const searchUrl = input.value;
  loadUrl(searchUrl);
})

const loadUrl = (searchUrl) => {
  const url = `https://api.shrtco.de/v2/shorten?url=${searchUrl}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLink(data))
    .catch((error) => console.log(error));
};

const displayLink = (data) => {
  const originalLink = data.result.original_link;
  const link1 = data.result.short_link;
  const link2 = data.result.short_link2;
  const link3 = data.result.short_link3;

  const linkDiv = document.createElement("div");
  linkDiv.innerHTML = `
  <div class="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
            <p class="font-bold text-center text-veryDarkViolet md:text-left">
                ${originalLink}
            </p>

            <div class="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
                <div class="font-bold text-cyan" id="link-one">
                    ${link1}
                </div>
                <button onclick="copyText1()" class="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none">
                    Copy
                </button>
            </div>
        </div>

        <div class="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row">
            <p class="font-bold text-center text-veryDarkViolet md:text-left">
                ${originalLink}
            </p>

            <div class="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
                <div class="font-bold text-cyan" id="link-two">
                    ${link2}
                </div>
                <button onclick="copyText2()" class="p-2 px-8 text-white bg-darkViolet rounded-lg hover:opacity-70 focus:outline-none">
                    Copy
                </button>
            </div>
        </div>
  `;
  input.value = "";
  linkContainer.appendChild(linkDiv);
}


const copyText1 = () =>{
  const linkOneText = document.getElementById("link-one").innerText;
  navigator.clipboard.writeText(linkOneText);
}

const copyText2 = () => {
  const linkTwoText = document.getElementById("link-two").innerText;
  navigator.clipboard.writeText(linkTwoText);
};