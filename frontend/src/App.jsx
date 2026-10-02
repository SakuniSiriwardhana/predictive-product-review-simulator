import { useState } from "react";

function App() {

  const [idea, setIdea] = useState("");
  const [persona, setPersona] = useState("Tech Enthusiast");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReview = async () => {

    if (!idea.trim()) {
      alert("Please enter a product idea.");
      return;
    }

    setLoading(true);
    setReview("");

    try {

       const response = await fetch(
  "https://predictive-product-review-simulator-rlve78mjv.vercel.app/generate-review",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            product_idea: idea,
            persona: persona
          })
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      setReview(data.review);

    } catch (error) {

      console.error(error);

      setReview(
        "Unable to generate feedback. Please make sure the Python backend is running."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-100 px-4 py-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-slate-800">
            Predictive Product Review Simulator
          </h1>

          <p className="mt-3 text-slate-600">
            Simulate customer feedback for your product idea
          </p>

        </div>


        {/* Input Card */}

        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Product Information
          </h2>


          {/* Product idea */}

          <label className="mb-2 block font-medium text-slate-700">
            Product Idea
          </label>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A smart water bottle that reminds users to drink water..."
            rows="5"
            className="mb-6 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
          />


          {/* Persona */}

          <label className="mb-2 block font-medium text-slate-700">
            Customer Persona
          </label>

          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="mb-6 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
          >

            <option>Tech Enthusiast</option>

            <option>Busy Parent</option>

            <option>Budget-Conscious Student</option>

            <option>Working Professional</option>

            <option>Eco-Conscious Consumer</option>

            <option>Skeptical Customer</option>

          </select>


          {/* Button */}

          <button
            onClick={generateReview}
            disabled={loading || !idea.trim()}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >

            {loading
              ? "Simulating Customer Feedback..."
              : "Generate Feedback"}

          </button>

        </div>


        {/* Result */}

        {review && (

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-slate-800">
                Simulated Customer Feedback
              </h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                AI Simulation
              </span>

            </div>

            <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-5 leading-7 text-slate-700">
              {review}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Note: This is AI-generated simulated feedback, not real
              customer data.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;