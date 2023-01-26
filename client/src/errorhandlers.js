export const handleError = (err) => {
  switch (err.code) {
    // Login Exceptions
    case "auth/wrong-password":
      return "Sorry, your password was incorrect. Please double-check your password.";
    case "auth/user-not-found":
      return "The email you entered doesn't belong to an account. Please check your email and try again.";
    case "auth/too-many-requests":
      return "Account has been disabled due to many failed login attempts. You can restore it by resetting your password or by trying again later.";
    case "auth/user-disabled":
      return "Your account has been restricted, try again later.";

    // Registration Exceptions
    case "auth/email-already-in-use":
      return "This email is already associated with another account.Please sign in to your account or use another email.";
    case "auth/invalid-email":
      return "Please use a valid email address.";
    case "auth/operation-not-allowed":
      return "Sorry for the inconvenience ,We are working on the problem.";
    case "auth/weak-password":
      return "Please use a stronger password.Use digits and letters for better security.";
    default:
      return "Something went wrong.";
  }
};
