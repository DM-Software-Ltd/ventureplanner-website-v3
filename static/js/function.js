(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
			$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}

		$window.on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}

	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$(document).on("click", "a[href='#top']", function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768:{
					slidesPerView: 1,
				},
				991:{
					slidesPerView: 1,
				}
			}
		});
	}

	/* Company Support Slider JS */
	if ($('.company-supports-slider').length) {
		const agency_supports_slider = new Swiper('.company-supports-slider .swiper', {
			slidesPerView : 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768:{
					slidesPerView:     4,
				},
				991:{
					slidesPerView: 5,
				}
			}
		});
	}

	/* testimonial Slider Elite JS */
	if ($('.testimonial-slider-elite').length) {
		const testimonial_slider_elite = new Swiper('.testimonial-slider-elite .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination-elite',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next-elite',
				prevEl: '.testimonial-button-prev-elite',
			},
			breakpoints: {
				768:{
					slidesPerView: 1,
				},
				991:{
					slidesPerView: 1,
				}
			}
		});
	}

	/* Company Support Slider Elite JS */
	if ($('.company-supports-slider-elite').length) {
		const agency_supports_slider_elite = new Swiper('.company-supports-slider-elite .swiper', {
			slidesPerView : 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768:{
					slidesPerView:     3,
				},
				991:{
					slidesPerView: 5,
				}
			}
		});
	}

	/* Hero Company Support Slider JS */
	if ($('.hero-company-slider-silver').length) {
		const hero_company_slider_silver = new Swiper('.hero-company-slider-silver .swiper', {
			slidesPerView : 2,
			speed: 2000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				991:{
					slidesPerView: 3,
				},
				1441:{
					slidesPerView: 4,
				},
			}
		});
	}

	/* testimonial Slider Silver JS */
	if ($('.testimonial-slider-silver').length) {
		const testimonial_slider_silver = new Swiper('.testimonial-slider-silver .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 60,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination-silver',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next-silver',
				prevEl: '.testimonial-button-prev-silver',
			},
			breakpoints: {
				768:{
					slidesPerView: 2,
				},
				991:{
					slidesPerView: 2,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
					width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});
			tl.set(container, {
				autoAlpha: 1
			});
			tl.from(container, 1, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1, {
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: Power2.out
			});
		});
	}

	/* Text Effect Animation */
	function initHeadingAnimation() {

		if($('.text-effect').length) {
			var textheading = $(".text-effect");

			if(textheading.length === 0) return; gsap.registerPlugin(SplitText); textheading.each(function(index, el) {

				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "split-line"
				});

				if( $(el).hasClass('text-effect') ){
					gsap.set(el.split.chars, {
						opacity: .3,
						x: "-7",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 92%",
						end: "top 60%",
						markers: false,
						scrub: 1,
					},

					x: "0",
					y: "0",
					opacity: 1,
					duration: .7,
					stagger: 0.2,
				});

			});
		}

		if ($('.text-anime-style-1').length) {
			let staggerAmount  = 0.05,
				translateXValue = 0,
				delayValue        = 0.5,
				animatedTextElements = document.querySelectorAll('.text-anime-style-1');

			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
					duration: 1,
					delay: delayValue,
					x: 20,
					autoAlpha: 0,
					stagger: staggerAmount,
					scrollTrigger: { trigger: element, start: "top 85%" },
				});
			});
		}

		if ($('.text-anime-style-2').length) {
			let     staggerAmount        = 0.03,
				translateXValue   = 20,
				delayValue       = 0.1,
				easeType        = "power2.out",
				animatedTextElements = document.querySelectorAll('.text-anime-style-2');

			animatedTextElements.forEach((element) => {
				let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
			});
		}

		if ($('.text-anime-style-3').length) {
			let    animatedTextElements = document.querySelectorAll('.text-anime-style-3');

			animatedTextElements.forEach((element) => {
				//Reset if needed
				if (element.animation) {
					element.animation.progress(1).kill();
					element.split.revert();
				}

				element.split = new SplitText(element, {
					type: "lines,words,chars",
					linesClass: "split-line",
				});
				gsap.set(element, { perspective: 400 });

				gsap.set(element.split.chars, {
					opacity: 0,
					x: "50",
				});

				element.animation = gsap.to(element.split.chars, {
					scrollTrigger: { trigger: element, start: "top 90%" },
					x: "0",
					y: "0",
					rotateX: "0",
					opacity: 1,
					duration: 1,
					ease: Back.easeOut,
					stagger: 0.02,
				});
			});
		}
	}

	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(() => {
			initHeadingAnimation();
		});
	} else {
		window.addEventListener("load", initHeadingAnimation);
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Ajax call to submit form */
		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: $contactform.serialize(),
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	if ($(".comparison-container").length) {
		const container = document.querySelector(".comparison-container");
		const afterImg = container.querySelector(".comparison-after");
		const handle = container.querySelector(".comparison-handle");
		let isDragging = false;

		function moveHandle(x) {
			const rect = container.getBoundingClientRect();
			let position = x - rect.left;
			position = Math.max(0, Math.min(position, rect.width));
			handle.style.left = position + "px";
			const percentage = (position / rect.width) * 100;
			afterImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
		}

		handle.addEventListener("mousedown", () => isDragging = true);
		window.addEventListener("mouseup", () => isDragging = false);
		window.addEventListener("mousemove", e => {
			if (isDragging) moveHandle(e.clientX);
		});

		handle.addEventListener("touchstart", () => isDragging = true);
		window.addEventListener("touchend", () => isDragging = false);
		window.addEventListener("touchmove", e => {
			if (isDragging) moveHandle(e.touches[0].clientX);
		});
	}

	/* Service Item List Start */
	var $service_item_list = $('.services-list');
	if ($service_item_list.length) {
		var $service_item = $service_item_list.find('.service-item');

		if ($service_item.length) {
			$service_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_item.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Service Item List End */

	/* How Work List Start */
	var $how_works_list = $('.how-works-list');
	if ($how_works_list.length) {
		var $how_works_item = $how_works_list.find('.how-works-item');

		if ($how_works_item.length) {
			$how_works_item.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$how_works_item.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* How Work List End */

	/* Service Item List Start */
	var $service_list_silver = $('.service-list-silver');
	if ($service_list_silver.length) {
		var $service_item_silver = $service_list_silver.find('.service-item-silver');

		if ($service_item_silver.length) {
			$service_item_silver.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$service_item_silver.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Service Item List End */

	/* Our Pricing Tab JS Start  */
	if ($('.our-pricing-box').length) {
		$('#planToggle').change(function () {
			if ($(this).is(':checked')) {
				$('#monthly').addClass('d-none');
				$('#annually').removeClass('d-none');
			}
			else {
				$('#annually').addClass('d-none');
				$('#monthly').removeClass('d-none');
			}
		});
	}
	if ($('#pricing-section').length) {
		// --- STATE AND CONFIGURATION ---
		let state = {
			isMonthly: true,
			currency: 'usd',
			prices: null,
			options: []
		};

		const pricePlans = {
			free: {
				type: "Free",
				iconClass: "fi fi-tr-user-unlock fi large"
			},
			business: {
				type: "Business",
				iconClass: "fi fi-tr-clapperboard-play fi large",
				featureList: ["Max Three Businesses", "Unlimited AI Queries", "Word & PDF Export", "Multi-User Collaboration"],
				link: "https://app.ventureplanner.ai/business_register"
			},
			consultant: {
				type: "Consultant",
				iconClass: "fi fi-tr-fingerprint fi large",
				featureList: ["Max Forty Businesses / Month", "Unlimited AI Queries", "Word & PDF Export", "Multi-User Collaboration"],
				link: "https://app.ventureplanner.ai/business_register"
			},
			agency: {
				type: "Agency",
				iconClass: "fi fi-tr-circle-nodes fi large"
			}
		};

		const currencyCountryMap = [
			{ countries: ["United Kingdom", "England", "Scotland", "Wales", "Northern Ireland"], currency: "gbp" },
			{ countries: ["United States", "Ecuador", "El Salvador"], currency: "usd" },
			{ countries: ["Germany", "France", "Italy", "Spain", "Netherlands"], currency: "eur"},
		];

		// --- INITIALIZATION ---
		initializeStaticCards();
		toggleAllCardViews();
		detectCustomerCurrency().then(function() {
			getStripePriceCatalogue().done(function() {
				setPriceOptions();
				renderDynamicCards();
			}).fail(function() {
				['business', 'consultant'].forEach(function(planKey) {
					$("#price-" + planKey).text("Let's Talk.");
					const $featureList = $('#features-' + planKey);
					$featureList.empty();
					pricePlans[planKey].featureList.forEach(function(feature) {
						$featureList.append($('<li>').text(feature));
					});

					$('#icon-' + planKey).addClass(pricePlans[planKey].iconClass);
					$('#cta-' + planKey).attr('href', pricePlans[planKey].link);
				});
			});
		});

		// --- EVENT HANDLER FOR TOGGLE ---
		$('#planToggle').on('change', function() {
			state.isMonthly = !$(this).is(':checked'); // checked = Annually, unchecked = Monthly
			toggleAllCardViews();
			updateDynamicPrices();
		});

		// --- SETUP & RENDERING FUNCTIONS ---

		function initializeStaticCards() {
			$('#icon-free').addClass(pricePlans.free.iconClass);
			$('#icon-agency').addClass(pricePlans.agency.iconClass);
		}

		function renderDynamicCards() {
			state.options.forEach(function(option) {
				const planKey = option.features.type.toLowerCase();

				// This line loads the icon class, which is fine
				$('#icon-' + planKey).addClass(option.features.iconClass);

				// This is the feature list rendering part
				const $featureList = $('#features-' + planKey);
				$featureList.empty(); // Clears "Loading..."
				option.features.featureList.forEach(function(feature) {
					$featureList.append($('<li>').text(feature));
				});

				// This line loads the CTA link
				$('#cta-' + planKey).attr('href', option.features.link);
			});
			updateDynamicPrices();
		}

		function updateDynamicPrices() {
			if (!state.options.length) return;

			state.options.forEach(function(option) {
				var planKey = option.features.type.toLowerCase();
				var price = calculatePayablePrice(option);
				var symbol = getCurrencySymbol();
				var period = state.isMonthly ? '/month' : '/year';
				var priceHTML = symbol + price.toFixed(0) + '<sub>' + period + '</sub>';
				$('#price-' + planKey).html(priceHTML);
			});
		}

		function toggleAllCardViews() {
			Object.keys(pricePlans).forEach(function(planKey) {
				var $nameEl = $('#name-' + planKey);
				var $iconContainerEl = $nameEl.siblings('.plan-icon');

				console.log('$iconContainerEl');
				console.log($iconContainerEl);

				if (state.isMonthly) {
					$nameEl.show();
					$iconContainerEl.hide();
				} else {
					$nameEl.hide();
					$iconContainerEl.show();
				}
			});

			var freePriceText = state.isMonthly ? '$0<sub>/month</sub>' : '$0<sub>/year</sub>';
			$('#price-free').html(freePriceText);
		}

		// --- DATA FETCHING ---
		function getStripePriceCatalogue() {
			var apiUrl = "https://server.ventureplanner.ai/public/api/payments/stripe_price_catalogue";
			return $.ajax({
				url: apiUrl, data: { core: true }, method: 'GET',
				success: function(response) { state.prices = response; }
			});
		}

		function setPriceOptions() {
			if (state.prices) {
				state.options = [];
				['business', 'consultant'].forEach(function(key) {
					if(state.prices[key]) {
						state.options.push({ ...state.prices[key], features: pricePlans[key] });
					}
				});
			}
		}

		// --- HELPER & CALCULATION FUNCTIONS ---
		function detectCustomerCurrency() {
			try {
				var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
				var country = getCountryForTimezone(tz);
				var found = currencyCountryMap.find(function(m) { return m.countries.includes(country.name); });
				if (found) { state.currency = found.currency; }
			} catch (e) { console.warn("Could not detect currency, defaulting to USD."); }
			return Promise.resolve();
		}

		function calculatePayablePrice(option) {
			if (!option.month) return 0;
			var periodKey = state.isMonthly ? 'month' : 'year';
			var priceData = option[periodKey].currency_options[state.currency] || option[periodKey];
			return priceData.unit_amount_decimal / 100;
		}

		function getCurrencySymbol() {
			return new Intl.NumberFormat('en-GB', { style: 'currency', currency: state.currency, minimumFractionDigits: 0 }).formatToParts(0).find(function(x) { return x.type === 'currency' }).value;
		}

		function getCountryForTimezone(timezone) {
			if (timezone.includes('London')) return { name: 'United Kingdom' };
			if (timezone.includes('New_York') || timezone.includes('Chicago')) return { name: 'United States' };
			if (timezone.includes('Berlin') || timezone.includes('Paris')) return { name: 'Germany' };
			return { name: 'United States' };
		}
	}


	function initializeFullFAQPage() {
		// Safely check if the global data exists
		if (typeof SHARED_FAQ_DATA === 'undefined' || SHARED_FAQ_DATA.length === 0) {
			console.error("SHARED_FAQ_DATA is missing or empty.");
			$('#faq-loading-spinner').hide();
			$('#faq-content-area').show();
			return;
		}

		const $spinner = $('#faq-loading-spinner');
		const $contentArea = $('#faq-content-area');
		const $sidebarLinks = $('#faq-sidebar-links');
		const $contentContainer = $('#faq-content-container');

		const questionGroups = SHARED_FAQ_DATA;

		// --- Dynamic Content Generation ---
		questionGroups.forEach((group, indexG) => {
			// Section ID for scrolling and targeting (e.g., faq_1, faq_2)
			const sectionId = `faq_${indexG + 1}`;
			// Unique ID for the accordion container (e.g., accordion0, accordion1)
			const accordionContainerId = `accordion${indexG}`;

			// --- A. Render Sidebar Link ---
			const linkHtml = `<li><a href="#${sectionId}" class="sidebar-link" data-target-id="${sectionId}">${group.title}</a></li>`;
			$sidebarLinks.append(linkHtml);

			// --- B. Render FAQ Group Content ---
			let accordionContent = '';
			group.questions.forEach((question, indexQ) => {
				const headingId = `heading${indexG}-${indexQ}`;
				const collapseId = `collapse${indexG}-${indexQ}`;

				// First item in the first group is initially open (show class)
				const isFirstItemInGroup = (indexQ === 0);

				// WOW animation delay logic
				const delayIndex = indexQ % 5;
				const dataWowDelay = `${delayIndex * 0.2}s`;

				accordionContent += `
                <div class="accordion-item wow fadeInUp" data-wow-delay="${dataWowDelay}">
                   <h2 class="accordion-header" id="${headingId}">
                      <button
                         class="accordion-button ${isFirstItemInGroup ? '' : 'collapsed'}"
                         type="button"
                         data-bs-toggle="collapse"
                         data-bs-target="#${collapseId}"
                         aria-expanded="${isFirstItemInGroup ? 'true' : 'false'}"
                         aria-controls="${collapseId}"
                      >
                         Q${indexQ + 1}: ${question.question}
                      </button>
                   </h2>
                   <div
                      id="${collapseId}"
                      class="accordion-collapse collapse ${isFirstItemInGroup ? 'show' : ''}"
                      aria-labelledby="${headingId}"
                      data-bs-parent="#${accordionContainerId}"
                   >
                      <div class="accordion-body">
                         <p>${question.answer}</p>
                      </div>
                   </div>
                </div>
             `;
			});

			// Assemble the full group container, matching the page-single-faqs structure
			const groupHtml = `
             <div class="page-single-faqs" id="${sectionId}">
                <div class="section-title">
                   <h2 class="text-anime-style-3" data-cursor="-opaque">${group.title}</h2>
                </div>
                <div class="faq-accordion our-faq-accordion" id="${accordionContainerId}">
                   ${accordionContent}
                </div>
             </div>
          `;
			$contentContainer.append(groupHtml);
		});

		$sidebarLinks.on('click', '.sidebar-link', function(e) {
			e.preventDefault();
			const targetId = $(this).data('target-id');
			const $targetElement = $(`#${targetId}`);
			const scrollOffset = 100;

			if ($targetElement.length) {
				$('html, body').animate({
					scrollTop: $targetElement.offset().top - scrollOffset
				}, 800);
			}
		});
		$spinner.hide();
		$contentArea.show();
	}

	$(window).on('load', function() {
		if ($('#faq-content-area').length) initializeFullFAQPage();
	});

	/* --------------------------------------------
       Support Form + Cloudflare Turnstile Handler
    ---------------------------------------------*/
	if ($('#supportForm').length) {
		console.log("Support form detected.");

		const $form = $('#supportForm');
		const $response = $('#supportResponse');

		// Handle AJAX submit
		$form.on('submit', function(e) {
			e.preventDefault();
			$response.html('');

			$.ajax({
				url: $form.attr('action'),
				type: 'POST',
				data: $form.serialize(),
				success: function(data) {
					if (data.status === 'success') {
						$response.html('<p class="text-success">' + data.message + '</p>');
						$form.trigger('reset');
					} else {
						$response.html('<p class="text-danger">' + data.message + '</p>');
					}
				},
				error: function() {
					$response.html('<p class="text-danger">An unexpected error occurred.</p>');
				}
			});
		});
	}

	function generateTestimonialHTML(testimonial, options = {}) {
		const {
			layout = "slider",      // "slider" or "grid"
			wowDelay = "0s"
		} = options;

		// ⭐ Star rating generator (shared)
		let ratingHtml = "";
		for (let i = 0; i < 5; i++) {
			ratingHtml +=
				i < Math.floor(testimonial.starRating)
					? `<i class="fa fa-star"></i>`
					: i < testimonial.starRating
						? `<i class="fa fa-star-half-o"></i>`
						: `<i class="fa fa-star-o"></i>`;
		}

		// Choose template
		if (layout === "grid") {
			return `
            <div class="col-xl-4 col-md-6">
                <div class="testimonial-item wow fadeInUp" data-wow-delay="${wowDelay}">
                    <div class="testimonial-company-logo">
                        <img src="${testimonial.profileImgSrc}" alt="${testimonial.businessName} Logo">
                    </div>
                    <div class="testimonial-content">
                        <h3>${testimonial.topLine}</h3>
                        <p>"${testimonial.text}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-content">
                            <h3>${testimonial.name}</h3>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
		}

		// Slider template
		return `
        <div class="swiper-slide">
            <div class="testimonial-item">
                <div class="testimonial-company-logo">
                    <img src="${testimonial.profileImgSrc}" alt="${testimonial.businessName} Logo">
                </div>
                <div class="testimonial-content">
                    <h3>${testimonial.topLine}</h3>
                    <p>"${testimonial.text}"</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-content">
                        <h3>${testimonial.name}</h3>
                        <p>${testimonial.role} - ${testimonial.businessName}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
	}

	function renderTestimonialsToSlider() {
		if (!TESTEMONIAL_DATA) return;
		const $wrap = $('.testimonial-slider .swiper-wrapper');
		let html = "";

		TESTEMONIAL_DATA.forEach(t => {
			html += generateTestimonialHTML(t, { layout: "slider" });
		});

		$wrap.html(html);
	}

	function renderTestimonialsToGrid() {
		if (!TESTEMONIAL_DATA) return;
		const $grid = $('#testimonial-grid');
		let html = "";

		TESTEMONIAL_DATA.forEach((t, index) => {
			const wowDelay = (index * 0.2).toFixed(1) + "s"; // 0s, 0.2s, 0.4s...
			html += generateTestimonialHTML(t, {
				layout: "grid",
				wowDelay
			});
		});

		$grid.html(html);
	}

	function renderMarketingTestimonials() {
		// Ensure the global data object exists and the target wrapper is in the DOM
		if (typeof TESTEMONIAL_DATA === 'undefined' || !$('.testimonial-slider-silver .swiper-wrapper').length) {
			return;
		}

		const $swiperWrapper = $('.testimonial-slider-silver .swiper-wrapper');
		let slidesHtml = '';

		// Build the HTML for all testimonial slides using the marketing/silver design
		TESTEMONIAL_DATA.forEach(function(testimonial) {
			// Generate star rating icons based on starRating property
			let ratingHtml = '';
			for (let i = 0; i < 5; i++) {
				if (i < Math.floor(testimonial.starRating)) {
					// Full star icon
					ratingHtml += '<i class="fa-solid fa-star"></i>';
				} else if (i < testimonial.starRating) {
					// Half star icon
					ratingHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
				} else {
					// Empty star icon (not shown in this design, but kept for completeness)
					ratingHtml += '<i class="fa-regular fa-star"></i>';
				}
			}

			// Build the slide structure for marketing testimonials (silver theme)
			slidesHtml += `
                <div class="swiper-slide">
                    <div class="testimonial-item-silver">
                        <div class="testimonial-item-header-silver">
                            <div class="testimonial-rating-silver">
                                ${ratingHtml}
                            </div>
                            <div class="testimonial-content-silver">
                                <p>"${testimonial.text}"</p>
                            </div>
                        </div>
                        <div class="testimonial-body-silver">
                            <div class="author-content-silver">
                                <h3>${testimonial.name}</h3>
                                <p>${testimonial.role}</p>
                            </div>
                            <div class="testimonial-quote-silver">
                                <img src="/static/images/testimonial-quote-silver.svg" alt="Decorative image" loading="lazy">
                            </div>
                        </div>
                    </div>
                </div>
            `;
		});

		// Clear existing content and inject the new slides
		$swiperWrapper.empty().html(slidesHtml);
	}

	// Call the rendering function on window load to ensure all scripts (including the data) are ready
	$window.on('load', function(){
		if ($('#testimonial-grid').length) renderTestimonialsToGrid();
		if ($('.testimonial-slider .swiper-wrapper').length) renderTestimonialsToSlider();
		renderMarketingTestimonials();
		renderMarketingPlans();
		$(".preloader").fadeOut(600);
	});

	/* ----------------------------------------------------
   Custom Carousel Logic (Marquee Style Infinite Loop)
---------------------------------------------------- */
	/* ----------------------------------------------------
       Custom Carousel Logic (Marquee Style Infinite Loop)
    ---------------------------------------------------- */

	function initializeCustomCarousel() {
		const $track = $("#carouselTrack");
		const IMAGE_FILES = [
			{
				simple: "marketing-plan-market-collateral.svg",
				detailed: "VP_MarketingPlan_Block1_EmailMarketingPlan.svg"
			},
			{
				simple: "business-plan-market-data.svg",
				detailed: "VP_MarketingPlan_Block1_SEOPlan.svg"
			},
			{
				simple: "business-plan-financial-charts.svg",
				detailed: "VP_MarketingPlan_Block1_SocialMediaPlan.svg"
			}
		];

		const VISIBLE_SLOTS = 6;
		const HEAD_CLONES = VISIBLE_SLOTS + 2;
		const TAIL_CLONES = VISIBLE_SLOTS + 2;
		const ASPECT_RATIO = 1.414;
		const ITEM_MARGIN_REM = 1.5;
		const ITEM_MARGIN_PX = ITEM_MARGIN_REM * 16;
		const AUTO_ADVANCE_MS = 5000;
		const $container = $(".carousel-rotation-wrapper");
		$container.addClass("no-transition");


		let customCarouselIndex = HEAD_CLONES + 3;       // Start in the middle, keeps large card on the right
		let itemWidth = 0;
		let itemHeight = 0;
		let CARD_COUNT = 15;
		CARD_COUNT = Math.round(CARD_COUNT / IMAGE_FILES.length) * IMAGE_FILES.length;

		function generateCards() {
			let cards = "";
			for (let i = 0; i < CARD_COUNT; i++) {
				const img = IMAGE_FILES[i % IMAGE_FILES.length];
				cards += `
					<div class="card-item card-ratio-base" 
						data-idx="${i}"
						style="background-image:url('/static/images/${img.detailed}')">
						<img src="/static/images/${img.simple}" />
					</div>
				`;
			}

			$track.html(cards);

			// Clone tail
			const tailClones = $track.children().slice(-TAIL_CLONES).clone(true);
			tailClones.addClass("is-clone");
			$track.prepend(tailClones);

			// Clone head
			const headClones = $track.children().slice(TAIL_CLONES, TAIL_CLONES + HEAD_CLONES).clone(true);
			headClones.addClass("is-clone");
			$track.append(headClones);
		}

		function resizeCards() {
			const containerWidth = $container.width();
			const slotFraction = 1 / VISIBLE_SLOTS;

			itemWidth = (((containerWidth / 220) * 100) * slotFraction) - ITEM_MARGIN_PX;
			itemHeight = itemWidth * ASPECT_RATIO;

			const featuredHeight = itemHeight * 2;

			$track.children().each(function () {
				$(this).css({
					width: itemWidth + "px",
					height: itemHeight + "px",
					marginRight: ITEM_MARGIN_REM + "rem",
				});
			});

			$container.css("padding-top", (featuredHeight / 2 + 20) + "px");
		}

		function updateCarousel(animate = true) {
			const cards = $track.children();
			const FEATURED_VISUAL_POSITION = 3;   // The big card sits visually on the right

			cards.each(function (i) {
				const isFeatured = (i === customCarouselIndex);
				$(this).toggleClass("featured", isFeatured);

				$(this).css({
					transform: isFeatured ? 'scale(2.5)' : 'scale(1)',
					opacity: isFeatured ? 1 : 0.6,
					zIndex: isFeatured ? 10 : 1
				});
			});

			let shift = 0;
			for (let i = 0; i < customCarouselIndex - FEATURED_VISUAL_POSITION; i++) {
				const isFeatured = (i === customCarouselIndex);
				const w = isFeatured ? featuredWidth : itemWidth;
				shift += w + ITEM_MARGIN_PX;
			}

			const viewportOffsetFix = ($container.width() * 0.35);

			$track.css({
				transition: animate ? "transform 0.8s ease" : "none",
				transform: `translateX(calc(${viewportOffsetFix}px - ${shift}px))`
			});

			if (customCarouselIndex >= CARD_COUNT + HEAD_CLONES) {
				const naturalIndex = customCarouselIndex - CARD_COUNT;
				customCarouselIndex = naturalIndex;
				setTimeout(() => updateCarousel(false), 820);
			}

			if (customCarouselIndex < HEAD_CLONES) {
				const naturalIndex = customCarouselIndex + CARD_COUNT;
				customCarouselIndex = naturalIndex;
				setTimeout(() => updateCarousel(false), 820);
			}
		}
		generateCards();
		resizeCards();

		setTimeout(() => $container.removeClass("no-transition"), 50);

		updateCarousel(false);
		let autoTimer = setInterval(() => {
			customCarouselIndex++;
			updateCarousel(true);
		}, AUTO_ADVANCE_MS);

		$track.on("click", ".card-item:not(.featured)", function () {
			customCarouselIndex = $(this).index();
			updateCarousel(true);

			clearInterval(autoTimer);
			autoTimer = setInterval(() => {
				customCarouselIndex++;
				updateCarousel(true);
			}, AUTO_ADVANCE_MS);
		});
		$(window).on("resize", function () {
			clearTimeout(window.__carousel_resize_timer);
			window.__carousel_resize_timer = setTimeout(() => {
				resizeCards();
				updateCarousel(false);
			}, 250);
		});
	}

	/* ----------------------------------------------------
       Isotope + Typewriter Sync (with "plan" suffix)
       - Sorts by data-plan-type weight
       - Typewriter says "marketing plan", "financial plan", etc.
    ---------------------------------------------------- */

// --- Cycle logic ---
	const centerTypes = ['marketing', 'financial', 'business'];
	let currentIndex = 0;
	let currentCenterType = centerTypes[currentIndex]; // must exist before Isotope init

// --- Assign numeric weights ---
	function getWeightForType(types, center) {
		if (types.includes(center)) return 0;
		if (center === 'marketing') {
			if (types.includes('financial')) return 1;
			if (types.includes('business')) return 2;
		} else if (center === 'financial') {
			if (types.includes('business')) return 1;
			if (types.includes('marketing')) return 2;
		} else if (center === 'business') {
			if (types.includes('financial')) return 1;
			if (types.includes('marketing')) return 2;
		}
		return 3;
	}

// --- Initialize Isotope ---
	const $grid = $('.grid').isotope({
		itemSelector: '.item',
		layoutMode: 'masonry',
		getSortData: {
			planWeight: function (itemElem) {
				const attr = $(itemElem).attr('data-plan-type');
				if (!attr) return 999;
				try {
					const types = JSON.parse(attr.replace(/'/g, '"'));
					return getWeightForType(types, currentCenterType);
				} catch (e) {
					return 999;
				}
			}
		},
		sortBy: 'planWeight',
		transitionDuration: '1.2s'
	});

// --- Typewriter setup ---
	const $span = $(".plan-type-text");
	let isDeleting = false;
	let currentText = "";
	let typeTimeout = null;

// These are the full phrases
	const phrases = ['Marketing Plans', 'Financial Plans', 'Business Plans'];

// Timing constants
	const CYCLE = 5000;      // must match isotope interval
	const TYPE_TIME = 1800;
	const DELETE_TIME = 1700;
	const HOLD_TIME = 800;

	function getTypingDelay(wordLength, phase) {
		if (phase === "type") return TYPE_TIME / wordLength;
		if (phase === "delete") return DELETE_TIME / wordLength;
		return 50;
	}

	function typeNextLetter(phrase) {
		if (!$span.length) return;

		const step = isDeleting ? -1 : 1;
		const nextLength = currentText.length + step;
		currentText = phrase.substring(0, nextLength);
		$span.text(currentText);

		const doneTyping = !isDeleting && currentText === phrase;
		const doneDeleting = isDeleting && currentText === "";

		if (doneTyping) {
			typeTimeout = setTimeout(() => {
				isDeleting = true;
				typeNextLetter(phrase);
			}, HOLD_TIME);
		} else if (doneDeleting) {
			// stop until the next sort triggers
			isDeleting = false;
			clearTimeout(typeTimeout);
		} else {
			const delay = getTypingDelay(phrase.length, isDeleting ? "delete" : "type");
			typeTimeout = setTimeout(() => typeNextLetter(phrase), delay);
		}
	}

// --- Function to change sort + trigger typing ---
	function changeSortFocus() {
		currentCenterType = centerTypes[currentIndex];
		currentIndex = (currentIndex + 1) % centerTypes.length;

		// update Isotope sort
		$grid.isotope('updateSortData').isotope({ sortBy: 'planWeight' });

		// --- Background Color Transition (HSL) ---
		const colorMap = {
			business: 'hsl(40 54.5% 95.7%)',
			marketing: 'hsl(353 40% 96.1%)',
			financial: 'hsl(192 35.7% 94.5%)'
		};

		// Smooth transition for hero background
		$('.hero-image').css('background-color', colorMap[currentCenterType]);

		// --- Typewriter Effect ---
		const phrase = phrases[centerTypes.indexOf(currentCenterType)];
		clearTimeout(typeTimeout);
		isDeleting = false;
		currentText = "";
		typeNextLetter(phrase);
	}
	function defaultPlanTemplate(plan) {
		return `
            <div class="plan-option ${plan.type || "marketing"}">
                <div class="plan-option__inner">

                    <!-- Left Visual -->
                    <div class="plan-option__inner--render">
                        <img src="${plan.thumb || "/static/images/business-plan-financial-charts.svg"}" alt="${plan.label}">

                        ${plan.popular ? `
                            <div class="popular-badge">
                                <div class="badge-text">Popular</div>
                            </div>
                        ` : ""}
                    </div>

                    <!-- Right Panel -->
                    <div class="plan-option__inner--overlay">
                        <div class="plan-option__inner--overlay__title">
                            ${plan.label}
                            ${plan.subTitle ? `<span class="fw-light d-block">${plan.subTitle}</span>` : ""}
                        </div>

                        <div class="plan-option__inner--overlay__for">
                            ${plan.shortDescription}
                        </div>

                        <div class="plan-option__inner--overlay__time">

                            <div class="plans-time-needed">
                                <i class="fi fi-tr-pending"></i>${plan.estimatedTime}
                            </div>
                        </div>

                        <div class="plan-option__inner--overlay__icon">
                            <img class="icon" src="/static/images/icon-mp.svg" alt="marketing plan icon">
                        </div>
                    </div>
                </div>
            </div>
        `;
	}

	function renderMarketingPlans(options = {}) {
		const {
			containerSelector = '.right-panel-grid',
			data = window.PLAN_DATA,
			template = defaultPlanTemplate
		} = options;

		const container = document.querySelector(containerSelector);
		if (!container) return;
		if (!data || !Array.isArray(data) || data.length === 0) return;

		container.innerHTML = ""; // clear static cards

		data.forEach(plan => container.insertAdjacentHTML("beforeend", template(plan)));
	}

	if ($("#carouselTrack").length) {
		initializeCustomCarousel();
	}
	changeSortFocus();
	setInterval(changeSortFocus, CYCLE);
})(jQuery);