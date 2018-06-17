// credit to mbokil on StackOverflow for info set and get cookie functions
// https://stackoverflow.com/a/28533769

// # of Days until Pickle Rick returns (time before cookie expiration)
const NUM_DAYS = 21;

/**
 * @brief Helper function for setting a cookie.
 * @param cookieName: name of cookie (i.e. 'PickleRick')
 * @param value: data stored in the cookie (i.e. True, 'Hello', etc.)
 * @param expDays: Number of days to keep cookie alive
 *
*/
function setCookie (cookieName,value,expDays) {
  let expDate = new Date();
  expDate.setDate(expDate.getDate() + expDays);

  if(expDays == 0) {
    expDate = "0";
  } else {
    expDate = expDate.toUTCString();
  }

  let c_value = escape(value) + ((expDays==null) ? "" : "; expires="+expDate);
  document.cookie = cookieName + "=" + c_value;
}

/**
 * @brief Helper function for checking if a cookie exists.
 * @param cookieName, name of cookie (i.e. 'PickleRick')
 * @return value of cookie, if it does not exist returns empty string
*/
function getCookie (cookieName) {
  let name = cookieName + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
  }
  return "";
}

/**
 * Add pickley elements to the DOM
 * Transitions are handled by CSS3
 */
function animateRick() {
  let pickleWrapper = document.createElement("div");
  pickleWrapper.classList.add('pickleWrapper');

  const rickTypes = ['pickle', 'sheriff', 'rat-suit'];
  rickTypes.forEach(function (rickname) {
    let pickle = document.createElement("img");
    pickle.classList.add(rickname + '-rick');
    pickle.src = 'img/pickle-rick-' + rickname + '.png';
    pickleWrapper.appendChild(pickle);
  });

  document.getElementsByTagName('body')[0].appendChild(pickleWrapper);
}

window.onload = function() {
  if(getCookie('PickleRick')) {
    console.log('Pickle Rick was here.');
  } else {
    console.log('Time to pickle it up.');
    animateRick();
    setCookie('PickleRick', '1', NUM_DAYS);
  }
}

