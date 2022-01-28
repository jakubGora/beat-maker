class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.cowbelAudio = document.querySelector(".cowbel-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.snareAudio = document.querySelector(".snare-sound");

    this.kickSelect = document.querySelector("#kick-select");
    this.cowbelSelect = document.querySelector("#cowbel-select");
    this.crashSelect = document.querySelector("#crash-select");
    this.snareSelect = document.querySelector("#snare-select");
    this.interval = undefined;
    this.bpmInput = document.querySelector("#bpm-input");

    this.isPlaying = false;
    this.intervalNr = 0;
    this.bpm = 100;
    this.index = 0;
  }

  repeat() {
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.pad`);
    for (const pad of activePads) {
      if (pad.classList.contains(`b${step}`)) {
        pad.style.width = "6rem";
        pad.style.height = "6rem";

        if (pad.classList.contains(`checked`)) {
          switch (pad.classList[1]) {
            case "kick-pad":
              this.kickAudio.pause();
              this.kickAudio.currentTime = 0;
              this.kickAudio.play();
              break;
            case "crash-pad":
              this.crashAudio.pause();
              this.crashAudio.currentTime = 0;
              this.crashAudio.play();
              break;
            case "snare-pad":
              this.snareAudio.pause();
              this.snareAudio.currentTime = 0;
              this.snareAudio.play();
              break;
            case "cowbel-pad":
              this.cowbelAudio.pause();
              this.cowbelAudio.currentTime = 0;
              this.cowbelAudio.play();
              break;
          }
        }
      } else {
        pad.style.width = "5rem";
        pad.style.height = "5rem";
      }
    }

    this.index++;
  }
  start() {
    if (!this.isPlaying) {
      this.intervalNr = setInterval(() => {
        this.repeat();
      }, (60 / this.bpm) * 1000);
      this.isPlaying = true;
    } else {
      clearInterval(this.intervalNr);
      this.isPlaying = false;
    }
  }

  stop() {
    clearInterval(this.start.interval);
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------

const onOff = false;
const allPads = document.querySelectorAll(".pad");
const onOffBtn = document.querySelector(".onOff");

const kit = new DrumKit();

onOffBtn.addEventListener("click", (event) => {
  if (!event.currentTarget.classList.contains("checked")) {
    event.currentTarget.classList.add("checked");
    onOff = true;
  } else {
    event.currentTarget.classList.remove("checked");
    onOff = false;
  }
});

for (const pad of allPads) {
  pad.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("pad")) {
      if (!event.currentTarget.classList.contains("checked"))
        event.currentTarget.classList.add("checked");
      else event.currentTarget.classList.remove("checked");
    }
  });
}

kit.kickSelect.addEventListener("click", (e) => {
  kit.kickAudio.src = kit.kickSelect.value;
});
kit.cowbelSelect.addEventListener("click", (e) => {
  kit.cowbelAudio.src = kit.cowbelSelect.value;
});
kit.crashSelect.addEventListener("click", (e) => {
  kit.crashAudio.src = kit.crashSelect.value;
});
kit.snareSelect.addEventListener("click", (e) => {
  kit.snareAudio.src = kit.snareSelect.value;
});

kit.bpmInput.addEventListener("change", (e) => {
  kit.bpm = parseInt(kit.bpmInput.value);
  kit.start();
  kit.start();
  console.log(kit.bpm);
});
let a = false;

function play() {
  kit.start();
}
