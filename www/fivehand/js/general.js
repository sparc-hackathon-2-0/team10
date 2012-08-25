$(window).load(function() {
	
});

$(window).ready(function() {
	$("#profileReadReview").click(function() {
		$('.profileReviewListing').fadeIn();
		$('.profileReviewForm').hide();
		$('#profileReadReview').addClass('profileReviewToggleActive');
		$('#profileLeaveReview').removeClass('profileReviewToggleActive');
	});
	$("#profileLeaveReview").click(function() {
		$('.profileReviewListing').hide();
		$('.profileReviewForm').fadeIn();
		$('#profileReadReview').removeClass('profileReviewToggleActive');
		$('#profileLeaveReview').addClass('profileReviewToggleActive');
	});
});