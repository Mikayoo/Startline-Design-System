import axe from "axe-core";

/** Run axe on a rendered container and return the list of violations (empty = accessible). */
export async function axeViolations(container: Element) {
  const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}
