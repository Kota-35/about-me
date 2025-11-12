export interface WorkSectionProps {
  scrollToSection?: ((index: number) => void) | null;
  currentSection?: number;
}
