

export async function getNewAccessToken() {
    const res = await fetch("http://localhost:5001/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
    });

    const data = await res.json();



    return data.accessToken;
}