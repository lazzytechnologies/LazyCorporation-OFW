<?php include "includes/header.php" ?>
<?php include "includes/navigation.php" ?>
<?php 

	if (isset($_GET['source'])) {

		$source=$_GET['source'];
	}
	else{

		$source="";
	}

	switch ($source) {
		case 'findjob':
			include "includes/search-find-job.php";
			break;
		case 'submitprofile':
			include "includes/submit-profile.php";
			break;
		case 'postjob':
			include "includes/post-job.php";
			break;
		case 'findcandidate':
			include "includes/find-candidate.php";
			break;
		case 'pricing':
			include "includes/pricing.php";
			break;
		case 'faq':
			include "includes/faq.php";
			break;
		case 'privacypolicy':
			include "includes/privacy-policy.php";
			break;
		case 'termsandcondition':
			include "includes/terms-and-condition.php";
			break;
		default:
			include "includes/homepage.php";
			break;
	}
 ?>
<?php include "includes/footer.php" ?>