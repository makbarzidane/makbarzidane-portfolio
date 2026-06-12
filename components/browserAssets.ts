"use client";

import { useEffect, useState } from "react";

export const browserAssetPrefix = "idb-asset:";

interface StoredBrowserAsset {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  blob: Blob;
}

const dbName = "m-akbar-zidane-cms-assets";
const storeName = "assets";

function openAssetDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(dbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function createAssetId(name: string) {
  const safeName = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 56) || "asset";
  return `${Date.now()}-${Math.random().toString(16).slice(2)}-${safeName}`;
}

export function isBrowserAssetRef(value?: string) {
  return Boolean(value?.startsWith(browserAssetPrefix));
}

export function toBrowserAssetRef(id: string) {
  return `${browserAssetPrefix}${id}`;
}

export function getBrowserAssetId(ref: string) {
  return ref.replace(browserAssetPrefix, "");
}

export async function storeBrowserBlob(blob: Blob, name: string) {
  const db = await openAssetDb();
  const id = createAssetId(name);
  const asset: StoredBrowserAsset = {
    id,
    name,
    type: blob.type || "application/octet-stream",
    size: blob.size,
    createdAt: new Date().toISOString(),
    blob
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(asset);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });

  db.close();
  return toBrowserAssetRef(id);
}

export function storeBrowserFile(file: File) {
  return storeBrowserBlob(file, file.name);
}

export async function storeDataUrlAsBrowserAsset(value: string, name: string) {
  const response = await fetch(value);
  const blob = await response.blob();
  return storeBrowserBlob(blob, name);
}

export async function getBrowserAsset(ref: string) {
  if (!isBrowserAssetRef(ref)) return null;
  const db = await openAssetDb();
  const id = getBrowserAssetId(ref);

  const asset = await new Promise<StoredBrowserAsset | null>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).get(id);
    request.onsuccess = () => resolve((request.result as StoredBrowserAsset | undefined) || null);
    request.onerror = () => reject(request.error);
  });

  db.close();
  return asset;
}

export function useBrowserAssetUrl(value?: string) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    async function resolveUrl() {
      if (!value || !isBrowserAssetRef(value)) {
        setUrl(value || "");
        return;
      }

      try {
        const asset = await getBrowserAsset(value);
        if (!active) return;
        if (!asset) {
          setUrl("");
          return;
        }

        objectUrl = URL.createObjectURL(asset.blob);
        setUrl(objectUrl);
      } catch {
        if (active) setUrl("");
      }
    }

    resolveUrl();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  return url;
}
