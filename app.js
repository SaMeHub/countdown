/* countdown.mehlhase.info */
/* (c) Sascha Mehlhase - kontakt@mehlhase.info */

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  // navigator.serviceWorker.register('http://localhost/~saschamehlhase/mehlhase.info_countdown/sw.js');
}

window.onload = function() {

  var is_started = false;

  const frame = document.querySelector(".frame");
  const timerbox = document.querySelector(".timerbox");
  const timer_time = document.querySelector(".timer_time");
  const timer_message = document.querySelector(".timer_message");
  const setup_time = document.querySelector("#setup_time");
  const setup_position = document.querySelector("#setup_position");
  const setup_message_count = document.querySelector("#setup_message_count");
  const setup_message_finish = document.querySelector("#setup_message_finish");
  const setup_format = document.querySelector("#setup_format");
  const setup_start = document.querySelector("#setup_start");

  setup_position.addEventListener("change", (event) => {
    switch (setup_position.value) {
      case "topright":
        frame.style.justifyContent = "right";
        frame.style.alignItems = "start";
        break;
      case "right":
        frame.style.justifyContent = "right";
        frame.style.alignItems = "center";
        break;
      case "bottomright":
        frame.style.justifyContent = "right";
        frame.style.alignItems = "end";
        break;
      case "bottom":
        frame.style.justifyContent = "center";
        frame.style.alignItems = "end";
        break;
      case "bottomleft":
        frame.style.justifyContent = "left";
        frame.style.alignItems = "end";
        break;
      case "left":
        frame.style.justifyContent = "left";
        frame.style.alignItems = "center";
        break;
      case "top-left":
        frame.style.justifyContent = "left";
        frame.style.alignItems = "start";
        break;
      case "top":
        frame.style.justifyContent = "center";
        frame.style.alignItems = "start";
        break;
      default:
        frame.style.justifyContent = "center";
        frame.style.alignItems = "center";
    }
  });

  setup_message_count.addEventListener("input", (event) => {
    timer_message.innerHTML = setup_message_count.value;
  });

  frame.addEventListener("click", (event) => {
    if (event.target.tagName == "DIV") {
      const setupbox = document.querySelector(".setupbox");
      setupbox.style.display = "flex";
    }
  });

  setup_start.addEventListener("click", (event) => {
    const countdown = document.querySelector("#countuntil");
    countdown.checked = true;
    const setupbox = document.querySelector(".setupbox");
    setupbox.style.display = "none";
    timer_message.innerHTML = setup_message_count.value;
  });
  
  
  function update_time() {
    const now = new Date();
    const setup_type = document.querySelector("input[name=setup_type]:checked");
    if (setup_type.value == "countdown") {
      const setup_count_d = document.querySelector("#setup_count_d").value;
      const setup_count_h = document.querySelector("#setup_count_h").value;
      const setup_count_m = document.querySelector("#setup_count_m").value;
      const setup_count_s = document.querySelector("#setup_count_s").value;
      var delta = 1000 * setup_count_s + 1000 * 60 * setup_count_m + 1000 * 60 * 60 * setup_count_h + 1000 * 60 * 60 * 24 * setup_count_d;
      const dateTimeLocalValue = (new Date(now.getTime() + delta - now.getTimezoneOffset() * 60000).toISOString()).slice(0, -5);
      setup_time.value = dateTimeLocalValue;
    } else {
      
    }
    const dateTimeLocalValue = setup_time.value;
    const fakeUtcTime = new Date(`${dateTimeLocalValue}Z`);
    const then = new Date(fakeUtcTime.getTime() + fakeUtcTime.getTimezoneOffset() * 60000);
    var diff_s = Math.ceil((then - now) / 1000);
    
    if (diff_s < 0) {
      timer_time.innerHTML = setup_message_finish.value;
      timer_message.innerHTML = "";
    } else {
      var dhms_d = Math.floor(diff_s / (3600 * 24));
      var dhms_h = Math.floor(diff_s % (3600 * 24) / 3600);
      var dhms_m = Math.floor(diff_s % 3600 / 60);
      var dhms_s = Math.floor(diff_s % 60);
      var hms_h = Math.floor(diff_s / 3600);
      var ms_m = Math.floor(diff_s / 60);

      switch (setup_format.value) {
        case "dhms":
          timer_time.innerHTML =
            (dhms_d > 0 ? dhms_d + '<span class="unit">' + (dhms_d == 1 ? "day" : "days") + '</span>' : "")
            + ' ' +
            (dhms_h > 0 ? dhms_h + '<span class="unit">' + (dhms_h == 1 ? "hour" : "hours") + '</span>' : "")
            + ' ' +
            (dhms_m > 0 ? dhms_m + '<span class="unit">' + (dhms_m == 1 ? "min" : "mins") + '</span>' : "")
            + ' ' +
            dhms_s + '<span class="unit">' + (dhms_s == 1 ? "sec" : "secs") + '</span>';
          break;
        case "dhm":
          timer_time.innerHTML =
            (dhms_d > 0 ? dhms_d + '<span class="unit">' + (dhms_d == 1 ? "day" : "days") + '</span>' : "")
            + ' ' +
            (dhms_h > 0 ? dhms_h + '<span class="unit">' + (dhms_h == 1 ? "hour" : "hours") + '</span>' : "")
            + ' ' +
            (dhms_m > 0 ? dhms_m + '<span class="unit">' + (dhms_m == 1 ? "min" : "mins") + '</span>' : "");
          break;
        case "hms":
          timer_time.innerHTML =
            (hms_h > 0 ? hms_h + '<span class="unit">' + (hms_h == 1 ? "hour" : "hours") + '</span>' : "")
            + ' ' +
            (dhms_m > 0 ? dhms_m + '<span class="unit">' + (dhms_m == 1 ? "min" : "mins") + '</span>' : "")
            + ' ' +
            dhms_s + '<span class="unit">' + (dhms_s == 1 ? "sec" : "secs") + '</span>';
          break;
        case "hm":
          timer_time.innerHTML =
            (hms_h > 0 ? hms_h + '<span class="unit">' + (hms_h == 1 ? "hour" : "hours") + '</span>' : "")
            + ' ' +
            (dhms_m > 0 ? dhms_m + '<span class="unit">' + (dhms_m == 1 ? "min" : "mins") + '</span>' : "");
          break;
        case "ms":
          timer_time.innerHTML =
            (ms_m > 0 ? ms_m + '<span class="unit">' + (ms_m == 1 ? "min" : "mins") + '</span>' : "")
            + ' ' +
            dhms_s + '<span class="unit">' + (dhms_s == 1 ? "sec" : "secs") + '</span>';
          break;
        case "m":
          timer_time.innerHTML =
            ms_m + '<span class="unit">' + (ms_m == 1 ? "min" : "mins") + '</span>';
          break;
        case "s":
          timer_time.innerHTML =
            diff_s + '<span class="unit">' + (diff_s == 1 ? "sec" : "secs") + '</span>';
          break;
      }
    }
  }
  
  timer_message.innerHTML = setup_message_count.value;
  window.setInterval(update_time, 500);
};

// var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
// var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
// var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
// var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
