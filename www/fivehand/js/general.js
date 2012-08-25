$(window).load(function() {
	
});

$(window).ready(function() {
	$("#profileReadReview").click(function() {
		$('.profileReviewListing').fadeIn();
		$('.profileReviewForm').fadeOut();
	});
	$("#profileLeaveReview").click(function() {
		$('.profileReviewListing').fadeOut();
		$('.profileReviewForm').fadeIn();
	});
});