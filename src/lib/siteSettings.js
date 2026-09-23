// Home page content management via Supabase site_settings table.
// Public reads use the publishable key (RLS allows SELECT).
// Admin writes use the service_role key via supabaseAdmin.

import { fetchSiteSettings } from "@/lib/supabaseClient";
import { adminEntity } from "@/lib/supabaseAdmin";

const Settings = adminEntity("SiteSetting");

export async function fetchSettings(group = "home_page") {
  try {
    const list = await fetchSiteSettings(group);
    const map = {};
    (list || []).forEach((s) => {
      map[s.setting_key] = s.setting_value;
    });
    return map;
  } catch {
    return {};
  }
}

export async function saveSetting(key, value, group = "home_page") {
  const existing = await Settings.filter({ setting_key: key, setting_group: group });
  if (existing && existing.length > 0) {
    return await Settings.update(existing[0].id, { setting_value: String(value) });
  }
  return await Settings.create({
    setting_key: key,
    setting_value: String(value),
    setting_group: group,
  });
}

export async function saveSettings(settingsObj, group = "home_page") {
  const entries = Object.entries(settingsObj).filter(
    ([, v]) => v !== undefined && v !== null
  );
  await Promise.all(entries.map(([k, v]) => saveSetting(k, String(v), group)));
}