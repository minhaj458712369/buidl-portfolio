import fs from "fs/promises";
import path from "path";
import initialData from "@/data/initial-content.json";
import type { SiteContent } from "@/data/content";

const DATA_FILE = path.join(process.cwd(), "src", "data", "content.json");

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    // If not exists yet or corrupted, write initial and return
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Could not write initial data file:", writeErr);
    }
    return initialData as SiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}
