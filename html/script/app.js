//CONST
const ANIM1 = 'anim1';
const HOURS = 'hours';
const SLIDERS = 'sliders';
const HOURS_CONTAINER = '.hours-container';
const HOURS_CONTAINER_XS = '.hours-container-xs';
const TITLE = 'title';
const CLICK = 'click';
const INDEX = 'autoserwis';
const OFFER = 'oferta-mechanik-lubuskie';
const LOCATION = 'lokalizacja-mechanik-lubuskie';
const CONTACT = 'kontakt';
const today= new Date();
const dayOfWeek = today.getDay();
const hourNow = today.getHours();
const timeEntrance = Date.now();
const logo = document.querySelector('#logo')
const op1 = document.querySelector('#option-1');
const op2 = document.querySelector('#option-2');
const op3 = document.querySelector('#option-3');
const op1xs = document.querySelector('#optionxs-1');
const op2xs = document.querySelector('#optionxs-2');
const op3xs = document.querySelector('#optionxs-3');

//OPTIONS LISTENERS
logo.addEventListener(CLICK, () => window.location.assign(INDEX));
op1.addEventListener(CLICK, () => window.location.assign(OFFER));
op2.addEventListener(CLICK, () => window.location.assign(LOCATION));
op3.addEventListener(CLICK, () => window.location.assign(CONTACT));
op1xs.addEventListener(CLICK, () => window.location.assign(OFFER));
op2xs.addEventListener(CLICK, () => window.location.assign(LOCATION));
op3xs.addEventListener(CLICK, () => window.location.assign(CONTACT));

//WHAT TODAY IS DAY
$('.d'+ dayOfWeek).css('background-color', 'rgba(206, 29, 29, 0.6)');

//FUNCTIONS
function introAnimations() {
    const tl = gsap.timeline({defaults: {ease: 'power1.out'}});
    
    tl.to('.text', {y: '0%', duration: 1, stagger: 1});
    tl.from('#passion', {duration: 0.6, color:'white'});
    tl.to('.intro-slider', {x:'-110%', duration: 1, delay: 0.5});
    tl.to('.intro', {x: '-110%', duration: 1, delay: -1});
    tl.fromTo('.logo-container', {opacity: 0}, {opacity: 1, duration: 1}, ANIM1);
    tl.fromTo('section', {opacity: 0.2}, {opacity: 1, duration: 1}, ANIM1);
    tl.fromTo('nav', {opacity: 0}, {opacity: 1, duration: 0.8, delay: 0.5}, ANIM1);
    tl.fromTo('footer', {opacity: 0}, {opacity: 1, duration: 1}, ANIM1);
    tl.fromTo(HOURS_CONTAINER, {opacity: 0}, {opacity: 1, duration: 0.5}, HOURS);
    tl.fromTo(HOURS_CONTAINER_XS, {opacity: 0}, {opacity: 1, duration: 0.5}, HOURS);
    tl.fromTo('.slide-col', {opacity: 0}, {opacity: 1, duration: 0.3, stagger: 0.5}, SLIDERS);
    tl.fromTo('.uslugi-xs', {opacity: 0}, {opacity: 1, duration: 0.3, stagger: 0.5}, SLIDERS);
    localStorage.setItem('view', 'yes');
};

function areYouView() {
    const isView = localStorage.getItem('view');
    
    if (isView === null) {
        $('.intro').css('display', 'flex');
        introAnimations();
        localStorage.setItem('TimeEntrance', timeEntrance);
    } else {
        const TWELVE_HOURS_IN_MILLISEC = 43200000;
        const intTimeEntrance = parseInt(localStorage.getItem('TimeEntrance'));
        const timeAfter12h = intTimeEntrance + TWELVE_HOURS_IN_MILLISEC;

        $('.intro').css('display', 'none');
        if(timeEntrance > timeAfter12h) {
            localStorage.removeItem('view');
            areYouView();
        };
    };
};

function setInfoAboutDay(dayOfWeek, hourNow){
    const STILL_CLOSE_INFO = 'Jeszcze zamknięte. Zapraszamy dziś od 9.';
    const ALREADY_CLOSE_INFO = 'Już zamknięte. Zapraszamy jutro od 9.';
    const OPEN_INFO = 'Otwarte. Zapraszamy do warsztatu lub kontaktu telefonicznego.';
    const ALREADY_CLOSE_SATURDAY_INFO = 'Już zamknięte. Zapraszamy w poniedziałek od 9.';
    const SUNDAY_INFO = 'Zamknięte. Zapraszamy jutro od 9.';

    if (dayOfWeek > 0 || dayOfWeek < 6){
        if (hourNow < 9) {
            $(HOURS_CONTAINER_XS).attr(TITLE, STILL_CLOSE_INFO);
            $(HOURS_CONTAINER).attr(TITLE, STILL_CLOSE_INFO);
        } else if (hourNow > 16) {
            $(HOURS_CONTAINER_XS).attr(TITLE, ALREADY_CLOSE_INFO );
            $(HOURS_CONTAINER).attr(TITLE, ALREADY_CLOSE_INFO );
        } else {
            $(HOURS_CONTAINER).attr(TITLE, OPEN_INFO);
            $(HOURS_CONTAINER_XS).attr(TITLE, OPEN_INFO);
        };
    } else if (dayOfWeek === 6){
        if (hourNow < 9) {
            $(HOURS_CONTAINER_XS).attr(TITLE, STILL_CLOSE_INFO);
            $(HOURS_CONTAINER).attr(TITLE, STILL_CLOSE_INFO);
        } else if (hourNow > 13) {
            $(HOURS_CONTAINER_XS).attr(TITLE, ALREADY_CLOSE_SATURDAY_INFO);
            $(HOURS_CONTAINER).attr(TITLE, ALREADY_CLOSE_SATURDAY_INFO);
        } else {
            $(HOURS_CONTAINER).attr(TITLE, OPEN_INFO);
            $(HOURS_CONTAINER_XS).attr(TITLE, OPEN_INFO);
        };
    } else {
        $(HOURS_CONTAINER_XS).attr(TITLE, SUNDAY_INFO);
        $(HOURS_CONTAINER).attr(TITLE, SUNDAY_INFO);
    };
};

areYouView();
setInfoAboutDay(dayOfWeek, hourNow);

//COOKIES
function createCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    const expires = "; expires=" + date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for(let i=0; i < ca.length; i++) {
		const c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	};
	return null;
};

window.onload = checkCookies;

function checkCookies() {
    const cookieInfo = sessionStorage.getItem('cookies_accepted');

    if(readCookie('cookies_accepted') != 'Y') {
        const message_container = document.createElement('div');
        const html_code = '<div id="cookies-message" style="padding: 14px 0px; font-size: 1rem; color: var(--white); line-height: 22px; text-align: center; position: fixed; bottom: 0px; background: -webkit-linear-gradient(to left, var(--charcoal), var(--darkgrey)); background: linear-gradient(to left, var(--charcoal),var(--darkgrey)); width: 100%; z-index: 999;">Ta strona używa ciasteczek (cookies), dzięki którym nasz serwis może działać lepiej. <a class="ml-1 mr-1" style="color: var(--white); text-decoration-color: var(--red)" href="https://skrypt-cookies.pl/czym-sa-ciasteczka" target="_blank"> Dowiedz się więcej</a><a href="javascript:closeCookiesWindow();" id="accept-cookies-checkbox" name="accept-cookies" style="background-color: var(--red80); padding: 2px 10px; letter-spacing: 1px; color: var(--white); border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px; display: inline-block; margin-left: 10px; text-decoration: none; cursor: pointer; transition-timing-function: ease-in-out; transition: 0.5s;" onmouseover="cookieHoverOn()" onmouseout="cookieHoverOut()">Rozumiem</a></div>';
        
        message_container.id = 'cookies-message-container';
        message_container.innerHTML = html_code;
        document.body.appendChild(message_container);
    };
    if(cookieInfo === 'Y') {
        $('#cookies-message-container').css('display', 'none');
    };
};

function cookieHoverOn() {
    $('#accept-cookies-checkbox').css('background-color', 'var(--red)');
};

function cookieHoverOut() {
    $('#accept-cookies-checkbox').css('background-color', 'var(--red80)');
};

function closeCookiesWindow() {
    createCookie('cookies_accepted', 'Y', 365);
    sessionStorage.setItem('cookies_accepted', 'Y');
    document.getElementById('cookies-message-container').removeChild(document.getElementById('cookies-message'));
};
