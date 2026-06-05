import { EditableHero } from "@/components/content/EditableHero";
import { brandStory } from "@/content/brand";

/**
 * Legacy export — now powered by editable brand config.
 */
export function Story() {
  return <EditableHero block={brandStory} />;
}
