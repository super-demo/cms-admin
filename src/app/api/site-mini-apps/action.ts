"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import { CreateMiniAppForm, MiniApp } from "./type"

export async function GetMiniApp(id: number): Promise<MiniApp> {
    try {
        const response = await FetchInstance(`/site-mini-apps/${id}`, {
        method: "GET"
        })

        const result = await response.json()

        if (!response.ok)
        throw new HttpError(result.status.message, result.status.code)

        return result.data
    }
    catch (error) {
        console.error("Error fetching mini app:", error)
        throw error
    }
}


export async function GetListMiniApp(id: number): Promise<MiniApp[]> {
    try {
        const response = await FetchInstance(`/site-mini-apps/list/${id}`, {
        method: "GET"
        })

        const result = await response.json()

        if (!response.ok)
        throw new HttpError(result.status.message, result.status.code)

        return result.data
    }
    catch (error) {
        console.error("Error fetching mini app list:", error)
        throw error
    }
}

export async function CreateMiniApp(payload: CreateMiniAppForm): Promise<CreateMiniAppForm> {
    try {
        const response = await FetchInstance(`/site-mini-apps/create`, {
        method: "POST",
        body: JSON.stringify(payload)
        })
    
        const result = await response.json()
    
        if (!response.ok)
        throw new HttpError(result.status.message, result.status.code)
    
        return result
    } catch (error) {
        console.error("Error creating mini app:", error)
        throw error
    }
}