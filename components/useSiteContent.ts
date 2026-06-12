"use client";

import { useEffect, useState } from "react";
import { cmsStorageKey, defaultCmsContent, legacyCmsStorageKey, type EditableContent } from "@/data/cmsContent";

function mergeContent(value: Partial<EditableContent>): EditableContent {
  return {
    hero: { ...defaultCmsContent.hero, ...value.hero },
    contacts: { ...defaultCmsContent.contacts, ...value.contacts },
    projects: Array.isArray(value.projects) && value.projects.length > 0 ? value.projects : defaultCmsContent.projects,
    agents: Array.isArray(value.agents) && value.agents.length > 0 ? value.agents : defaultCmsContent.agents
  };
}

export function useSiteContent() {
  const [content, setContent] = useState<EditableContent>(defaultCmsContent);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/cms-content", { cache: "no-store" });
        if (response.ok) {
          const result = (await response.json()) as { content?: Partial<EditableContent> };
          if (result.content) {
            const merged = mergeContent(result.content);
            setContent(merged);
            return;
          }
        }

        const stored = window.localStorage.getItem(cmsStorageKey) || window.localStorage.getItem(legacyCmsStorageKey);
        if (stored) {
          const merged = mergeContent(JSON.parse(stored) as Partial<EditableContent>);
          window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
          setContent(merged);
          return;
        }
        setContent(defaultCmsContent);
      } catch {
        setContent(defaultCmsContent);
      }
    }

    function syncFromStorage(event: StorageEvent) {
      if (!event.key || event.key === cmsStorageKey || event.key === legacyCmsStorageKey) {
        void loadContent();
      }
    }

    function syncFromCmsUpdate() {
      void loadContent();
    }

    void loadContent();
    window.addEventListener("m-akbar-content-updated", syncFromCmsUpdate);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("m-akbar-content-updated", syncFromCmsUpdate);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  return content;
}
