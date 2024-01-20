//import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//for resolving mouse sqeeze problem after stopping
var timeout;

// for animation
function firstPageAnim(){
	var tl = gsap.timeline();
	
	tl.from("#nav", { 
		y : '-10', 
		opacity : 0,
		duration : 1.5,
		ease : Expo.easeInOut
	 })
  .to(".boundingelem", { 
	y : 0, 
	duration : 1.5,
	delay : -.8,
	ease : Expo.easeInOut, 
	stagger : .2
       })
  .to(".boundown", { 
	y : 0, 
	delay : -1,
	duration : 0.8,
	ease : Expo.easeInOut, 
	stagger : 0.1
  })
  .from("#heroFooter", {
	y : -10, 
	opacity : 0,
	duration : 1.5,
	delay : -1, 
	ease : Expo.easeInOut
  })
}

// for mouse squeeze
function circleChaptaKaro(){
	var xscal = 1;
	var yscal = 1;
	var xprev = 0;
	var yprev = 0;
	window.addEventListener("mousemove", function(dets){
		clearTimeout(timeout);	

		var xdiff = dets.clientX - xprev;
		var ydiff = dets.clientY - yprev;
		
		xscal = gsap.utils.clamp(0.6, 1.5, xdiff);
		yscal = gsap.utils.clamp(0.6, 1.5, ydiff);

		xprev = dets.clientX;
		yprev = dets.clientY;
		
		circleMouseFollower(xscal, yscal);

		timeout = setTimeout(function(){
			document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
		}, 100);
	});
}
circleChaptaKaro();

// for mouse hover
function circleMouseFollower(xscal, yscal){
	window.addEventListener("mousemove", function(dets){
		document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscal}, ${yscal})`;
	});
}
circleMouseFollower();

firstPageAnim();


// for using image when on 3 bars

document.querySelectorAll(".elem").forEach(function (elem){
	var rotate = 0;
	var diffrot = 0;
	
  elem.addEventListener("mouseleave", function(dets){		gsap.to(elem.querySelector("img"), {
		opacity : 0,
		ease : Power3, 
		duration : 0.5
	});
 	});
	elem.addEventListener("mousemove", function(dets){
		var diff = dets.clientY - elem.getBoundingClientRect().top;
		diffrot = dets.clientX - rotate;
		rotate = dets.clientX;
		gsap.to(elem.querySelector("img"), {
			opacity : 1,
			ease : Power3, 
			top : diff,
			left : dets.clientX, 
			rotate : gsap.utils.clamp(-20, 20, diffrot * .5)
		});
	});
});











