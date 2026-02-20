export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  logo: string | null;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  taxRate: number;
  discount: number;
  notes: string;
  paymentTerms: string;
  currency: string;
}

export const defaultInvoice: InvoiceData = {
  logo: null,
  businessName: "",
  businessAddress: "",
  businessEmail: "",
  businessPhone: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  invoiceNumber: `INV-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  lineItems: [
    { id: "1", description: "", quantity: 1, rate: 0 },
  ],
  taxRate: 0,
  discount: 0,
  notes: "",
  paymentTerms: "Net 30",
  currency: "USD",
};

export const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  INR: "₹",
};

export function calcSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
}

export function calcTax(subtotal: number, rate: number): number {
  return subtotal * (rate / 100);
}

export function calcTotal(subtotal: number, tax: number, discount: number): number {
  return subtotal + tax - discount;
}
