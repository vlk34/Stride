import { SignIn, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router";

const CustomSignIn = () => {
  const { loaded } = useClerk();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to Home Button */}
        {loaded && (
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block text-center transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0 }}
          >
            &larr; Back to Home
          </Link>
        )}

        <SignIn
          appearance={{
            elements: {
              rootBox: "max-w-md w-full",
              card: "bg-white p-8 rounded-lg border border-gray-200",
              headerTitle: "text-center text-2xl font-semibold text-gray-900",
              headerSubtitle: "mt-2 text-center text-sm text-gray-600",
              socialButtonsBlockButton: "w-full",
              formFieldInput:
                "w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm",
              formButtonPrimary:
                "w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            },
          }}
          path="/signin"
          routing="path"
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
};

export default CustomSignIn;
