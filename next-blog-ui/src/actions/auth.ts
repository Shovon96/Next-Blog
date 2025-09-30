"use server"

import { FieldValues } from "react-hook-form";

// For user registation
export const register = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        console.error("User Registerd Failed", await res.text())
    }
    return await res.json();
}


export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        console.error("User Loging Failed", await res.text())
    }
    return await res.json();
}

