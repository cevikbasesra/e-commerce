import SignupForm from "../components/SignupForm"; // SignupForm'u import ettik

const SignupPage = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

      {/* Signup formu */}
      <SignupForm />

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-blue-500 hover:underline"
          >
            Log in now.
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
