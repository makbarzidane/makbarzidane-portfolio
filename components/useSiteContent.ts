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
    try {
      const stored = window.localStorage.getItem(cmsStorageKey) || window.localStorage.getItem(legacyCmsStorageKey);
      if (stored) {
        const merged = mergeContent(JSON.parse(stored) as Partial<EditableContent>);
        window.localStorage.setItem(cmsStorageKey, JSON.stringify(merged));
        setContent(merged);
      }
    } catch {
      setContent(defaultCmsContent);
    }
  }, []);

  return content;
}
