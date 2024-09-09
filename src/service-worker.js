/* eslint-disable */

/// <reference lib="webworker" />
// src/service-worker.ts
import { precacheAndRoute } from "workbox-precaching"

const CACHE_NAME = "my-cache-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css"
]

precacheAndRoute(self.__WB_MANIFEST)

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    })
  )
})

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        // Return the cached response if available
        return response
      }
      // Fetch from the network if not in cache
      return fetch(event.request)
    })
  )
})

// Activate event
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

export {}
