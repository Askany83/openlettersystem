"use client";
import { useState } from "react";
import { LoginFormData } from "@/interfaces/systemInterfaces";
import { useRouter } from "next/navigation";

export default function MockupLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Extracted validation
  const validateForm = () => {
    if (!formData.name || !formData.password) {
      setError("Both fields are required!");
      return false;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run form validation
    if (!validateForm()) return;

    // Simulated login check (move this logic to an authentication service if applicable)
    if (formData.name === "Askany" && formData.password === "12345") {
      setError(null);
      alert("Login Successful - Utilizador: André Carvalho");
      sessionStorage.setItem("loginUserId", "673f7b91233a733fa2872709");
      router.push("/homepage");
    } else if (formData.name === "Outro" && formData.password === "12345") {
      setError(null);
      alert("Login Successful - Ana Diaz");
      sessionStorage.setItem("loginUserId", "673f7cc3233a733fa287270b");
      router.push("/homepage");
    } else {
      setFormData({ ...formData, password: "" });
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">OLSv0.1 Login</h1>
      <br />
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="text-gray-700 mt-3 p-2 bg-white rounded-lg shadow-lg w-full"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="text-gray-700 mt-3 p-2 bg-white rounded-lg shadow-lg w-full"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
        <br />
        {error && (
          <p className="text-red-500 flex justify-center items-center">
            {error}
          </p>
        )}{" "}
      </form>
    </div>
  );
}
