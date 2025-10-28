// useApi.js

export const API_BASE = "http://localhost:5000/api/participate";

// Get all opportunities
export async function getOpportunities() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch opportunities");
  return await res.json();
}

// Add a new opportunity
export async function addOpportunity(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add opportunity");
  return await res.json();
}

// Delete an opportunity by ID
export async function deleteOpportunity(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete opportunity");
  return await res.json();
}
