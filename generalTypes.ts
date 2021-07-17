import document from "next/document";

export interface Post {
created: string,
excerpt: string,
imageUrl?: string,
imageAspectRatio?: number,
imageHeight?: number,
imageWidth?: number
body: Array<any>
alt?: string,
slug: string,
title: string,
}

export interface ScrollPositionObjectType {
    [key: string]: number
}

export interface AboutMe {
    Title: string, 
    Slug: {
        current: string,
        _type: string
    }
}

export interface ScrollEvent extends Event {
    path: [
        document: HTMLDocument,
        window: Window
    ]
}

export interface Product {
    "_createdAt": string
    "_updatedAt": string
    "desc"?: string
    "image": {
        "_type": string
        "asset":{
            "_ref": string
            "_type": string
            }
    }
    "price": number
    "title": string
    }