import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../api/axios";
import { FiArrowRight, FiCopy, FiKey } from "react-icons/fi";

function JoinBoardPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!code.trim()) {
      setError("Please enter an invite code");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await API.post(
        "/auth/board/join",
        { code: code.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setSuccess("Successfully joined the board!");
      setTimeout(() => {
        navigate("/boards"); // Redirect to boards page after success
      }, 1500);
      
    } catch (error) {
      console.error("Error joining board:", error);
      setError(error.response?.data?.message || "Failed to join board. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      setError("Couldn't access clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-900/20 mb-4">
            <FiKey className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join a Board</h1>
          <p className="text-gray-400">
            Enter the invite code below to join an existing board
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="Paste invite code here"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {code && (
              <button
                onClick={() => setCode("")}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
            <button
              onClick={handlePaste}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 flex items-center"
              title="Paste from clipboard"
            >
              <FiCopy className="mr-1" /> Paste
            </button>
          </div>

          {error && (
            <div className="text-red-400 text-sm p-3 bg-red-900/20 rounded-lg flex items-start">
              <span className="flex-1">{error}</span>
              <button onClick={() => setError("")} className="text-red-300 hover:text-white ml-2">
                ✕
              </button>
            </div>
          )}

          {success && (
            <div className="text-green-400 text-sm p-3 bg-green-900/20 rounded-lg">
              {success}
            </div>
          )}

          <button
            onClick={handleJoin}
            disabled={loading || !code.trim()}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
              loading || !code.trim()
                ? "bg-blue-600/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white shadow-lg`}
          >
            {loading ? (
              <span className="animate-pulse">Joining...</span>
            ) : (
              <>
                <span>Join Board</span>
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need a board?{" "}
            <button
              onClick={() => navigate("/boards/create")}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create one instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default JoinBoardPage;