export function productImageClass(src: string): string {
  const needsEdgeTrim = src.includes("atlas-field-briefcase");
  return `object-contain mt-product-img-standard${needsEdgeTrim ? " mt-product-img-edge-trim" : ""}`;
}
