
/*
═══════════════════════════════════════════════════════════════════════════════
  REGENERA BANK - CORE TRANSACTION SERVICE
  Module: Data Presentation & ISO Compliance
═══════════════════════════════════════════════════════════════════════════════
*/

// [FILE] services/formatters.ts

/**
 * Formats integer cents to BRL currency string using ISO-4217 standard logic.
 * Ensures zero-drift math by handling precision strictly before formatting.
 * @param cents Integer value of money in smallest currency unit.
 */
export const formatCurrency = (cents: number | undefined | null): string => {
  if (cents === undefined || cents === null) return 'R$ 0,00';
  
  // Convert to units for Intl.NumberFormat which expects unit values.
  // Division is safe here as it's for display only; the source of truth remains integer.
  const value = cents / 100;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Standardizes date presentation for financial audit trails.
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '---';
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return '---';
  }
};
