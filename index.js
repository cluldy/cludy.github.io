//at start
alert("본 뽑기 프로그램은 PC 전용입니다. 모바일로 사용시 PC로 접속해 주세요.");

//document.querySelector(".aaaa").classList.add("particle");


const welcome_title = document.querySelector(".welcome");

const paper_back = document.querySelector("#back");
const paper_name = document.querySelector(".paper_name");

const try_btn = document.querySelector(".try");
const money_pannel = document.querySelector(".money");

const back_light = document.querySelector(".back_light");
back_light.style.display = "none";

let paper_btn = [];

for (let i=0; i<10; i++) {
    paper_btn[i] = document.getElementsByClassName("paper")[i];
}

let particle = [];

const PARTICLE_COUNT = 56;
const TRY_TIME = 700;

const BLUE_PRICE = 226050;
const RED_PRICE = 741675;
const PURPLE_PRICE = 1952225;

function spray_particle() {
    for (let i=0; i<PARTICLE_COUNT; i++) {
        particle[i] = document.getElementsByClassName("particle")[i];
        particle[i].style.left = `${(Math.random() * (80 - 27)) + 27}rem`;
        particle[i].style.top = `${(Math.random() * (67 - 28)) + 28}rem`;
        //particle[i].style.display = 'none';
    }
}

spray_particle();

let chance = 10;
let pay = 7535;
let money = 0;
let view_count = 0;

let paper_made = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

setInterval(() => {
    welcome_title.style.color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
}, 100);

function change_view(_color, _chance, _pay, _count, _none) {
	if (paper_made[_count] == 1) {//already made
		try_btn.disabled = true;
		
	} else {//have to made
		try_btn.disabled = false;
	}
	
	if (_color !== "none") {
		paper_back.style.color = _color;
		paper_back.style.backgroundColor = _color;
	}

    paper_name.innerHTML = `${_count+1}장`;

    chance = _chance;
    pay = _pay;
    view_count = _count;
	
	if (paper_made[view_count] === 1) {
		back_light.style.display = "";
	} else {
		back_light.style.display = "none";
	}
}

paper_btn[0].addEventListener("click", ()=>{ change_view("#7f9ddd", 10, BLUE_PRICE, 0, 'b');} );
paper_btn[1].addEventListener("click", ()=>{ change_view("#7f9ddd", 10, BLUE_PRICE, 1, 'b');} );
paper_btn[2].addEventListener("click", ()=>{ change_view("#7f9ddd", 10, BLUE_PRICE, 2, 'b');} );
paper_btn[3].addEventListener("click", ()=>{ change_view("#7f9ddd", 10, BLUE_PRICE, 3, 'b');} );

paper_btn[4].addEventListener("click", ()=>{ change_view("#d48a5d", 15, RED_PRICE, 4, 'r');} );
paper_btn[5].addEventListener("click", ()=>{ change_view("#d48a5d", 10, RED_PRICE, 5, 'r');} );
paper_btn[6].addEventListener("click", ()=>{ change_view("#d48a5d", 7.5, RED_PRICE, 6, 'r');} );

paper_btn[7].addEventListener("click", ()=>{ change_view("#837ab1", 20, PURPLE_PRICE, 7, 'p');} );
paper_btn[8].addEventListener("click", ()=>{ change_view("#837ab1", 10, PURPLE_PRICE, 8, 'p');} );
paper_btn[9].addEventListener("click", ()=>{ change_view("#837ab1", 2, PURPLE_PRICE, 9, 'p');} );

//#endregion

function Try() {
    money += pay;
    money_pannel.innerHTML = `지불 금액 : ${money}`;

    const absoluteY = window.pageYOffset + paper_back.getBoundingClientRect().top;
    const absoluteX = paper_back.getBoundingClientRect().left;

    for (let i=0; i<PARTICLE_COUNT; i++) {
        let move_X = absoluteX - particle[i].getBoundingClientRect().left;
        let move_Y = absoluteY - (window.pageYOffset + particle[i].getBoundingClientRect().top);

        particle[i].style.transform = `translate(${move_X + 100}px, ${move_Y + 100}px)`;
    }

    let random = (Math.random() * 100);
    console.log(random);

    if (random <= chance) {
        alert("성공!");
        paper_made[view_count] = 1;
        change_view("none", 10, 7535, view_count, 'b');
    } else {
		paper_name.style.color = "red";
    }
}

function Do_Try() {
    try_btn.disabled = true;

    for (let i=0; i<10; i++) {
        paper_btn[i].disabled = true;
    }

    Try();

    setTimeout(() => {
		
		
        for (let i=0; i<PARTICLE_COUNT; i++) {
			paper_name.style.color = "black";
			
            particle[i].remove();

            particle[i] = document.createElement("div");
            document.body.appendChild(particle[i]);
            particle[i].classList.add("particle");
            particle[i].style.backgroundColor = "#" + Math.round(Math.random() * 0xffffff).toString(16);
        }

        spray_particle();
    }, TRY_TIME);

    setTimeout(()=>{
		if (paper_made[view_count] == 0) {//have to try more
			try_btn.disabled = false;
		}

        for (let i=0; i<10; i++) {
            paper_btn[i].disabled = false;
        }
    }, TRY_TIME);
}

try_btn.addEventListener("click", Do_Try);

//end
const complete_btn = document.querySelector(".success");

function complete() {
	for (let i=0; i<10; i++) {
		if (paper_made[i] === 0) {
			alert("제1장 부터 10장 까지 모두 완성되지 않았습니다.");
			return;
		}
	}
	
	alert("1장 부터 10장을 모두 만드셧 군요! \n 이 창을 끄지 말고 주최자 에게 보여 주세요.")
}

complete_btn.addEventListener("click", complete);