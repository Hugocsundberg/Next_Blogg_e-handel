import document from "next/document";

export interface Post extends Content {
created: string,
excerpt: string,
imageUrl?: string,
imageAspectRatio?: number,
body: Array<any>
alt?: string,
slug: string,
title: string,
productSlug?: string
}

export interface ScrollPositionObjectType {
    [key: string]: number
}

export interface AboutMe {
    title: string, 
    slug: {
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

export interface Image {
    "_ref": string
    "_type": string
}

export type cols = 1 | 2 | 3

export interface slug {
    "_type": string,
    "current": string
}

export interface Content {
    "imageHeight": number,
    "imageWidth": number,
}

export interface Product extends Content {
    "_createdAt": string,
    "_updatedAt": string,
    "desc"?: string,
    "image": Image,
    "price": number,
    "title": string,
    "alt"?: string,
    "slug": slug
    }

export interface NavOption {
    "text": string
    "image": string
    "link": string
} 

export interface ImageHW {
    "asset": Image,
    "imageHeight": number,
    "imageWidth": number,
    "alt"?: string
}

export interface Product {
    "_createdAt": string,
    "_updatedAt": string,
    "images": Array<ImageHW>
    "price": number,
    "slug": slug,
    "title": string,
    "productHeight": number,
    "productWidth": number,
    "productDept"?: number
}