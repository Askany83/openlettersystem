"use client";
import { useState, useEffect } from "react";
import usePostRequest from "@/services/(httpMethods)/usePostRequest";

const LetterReceiverForm = () => {
  const [formData, setFormData] = useState({ name: "", surname: "", job: "" });

  const { response, error, loading, postRequest } = usePostRequest(
    "/api/addLetterReceiver",
    formData
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postRequest();
  };

  useEffect(() => {
    if (response) {
      setFormData({ name: "", surname: "", job: "" });
    }
  }, [response]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nome"
        />
      </div>
      <div>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Sobrenome"
        />
      </div>
      <div>
        <input
          type="text"
          id="job"
          name="job"
          value={formData.job}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Cargo"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "A guardar..." : "Guardar"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <p className="text-green-500">Remetente criado com sucesso!</p>
      )}
    </form>
  );
};

export default LetterReceiverForm;
