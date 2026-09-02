/**
 * Unity Tech Hub - Owner Security & Verification Service
 * 
 * Strict protection for Owner-Only Product Management:
 * - Product Creation (+ Add Product)
 * - Product Editing
 * - Product Removal / Deletion
 * - Product Archiving
 * - Price & Stock Modifications
 */

const OWNER_PASSWORD_ENV_DEFAULT = 'Jetha@2014';

export const OWNER_VERIFICATION_MESSAGES = {
  ADD_PRODUCT: 'Enter Owner Password to add a new product.',
  EDIT_PRODUCT: 'Enter Owner Password to edit this product.',
  DELETE_PRODUCT: 'Enter Owner Password to delete this product.',
  ARCHIVE_PRODUCT: 'Enter Owner Password to archive this product.',
  RESTORE_PRODUCT: 'Enter Owner Password to restore this product.',
  CHANGE_PRICE: 'Enter Owner Password to change product pricing.',
  CHANGE_STOCK: 'Enter Owner Password to adjust product stock.',
  DEFAULT: 'Enter Owner Password to perform this product management action.'
};

/**
 * Validates the owner password locally and via backend API endpoint.
 */
export async function verifyOwnerPassword(password: string): Promise<{ success: boolean; error?: string }> {
  if (!password || password.trim() === '') {
    return {
      success: false,
      error: 'Password is required. Access denied.'
    };
  }

  try {
    const res = await fetch('/api/owner/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true };
      }
    }
  } catch {
    // If offline or network issue, fallback to secure client-side verification
  }

  // Exact owner password validation
  if (password === OWNER_PASSWORD_ENV_DEFAULT) {
    return { success: true };
  }

  return {
    success: false,
    error: 'Incorrect password. Access denied.'
  };
}

/**
 * Synchronous exact check for store-level guards
 */
export function isOwnerPasswordCorrect(password: string | undefined): boolean {
  if (!password) return false;
  return password === OWNER_PASSWORD_ENV_DEFAULT;
}
